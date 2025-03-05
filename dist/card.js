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
exports.CardScene = exports.CardData = void 0;
const THREE = __importStar(require("three"));
const asset_loader_1 = require("./asset_loader");
const utils_1 = require("./utils");
const CARD_TEXTURE_MAP = '../src/assets/cards.png';
class CardData {
    constructor(suit, rank) {
        this.state = utils_1.CardState.DECK;
        this.suit = suit;
        this.rank = rank;
        switch (this.suit) {
            case utils_1.Suit.HEARTS:
                this.type = utils_1.CardType.POTION;
                break;
            case utils_1.Suit.CLUBS:
            case utils_1.Suit.SPADES:
                this.type = utils_1.CardType.MONSTER;
                break;
            case utils_1.Suit.DIAMONDS:
                this.type = utils_1.CardType.WEAPON;
                break;
            default:
                break;
        }
    }
    get Suit() {
        return this.suit;
    }
    get Rank() {
        return this.rank;
    }
    toString() {
        return `Suit: ${this.Suit}, Rank: ${this.rank}, Type: ${this.type}`;
    }
}
exports.CardData = CardData;
class CardScene extends THREE.Mesh {
    constructor(card_data) {
        super();
        this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
        this.material = new THREE.MeshBasicMaterial({
            map: null,
            color: 0xffffff,
            transparent: true,
            side: THREE.DoubleSide
        });
        this.card_data = card_data;
    }
    createCard() {
        this.position.set(THREE.MathUtils.randFloat(-2, 2), THREE.MathUtils.randFloat(-2, 2), 0);
        const card_mesh_promise = (0, asset_loader_1.texturePromise)(CARD_TEXTURE_MAP, asset_loader_1.loader);
        card_mesh_promise.then((texture) => {
            var _a, _b;
            const sprite_size = new THREE.Vector2(524, 751);
            const coords = new THREE.Vector2((_a = this.card_data) === null || _a === void 0 ? void 0 : _a.Suit, (_b = this.card_data) === null || _b === void 0 ? void 0 : _b.Rank);
            const subTexture = asset_loader_1.SubTexture.createFromCoords(texture, coords, sprite_size);
            this._texture = subTexture;
            this.ready();
        })
            .catch((error) => {
            console.error('Failed to load texture:', error);
        });
    }
    ready() {
        if (this._texture) {
            this.material.map = this._texture;
            this.material.needsUpdate = true;
        }
    }
    update(delta) {
        // this.rotation.y += 1 * delta;
    }
    render() { }
    onMouseEntered() {
        this.material.color.set(0xff0000);
    }
    onMouseExited() {
        this.material.color.set(0xffffff);
    }
    get Texture() {
        return this._texture;
    }
}
exports.CardScene = CardScene;
//# sourceMappingURL=card.js.map