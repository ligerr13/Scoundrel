import * as THREE from 'three'
import { IEntity } from "./interfaces/entity";

export enum  SuitType {
    HEARTS = 1,
    DIAMONDS = 2, 
    SPADES = 3,
    CLUBS = 4,
}

export abstract class Card implements IEntity{
    private suit: number;
    private rank: number;
    private id: number;

    geometry: THREE.BoxGeometry = new THREE.BoxGeometry( 0.57 * 2, 0.88 * 2, 0.02);
    material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    cube: THREE.Mesh = new THREE.Mesh( this.geometry, this.material );

    constructor(_suit: number = 1, _rank: number = 1){
        this.suit = _suit;
        this.rank = _rank;
        // scene.add( this.cube );
        this.id = this.cube.id;
    }
    
    abstract use_card(): void;
    
    Ready(): void {
        
    }
    
    Render(): void {
    }

    Update(delta: number): void {
        this.cube.rotation.x += 1 * delta;
        this.cube.rotation.y += 1 * delta;
    }

    __str__(): string {
        return `${this.constructor.name} - Suit: ${this.suit}, Rank: ${this.rank}`;
    }

    public get Suit(): number {
        return this.suit
    }

    public get Rank(): number {
        return this.rank
    }

    public get Id(): number {
        return this.id;
    }
}

export class MonsterCard extends Card {
    use_card() : void {}
}
export class WeaponCard extends Card {
    use_card() : void {}
}
export class PotionCard extends Card {
    use_card() : void {}
}

export class CardFactory {
    public static create(suit: number, rank: number): Card {
        switch (suit) {
            case 4:
            case 3:
                return new MonsterCard(suit, rank);

            case 2:
                return new WeaponCard(suit, rank);

            case 1:
                return new PotionCard(suit, rank);

            default:
                throw new Error("Invalid card type");
        }
    }
}