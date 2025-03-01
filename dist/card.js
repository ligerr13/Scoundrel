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
exports.CardFactory = exports.PotionCard = exports.WeaponCard = exports.MonsterCard = exports.Card = exports.SuitType = void 0;
const THREE = __importStar(require("three"));
var SuitType;
(function (SuitType) {
    SuitType[SuitType["HEARTS"] = 1] = "HEARTS";
    SuitType[SuitType["DIAMONDS"] = 2] = "DIAMONDS";
    SuitType[SuitType["SPADES"] = 3] = "SPADES";
    SuitType[SuitType["CLUBS"] = 4] = "CLUBS";
})(SuitType || (exports.SuitType = SuitType = {}));
class Card {
    constructor(_suit = 1, _rank = 1) {
        this.geometry = new THREE.BoxGeometry(0.57 * 2, 0.88 * 2, 0.02);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.suit = _suit;
        this.rank = _rank;
        // scene.add( this.cube );
        this.id = this.cube.id;
    }
    Ready() {
    }
    Render() {
    }
    Update(delta) {
        this.cube.rotation.x += 1 * delta;
        this.cube.rotation.y += 1 * delta;
    }
    __str__() {
        return `${this.constructor.name} - Suit: ${this.suit}, Rank: ${this.rank}`;
    }
    get Suit() {
        return this.suit;
    }
    get Rank() {
        return this.rank;
    }
    get Id() {
        return this.id;
    }
}
exports.Card = Card;
class MonsterCard extends Card {
    use_card() { }
}
exports.MonsterCard = MonsterCard;
class WeaponCard extends Card {
    use_card() { }
}
exports.WeaponCard = WeaponCard;
class PotionCard extends Card {
    use_card() { }
}
exports.PotionCard = PotionCard;
class CardFactory {
    static create(suit, rank) {
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
exports.CardFactory = CardFactory;
//# sourceMappingURL=card.js.map