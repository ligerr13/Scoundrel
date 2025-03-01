import * as THREE from 'three'
import { IEntity, IHoverable } from './interfaces/entity';

export enum Suit {
    HEARTS = 0,
    DIAMONDS = 1,
    SPADES = 2,
    CLUBS = 3
}

export class CardScene extends THREE.Object3D implements IEntity, IHoverable {
    private geometry: THREE.PlaneGeometry;
    private material: THREE.MeshBasicMaterial;
    private mesh: THREE.Mesh;

    private _suit: Suit;
    private _rank: number;
    private _texture?: THREE.Texture;

    constructor(suit: Suit, rank: number) {
        super();

        this._suit = suit;
        this._rank = rank;
        this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff , transparent: true, side: THREE.DoubleSide});
        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.add(this.mesh);
    }

    public Ready(): void {
        console.log("Ready?")
    }

    public Update(delta: number): void {
        this.mesh.rotation.y += 4 * delta;
    }

    public Render(): void {
    }

    public onMouseEntered(): void {
        this.material.color.set(0xff0000);
    }

    public onMouseExited(): void {
        this.material.color.set(0xffffff);
    }

    public get Suit(): number {
        return this._suit;
    }

    public get Rank(): number {
        return this._rank;
    }

    public get Texture(): THREE.Texture | undefined {
        return this._texture;
    }
}
