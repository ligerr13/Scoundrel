import * as THREE from 'three'
import { IEntity, IHoverable } from './interfaces/entity';
import { texturePromise, loader, SubTexture} from './asset_loader'


const CARD_TEXTURE_MAP: string = '../src/assets/cards.png'

export enum Suit {
    HEARTS = 0,
    DIAMONDS = 1,
    SPADES = 2,
    CLUBS = 3
}

export class CardScene extends THREE.Mesh implements IEntity, IHoverable {
    public geometry: THREE.PlaneGeometry;
    public material: THREE.MeshBasicMaterial;

    private _suit: Suit;
    private _rank: number;

    private _texture?: THREE.Texture | undefined | null

    constructor(suit: Suit, rank: number) {
        super();
        this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
        this.material = new THREE.MeshBasicMaterial({
            map: null,
            color: 0xffffff, 
            transparent: true, 
            side: THREE.DoubleSide
        });

        this._suit = suit;
        this._rank = rank;
        
        this.position.set(
            THREE.MathUtils.randFloat(-2, 2),
            THREE.MathUtils.randFloat(-2, 2),
            0
        );

        const card_mesh_promise = texturePromise(CARD_TEXTURE_MAP, loader);

        card_mesh_promise.then((texture) => {
            
                const sprite_size = new THREE.Vector2(524, 751);
                const coords = new THREE.Vector2(suit, rank);
                const subTexture = SubTexture.createFromCoords(texture, coords, sprite_size);

                this._texture = subTexture;
                this.ready();
            })
            .catch((error) => {
                console.error('Failed to load texture:', error);
            });
    }

    public ready(): void {
        if (this._texture) {
            this.material.map = this._texture;
            this.material.needsUpdate = true;
        }
    }

    public update(delta: number): void {
        this.rotation.y += 1 * delta;
    }

    public render(): void {}

    public onMouseEntered(): void {
        this.material.color.set(0xff0000);
    }

    public onMouseExited(): void {
        this.material.color.set(0xffffff);
    }

    public get Suit(): number | null {
        return this._suit;
    }

    public get Rank(): number | null {
        return this._rank;
    }

    public get Texture(): THREE.Texture | undefined | null {
        return this._texture;
    }
}