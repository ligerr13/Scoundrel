// // import { Card, SuitType, CardFactory } from './card'

// export class Deck<T extends Card> {
//     private cards: T[] = [];
    
//     public add_card(card: T): void {
//         this.cards.push(card);
//     }
    
//     public add_many(_cards: T[]): void {
//         _cards.forEach(card => {
//             this.add_card(card);
//         });
//     }

//     public rm_card(card: T): void {
//         const c = this.get_card(card);
//         if (c) {
//             this.cards = this.cards.filter(existingCard => existingCard !== c);}
//     }

//     public rm_many(_cards: T[] = this.cards): void {
//         _cards.forEach(card => {
//             this.rm_card(card);
//         });
//     }
    
//     public get_card(card: T): T | undefined {
//         for (const c of this.cards) {
//             if (c.Suit === card.Suit && c.Rank === card.Rank) {
//                 return c;
//             }
//         }
//         return undefined;
//     }

//     public get_cards(): T[] {
//         return this.cards
//     }

//     __str__(): string {
//         return `Deck contains:\n` + this.cards.map(card => card.__str__()).join("\n");    }
// }


// export function generate_deck(): Deck<Card> {
//         const deck = new Deck<Card>();

//         const pool = [
//             { 
//                 suit: SuitType.HEARTS, 
//                 value: 9 
//             },
//             { 
//                 suit: SuitType.DIAMONDS, 
//                 value: 9 
//             },
//             { 
//                 suit: SuitType.SPADES, 
//                 value: 13 
//             },
//             { 
//                 suit: SuitType.CLUBS, 
//                 value: 13 
//             }
//         ];

//         for (let e of pool) {
//             for (let rank = 2; rank <= e.value + 1; rank++) {
//                 const card = CardFactory.create(e.suit, rank);
//                 deck.add_card(card);
//             }
//         }

//         return deck;
//     }

// export function shuffle(cards: Card[]): Card[] {
//     var copy: Card[] = cards
    
//     for (let cid = copy.length - 1; cid > 1; cid--) {
//         const y = Math.floor(Math.random() * cid);
        
//         const c_y = copy[y]
//         copy[y] = copy[cid]
//         copy[cid] = c_y
//     }
    
//     return copy
// }