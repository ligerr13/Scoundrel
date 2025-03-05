import * as THREE from 'three'
import { texturePromise, TextureAtlas, SubTexture, CARD_TEXTURE_MAP} from './asset_loader'
import { Mesh, MeshBasicMaterial, DoubleSide, PlaneGeometry, Vector3, Vector2, Color } from "three";
import { CardState, CardType, Suit} from './utils'
import { Emitter } from './event_manager'
import { Node } from './node'
import { iHoverable } from './interfaces/entity';


export class CardData {

    private _suit: number;
    private _rank: number;
    private _state: CardState = CardState.DECK;
    private _type!: CardType;

    constructor(suit: Suit, rank: number){
        this._suit = suit;
        this._rank = rank;

        switch (this._suit) {
            case Suit.HEARTS:
                this._type = CardType.POTION;
                break;
            case Suit.CLUBS:
            case Suit.SPADES:
                this._type = CardType.MONSTER;
                break;
                case Suit.DIAMONDS: 
                this._type = CardType.WEAPON
                break;
                default:
                    break;
        }
    }
    
    public get suit(): number {
        return this._suit;
    }
    
    public get rank(): number {
        return this._rank;
    }
    
    public toString(): string {
        return `Suit: ${this.suit}, Rank: ${this._rank}, Type: ${this._type}`;
    }
    
}

export class CardScene extends Node {
    [iHoverable] = true;
    
    private _geometry = new PlaneGeometry(this.width, this.height);
    private _material = new MeshBasicMaterial({
        color: 0xffffff
    })
    private card_data?: CardData;
    
    public get suit(): number {
        if (!this.card_data) return 0;
        return this.card_data.suit;
    }

    public get rank(): number {
        if (!this.card_data) return 0;
        return this.card_data.rank;
    }

    constructor(
        name: string, 
        position: THREE.Vector3, 
        geometry: THREE.Vector2, 
        card_data: CardData) {
            super(name, position, geometry);
            this.card_data = card_data
    }

    public init(): void {
        super.init();
        

        TextureAtlas(CARD_TEXTURE_MAP, new THREE.Vector4(this.suit, this.rank, 524, 751))
            .then((atlas) => {
                this._material.map = atlas.texture;
                this._material.needsUpdate = true;
            })
            .catch((error) => {
                console.error('Error loading texture:', error);
            });

        this._mesh = new Mesh(this._geometry, this._material);
    }

    public update(delta: number): void {
        super.update(delta);
    }
    onMouseEntered(): void {
        if (this.mesh.material){
            this._material.color.set(0xD32A37);
        }
    }
    
    onMouseExited(): void {
        if (this.mesh.material){
            this._material.color.set(0xffffff);
        }
    }
    
}