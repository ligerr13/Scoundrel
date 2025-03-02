import * as THREE from 'three';
import { Process } from "./process";
import { CardScene, Suit } from "./card";
import { IEventListener, IHoverable } from './interfaces/entity';
import { EventManager, EventType} from './event_manager';


const game_loop = Process.get_instance();
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

camera.position.set(0, 0, 5);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const mouseMove = (event: MouseEvent) => {
    event.preventDefault();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const intersects = raycaster.intersectObjects(scoundrel.children);

    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;
        if (scoundrel.intersected != hoveredObject) 
        {
            scoundrel.intersected = hoveredObject;
            if (scoundrel.intersected) {
                if (scoundrel.intersected.parent){
                     scoundrel.events.notify(EventType.MOUSE_ENTERED, scoundrel.intersected.id);
                }
                
            }
        }
    } 
    else {
        if (scoundrel.intersected) {
            if (scoundrel.intersected.parent) {
                scoundrel.events.notify(EventType.MOUSE_EXITED, scoundrel.intersected.id);
            }
        }
        scoundrel.intersected = null
    }
};

class onMouseEntered implements IEventListener {
    update(id: any): void {
        const entity = scoundrel.getChild(id);
        if (entity && "onMouseEntered" in entity) {
            (entity as unknown as IHoverable).onMouseEntered();
        }
    }
}

class onMouseExited implements IEventListener {
    update(id: any): void {
        const entity = scoundrel.getChild(id);
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

        this.events.subscribe(EventType.MOUSE_ENTERED, 
            new onMouseEntered());
        
        this.events.subscribe(EventType.MOUSE_EXITED, 
            new onMouseExited());
    }

    public addChild(entity: THREE.Object3D) {
        if (entity) {
            const entityId = (entity as any).id;

            if (entityId) {
                this.entities.set(entityId, entity);
            }
        }
        this.add(entity);
    }

    public updateEntities(delta: number) {
        this.entities.forEach(entity => {
            if (typeof (entity as any).update === 'function') {
                (entity as any).update(delta);
            }
        });
    }

    public getChild(id: number): THREE.Object3D | null | undefined {
        return this.entities.get(id);
    }

    public getChildren(): Map<number, THREE.Object3D> | null {
        return this.entities
    }
}

const scoundrel = new Scoundrel();
const card: CardScene = new CardScene(Suit.HEARTS, 1)
const card_2: CardScene = new CardScene(Suit.HEARTS, 2)
const card_23: CardScene = new CardScene(Suit.HEARTS, 3)

scoundrel.addChild(card);
scoundrel.addChild(card_2);
scoundrel.addChild(card_23);

window.addEventListener('mousemove', mouseMove);

game_loop.Start((delta) => {
    scoundrel.updateEntities(delta);
}, () => {
    raycaster.setFromCamera( pointer, camera );
    renderer.render(scoundrel, camera);
});
