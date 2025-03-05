import * as THREE from 'three'
import { CardData} from './card'
import { Node } from './node'
import { Suit, setPosition } from './utils'
import { Emitter } from './event_manager'
import { iHoverable } from './interfaces/entity';
import { CARD_TEXTURE_MAP, TextureAtlas} from './asset_loader'



export class DeckScene extends Node {
   [iHoverable] = true;
       
   private _geometry = new THREE.PlaneGeometry(this.width, this.height);
   private _material = new THREE.MeshBasicMaterial({
       color: 0xffffff
   })
   

   constructor(
       name: string, 
       position: THREE.Vector3, 
       geometry: THREE.Vector2) {
           super(name, position, geometry);
   }

   public init(): void {
       super.init();
       

       TextureAtlas(CARD_TEXTURE_MAP, new THREE.Vector4(6,0, 524, 751))
           .then((atlas) => {
               this._material.map = atlas.texture;
               this._material.needsUpdate = true;
           })
           .catch((error) => {
               console.error('Error loading texture:', error);
           });

       this._mesh = new THREE.Mesh(this._geometry, this._material);
   }

   public update(delta: number): void {
       super.update(delta);
   }

   onMouseEntered(): void {}
   onMouseExited(): void {}

   onClick(): void {
        console.log("clicked");
   }

}

export class Deck<T extends CardData> {
    private cards: T[] = [];
    private maxSize: number;


    constructor(maxSize: number = Infinity) {
        this.maxSize = maxSize;
    }
    
    public addCard(card: T): void {
        if (this.cards.length < this.maxSize) {
            this.cards.push(card);
        } else {
            console.warn(`Cannot add card: deck has reached its maximum size of ${this.maxSize}`);
        }
    }
    
    public addMany(_cards: T[]): void {
        if (this.cards.length + _cards.length <= this.maxSize) {
            _cards.forEach(card => {
                this.addCard(card);
            });
        } else {
            console.warn(`Cannot add ${_cards.length} cards: deck will exceed its maximum size of ${this.maxSize}`);
        }
    }

    public rmCard(card: T): void {
        const c = this.getCard(card);
        if (c) {
            this.cards = this.cards.filter(existingCard => existingCard !== c);
        }
    }

    public rmMany(_cards: T[] = this.cards): void {
        _cards.forEach(card => {
            this.rmCard(card);
        });
    }
    
    public getCard(card: T): T | undefined {
        return this.cards.find(c => c.suit === card.suit && c.rank === card.rank);
    }

    public getCards(): T[] {
        return this.cards;
    }

    public drawCard(): T | undefined {
        const card = this.cards.pop()

        if (this.cards.length === 0) {
            console.warn("Cannot pop: Deck is empty");
            return undefined;
        }

        return card;
    }
    
    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    public toString(): string {
        return `Deck contains (${this.cards.length}/${this.maxSize}):\n` + this.cards.map(card => card.toString()).join("\n");
    }
}

export function fillDeck(): Deck<CardData> {
    const deck = new Deck<CardData>();
    const pool = [
        { suit: Suit.HEARTS, value: 9 },
        { suit: Suit.DIAMONDS, value: 9 },
        { suit: Suit.SPADES, value: 13 },
        { suit: Suit.CLUBS, value: 13 }
    ];
    for (let e of pool) {
        for (let rank = 2; rank <= e.value + 1; rank++) {
            const card_data: CardData = new CardData(e.suit, rank);
            deck.addCard(card_data);
        }
    }
    return deck;
}
