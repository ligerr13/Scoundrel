import * as THREE from 'three';
import { Emitter } from "./event_manager";
import { Node } from './node';

type GameSceneEvents = {
    nodeAdded: Node;
    mouseEntered: Node;
    mouseExited: Node;
    mouseClicked: {};
    mouseMove: MouseEvent;
    windowResize: {};
};

export class GameScene {
    private static _instance: GameScene;

    private _width: number;
    private _height: number;
    private _renderer: THREE.WebGLRenderer;
    private _camera: THREE.PerspectiveCamera;
    private _raycaster: THREE.Raycaster;
    private _pointer: THREE.Vector2;
    private _scene: THREE.Scene = new THREE.Scene;

    private _entities: Node[] = [];
    private _intersected: THREE.Object3D | null = null;
        
    private _emitter = new Emitter<GameSceneEvents>();
    
    public static get instance(): GameScene {
        if (!this._instance) {
            this._instance = new GameScene();
        }
        return this._instance;
    }

    public get entities(): Node[] {
        return this._entities;
    }

    private constructor() {
        if (GameScene._instance) {
            throw new Error("Use GameScene.instance instead of new GameScene()");
        }

        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(this._width, this._height);

        document.body.appendChild( this._renderer.domElement );

        const aspectRatio = this._width / this._height;
        this._camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        this._camera.position.set(0,0,4);

        this._pointer = new THREE.Vector2(0,0);
        this._raycaster = new THREE.Raycaster();

        window.addEventListener('resize', () => {
            this._emitter.emit('windowResize', {});
        }, false);
        document.addEventListener('mousemove', (event) => {
            this._emitter.emit('mouseMove',event);
        } );
        document.addEventListener('click', (event) => {
            this._emitter.emit('mouseClicked', {});
        });
        

    }
    
    
    init() {
        
        this._emitter.on("nodeAdded", (node) => {
            node.init();
            this._scene.add(node.mesh);
    
            console.info(`Node added: ${node.name}`);
        });

        this._emitter.on("mouseMove", (event) => {
            this._pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			this._pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        });

        this._emitter.on("mouseEntered", (node) => {
            node.eventEmitter.emit("onMouseEntered", {})
        });

        this._emitter.on("mouseExited", (node) => {
            node.eventEmitter.emit("onMouseExited", {})
        });

        this._emitter.on("mouseClicked", () => {
            this._raycaster.setFromCamera(this._pointer, this._camera);
            const intersects = this._raycaster.intersectObjects(this._scene.children, false);
        
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                const node: Node | undefined = this.getEntityById(clickedObject.id);
                if (node) {
                    node.eventEmitter.emit("onMouseClicked", {});
                }
            }
        });

        this._emitter.on("windowResize", (event) => {
            this._width = window.innerWidth;
            this._height = window.innerHeight;
            this._renderer.setSize(this._width, this._height);
            this._camera.aspect = this._width / this._height;
            this._camera.updateProjectionMatrix();
        });  
    }

    update(delta: number): void {
        this._entities.forEach(entity => entity.update(delta));

        this._raycaster.setFromCamera( this._pointer, this._camera );

        const intersects = this._raycaster.intersectObjects( this._scene.children, false );

		if ( intersects.length > 0 ) {
			if (this._intersected != intersects[0].object) {
				if (this._intersected){}

				this._intersected = intersects[0].object;
                const node: Node | undefined = this.getEntityById(this._intersected.id);
                if (node) this._emitter.emit("mouseEntered", node);
			}
		} 
        else {
            if ( this._intersected ) {
                const node: Node | undefined = this.getEntityById(this._intersected.id);
                if (node) this._emitter.emit("mouseExited", node);
            }
			this._intersected = null;
		}

    }

    render(): void {
        this._camera.updateMatrixWorld();
        this._renderer.render(this._scene, this._camera);
    }

    public addNode(node: Node): void {
        if (!(node instanceof Node)) {
            throw new Error("Invalid argument: Expected an instance of Node.");
        }
    
        this._entities.push(node);
        this._scene.add(node.mesh);
    
        this._emitter.emit("nodeAdded", node);
    }

    public getEntityById(id: number): Node | undefined {
        return this._entities.find(entity => entity.mesh.id === id);
    }

}

