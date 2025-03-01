import * as THREE from 'three';
import { GameLoop } from "./game_loop";
import { CardScene, Suit } from "./card_scene";
import { IEventListener, IHoverable } from './interfaces/entity';

const game_loop = GameLoop.get_instance();
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 4;
document.body.appendChild(renderer.domElement);

const MouseMove = (event: MouseEvent) => {
    event.preventDefault();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;

        if (scene.intersected != hoveredObject) 
        {
            scene.intersected = hoveredObject;
            if (scene.intersected) {
                if (scene.intersected.parent){
                     scene.events.notify(EVENTS.MOUSE_ENTERED, scene.intersected.parent.id);
                }
                
            }
        }
    } 
    else {
        if (scene.intersected) {
            if (scene.intersected.parent) {
                scene.events.notify(EVENTS.MOUSE_EXITED, scene.intersected.parent.id);
            }
        }
        scene.intersected = null
    }
};

const EVENTS = {
    MOUSE_ENTERED: "mouse.entered",
    MOUSE_EXITED: "mouse.exited",
} as const;

class EventManager {
    private listeners: Map<string, IEventListener[]> = new Map();

    subscribe(eventType: string, listener: IEventListener): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(listener);
    }

    unsubscribe(eventType: string, listener: IEventListener): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    notify(eventType: string, data: any): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            listeners.forEach(listener => listener.Update(data));
        }
    }
}

class OnMouseEntered implements IEventListener {
    Update(id: any): void {
        const entity = scene.GetEntity(id);
        if (entity && "onMouseEntered" in entity) {
            (entity as unknown as IHoverable).onMouseEntered();
        }
    }
}

class OnMouseExited implements IEventListener {
    Update(id: any): void {
        const entity = scene.GetEntity(id);
        if (entity && "onMouseExited" in entity) {
            (entity as unknown as IHoverable).onMouseExited();
        }
    }
}

class Scoundrel extends THREE.Scene {
    public events: EventManager = new EventManager();
    private entities: Map<number, THREE.Object3D> = new Map();
    public intersected?: THREE.Object3D | null = null;

    constructor() {
        super();
    }

    public AddChild(entity: THREE.Object3D) {
        if (entity) {
            const entityId = (entity as any).id;

            if (entityId) {
                this.entities.set(entityId, entity);
            }
        }
        this.add(entity);
    }

    public UpdateEntities(delta: number) {
        this.entities.forEach(entity => {
            if (typeof (entity as any).Update === 'function') {
                (entity as any).Update(delta);
            }
        });
    }

    public GetEntity(id: number): THREE.Object3D | undefined {
        return this.entities.get(id);
    }
}

const scene = new Scoundrel();

scene.events.subscribe(EVENTS.MOUSE_ENTERED, new OnMouseEntered());
scene.events.subscribe(EVENTS.MOUSE_EXITED, new OnMouseExited());

const card: CardScene = new CardScene(Suit.HEARTS, 1);

scene.AddChild(card);


window.addEventListener('mousemove', MouseMove);

game_loop.Start((delta) => {
    scene.UpdateEntities(delta);
}, () => {
    raycaster.setFromCamera( pointer, camera );
    renderer.render(scene, camera);
});
