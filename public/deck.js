"use strict";
// import * as THREE from 'three'
// import { CardData, CardScene } from './card'
// import { Suit, setPosition } from './utils'
// import { Emitter } from './event_manager'
// import { iEntity, iHoverable, iInteractable } from './interfaces/entity';
// import { texturePromise, SubTexture, CARD_TEXTURE_MAP} from './asset_loader'
// import { gsap } from 'gsap';
// import { threadId } from 'worker_threads';
// export type DeckEvents = {
//     eCardDrawn: {card: CardData};
//     eDeckShuffled: {};
// }
// export type DungeonEvents = {
//     eMouseEntered: {};
//     eMouseExited: {};
//     eMouseClicked: {};
// }
// export class Dungeon extends THREE.Mesh implements iEntity, iHoverable, iInteractable {
//     public geometry: THREE.PlaneGeometry;
//     public material: THREE.MeshBasicMaterial;
//     private aspectRatio: number = 0.0;
//     private offsetX: number = 0.0;
//     private eventEmitter: Emitter<DungeonEvents> = new Emitter();
//     constructor(){
//         super();
//         // this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
//         // this.material = new THREE.MeshBasicMaterial({
//         //     map: null,
//         //     color: 0xffffff, 
//         //     transparent: true, 
//         //     side: THREE.DoubleSide});
//         // const card_mesh_promise = texturePromise(CARD_TEXTURE_MAP, loader);
//         // card_mesh_promise.then((texture) => {
//         //     const sprite_size = new THREE.Vector2(524, 751);
//         //     const coords = new THREE.Vector2(6, 0);
//         //     const subTexture = SubTexture.createFromCoords( texture, coords, sprite_size);
//         //     this.material.map = subTexture;
//         //     }).catch((error) => {console.error('Failed to load texture:', error);});
//     }
//     public init(): void {
//         setPosition(this, 0, 0, 0);
//     }
//     public update(delta: number): void {}
//     public render(): void {
//         this.aspectRatio = window.innerWidth / window.innerHeight;
//         this.offsetX = -this.aspectRatio * 3;
//         setPosition(this, this.offsetX, 0, 0);
//     }
//     onMouseEntered(): void {
//         if (this.material) {
//             console.log("Mouse entered");
//             this.material.color.set(0xff0000);
//         } else {
//             console.error("Material is not defined!");
//         }
//     }
//     onMouseExited(): void {
//         if (this.material) {
//             this.material.color.set(0xffffff);
//         } else {
//             console.error("Material is not defined!");
//         }
//     }
//     onClick(): void {
//         this.eventEmitter.emit("eMouseClicked", {});
//     }
//     on<K extends keyof DungeonEvents>(eventName: K, fn: (params: DungeonEvents[K]) => void) {
//         this.eventEmitter.on(eventName, fn);
//     }
//     off<K extends keyof DungeonEvents>(eventName: K, fn: (params: DungeonEvents[K]) => void) {
//         this.eventEmitter.off(eventName, fn);
//     }
// }
// export class Deck<T extends CardData> {
//     private cards: T[] = [];
//     private maxSize: number;
//     private eventEmitter: Emitter<DeckEvents> = new Emitter();
//     constructor(maxSize: number = Infinity) {
//         this.maxSize = maxSize;
//     }
//     public addCard(card: T): void {
//         if (this.cards.length < this.maxSize) {
//             this.cards.push(card);
//         } else {
//             console.warn(`Cannot add card: deck has reached its maximum size of ${this.maxSize}`);
//         }
//     }
//     public addMany(_cards: T[]): void {
//         if (this.cards.length + _cards.length <= this.maxSize) {
//             _cards.forEach(card => {
//                 this.addCard(card);
//             });
//         } else {
//             console.warn(`Cannot add ${_cards.length} cards: deck will exceed its maximum size of ${this.maxSize}`);
//         }
//     }
//     public rmCard(card: T): void {
//         const c = this.getCard(card);
//         if (c) {
//             this.cards = this.cards.filter(existingCard => existingCard !== c);
//         }
//     }
//     public rmMany(_cards: T[] = this.cards): void {
//         _cards.forEach(card => {
//             this.rmCard(card);
//         });
//     }
//     public getCard(card: T): T | undefined {
//         return this.cards.find(c => c.Suit === card.Suit && c.Rank === card.Rank);
//     }
//     public getCards(): T[] {
//         return this.cards;
//     }
//     public drawCard(): T | undefined {
//         const card = this.cards.pop()
//         if (this.cards.length === 0) {
//             console.warn("Cannot pop: Deck is empty");
//             return undefined;
//         }
//         if (card) {
//             this.eventEmitter.emit("eCardDrawn", { card });
//         }
//         return card;
//     }
//     public shuffle(): void {
//         for (let i = this.cards.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
//         }
//         this.eventEmitter.emit("eDeckShuffled", {});
//     }
//     public toString(): string {
//         return `Deck contains (${this.cards.length}/${this.maxSize}):\n` + this.cards.map(card => card.toString()).join("\n");
//     }
//     on<K extends keyof DeckEvents>(eventName: K, fn: (params: DeckEvents[K]) => void) {
//         this.eventEmitter.on(eventName, fn);
//     }
//     off<K extends keyof DeckEvents>(eventName: K, fn: (params: DeckEvents[K]) => void) {
//         this.eventEmitter.off(eventName, fn);
//     }
// }
// export function fillDeck(): Deck<CardData> {
//     const deck = new Deck<CardData>();
//     const pool = [
//         { suit: Suit.HEARTS, value: 9 },
//         { suit: Suit.DIAMONDS, value: 9 },
//         { suit: Suit.SPADES, value: 13 },
//         { suit: Suit.CLUBS, value: 13 }
//     ];
//     for (let e of pool) {
//         for (let rank = 2; rank <= e.value + 1; rank++) {
//             const card_data: CardData = new CardData(e.suit, rank);
//             deck.addCard(card_data);
//         }
//     }
//     return deck;
// }
//# sourceMappingURL=deck.js.map