"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
exports.generate_deck = generate_deck;
exports.shuffle = shuffle;
const card_1 = require("./card");
class Deck {
    constructor() {
        this.cards = [];
    }
    add_card(card) {
        this.cards.push(card);
    }
    add_many(_cards) {
        _cards.forEach(card => {
            this.add_card(card);
        });
    }
    rm_card(card) {
        const c = this.get_card(card);
        if (c) {
            this.cards = this.cards.filter(existingCard => existingCard !== c);
        }
    }
    rm_many(_cards = this.cards) {
        _cards.forEach(card => {
            this.rm_card(card);
        });
    }
    get_card(card) {
        for (const c of this.cards) {
            if (c.Suit === card.Suit && c.Rank === card.Rank) {
                return c;
            }
        }
        return undefined;
    }
    get_cards() {
        return this.cards;
    }
    __str__() {
        return `Deck contains:\n` + this.cards.map(card => card.__str__()).join("\n");
    }
}
exports.Deck = Deck;
function generate_deck() {
    const deck = new Deck();
    const pool = [
        {
            suit: card_1.SuitType.HEARTS,
            value: 9
        },
        {
            suit: card_1.SuitType.DIAMONDS,
            value: 9
        },
        {
            suit: card_1.SuitType.SPADES,
            value: 13
        },
        {
            suit: card_1.SuitType.CLUBS,
            value: 13
        }
    ];
    for (let e of pool) {
        for (let rank = 2; rank <= e.value + 1; rank++) {
            const card = card_1.CardFactory.create(e.suit, rank);
            deck.add_card(card);
        }
    }
    return deck;
}
function shuffle(cards) {
    var copy = cards;
    for (let cid = copy.length - 1; cid > 1; cid--) {
        const y = Math.floor(Math.random() * cid);
        const c_y = copy[y];
        copy[y] = copy[cid];
        copy[cid] = c_y;
    }
    return copy;
}
//# sourceMappingURL=deck.js.map