import { 
    Mesh,
    Vector3,
    Vector2 
} from "three";

import { iEntity, iHoverable, iInteractable } from "./interfaces/entity";
import { Emitter } from "./event_manager";

type NodeEvents = {
    onMouseEntered: {};
    onMouseExited: {};
    onMouseClicked: {};
};


export class Node implements iEntity, iHoverable, iInteractable {
    [iEntity] = true;
    [iHoverable] = false;
    [iInteractable] = false;

    private static ref_counted = 0;
    
    protected _name: string = "";
    protected _position: Vector3;
    protected _g: Vector2;
    protected _mesh: Mesh = new Mesh();
    
    public eventEmitter = new Emitter<NodeEvents>();

    public readonly id: number;
        
    public get mesh(): Mesh {
        return this._mesh;
    }
    
    public get name(): string {
        return this._name;
    }
    
    public get width(): number {
        return this._g.x;
    }
    
    public get height(): number {
        return this._g.y;
    }

    constructor(name: string = "Node", position: Vector3, geometry: Vector2) {
        this.id = Node.ref_counted += 1;
        this._name = `${name}_${this.id}`;
        this._position = position;
        this._g = geometry;
        this._mesh.position.set(
            this._position.x, 
            this._position.y, 
            this._position.z
        );
    }

    init() {
        this.eventEmitter.on("onMouseEntered", () => {
            this.onMouseEntered();
        });

        this.eventEmitter.on("onMouseExited", () => {
            this.onMouseExited();
        });
        
        this.eventEmitter.on("onMouseClicked", () => {
            this.onClick();
        });
    }

    update(delta: number): void {
        this._mesh.position.set(this._position.x, this._position.y, this._position.z);
    }   
    render(): void {}
    onMouseEntered(): void {}
    onMouseExited(): void {}
    onClick(): void {}
}