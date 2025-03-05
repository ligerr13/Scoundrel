"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = exports.Dungeon = void 0;
exports.fillDeck = fillDeck;
const THREE = __importStar(require("three"));
const card_1 = require("./card");
const utils_1 = require("./utils");
class Dungeon extends THREE.Mesh {
    constructor() {
        super();
        this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
        this.material = new THREE.MeshBasicMaterial({
            map: null,
            color: 0xffffff,
            transparent: true,
            side: THREE.DoubleSide
        });
    }
    start() {
        this.dungeonDeck = new Deck();
        this.dungeonDeck.shuffle();
    }
    onClick() {
        console.log("The Player just clicked me.....");
    }
    onMouseEntered() {
    }
    onMouseExited() {
    }
}
exports.Dungeon = Dungeon;
class Deck {
    constructor(maxSize = Infinity) {
        this.cards = [];
        this.maxSize = maxSize;
    }
    addCard(card) {
        if (this.cards.length < this.maxSize) {
            this.cards.push(card);
        }
        else {
            console.warn(`Cannot add card: deck has reached its maximum size of ${this.maxSize}`);
        }
    }
    addMany(_cards) {
        if (this.cards.length + _cards.length <= this.maxSize) {
            _cards.forEach(card => {
                this.addCard(card);
            });
        }
        else {
            console.warn(`Cannot add ${_cards.length} cards: deck will exceed its maximum size of ${this.maxSize}`);
        }
    }
    rmCard(card) {
        const c = this.getCard(card);
        if (c) {
            this.cards = this.cards.filter(existingCard => existingCard !== c);
        }
    }
    rmMany(_cards = this.cards) {
        _cards.forEach(card => {
            this.rmCard(card);
        });
    }
    getCard(card) {
        return this.cards.find(c => c.Suit === card.Suit && c.Rank === card.Rank);
    }
    getCards() {
        return this.cards;
    }
    popTop() {
        if (this.cards.length === 0) {
            console.warn("Cannot pop: Deck is empty");
            return undefined;
        }
        return this.cards.pop();
    }
    shuffle() {
        var copy = [];
        for (let cid = copy.length - 1; cid > 1; cid--) {
            const y = Math.floor(Math.random() * cid);
            const c_y = copy[y];
            copy[y] = copy[cid];
            copy[cid] = c_y;
        }
        this.cards = copy;
    }
    toString() {
        return `Deck contains (${this.cards.length}/${this.maxSize}):\n` + this.cards.map(card => card.toString()).join("\n");
    }
}
exports.Deck = Deck;
function fillDeck() {
    const deck = new Deck();
    const pool = [
        {
            suit: utils_1.Suit.HEARTS,
            value: 9
        },
        {
            suit: utils_1.Suit.DIAMONDS,
            value: 9
        },
        {
            suit: utils_1.Suit.SPADES,
            value: 13
        },
        {
            suit: utils_1.Suit.CLUBS,
            value: 13
        }
    ];
    for (let e of pool) {
        for (let rank = 2; rank <= e.value + 1; rank++) {
            const card_data = new card_1.CardData(e.suit, rank);
            deck.addCard(card_data);
        }
    }
    return deck;
}
//# sourceMappingURL=deck.js.map