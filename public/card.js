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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardScene = exports.CardData = void 0;
const THREE = __importStar(require("three"));
const asset_loader_1 = require("./asset_loader");
const three_1 = require("three");
const utils_1 = require("./utils");
const node_1 = require("./node");
const entity_1 = require("./interfaces/entity");
class CardData {
    constructor(suit, rank) {
        this._state = utils_1.CardState.DECK;
        this._suit = suit;
        this._rank = rank;
        switch (this._suit) {
            case utils_1.Suit.HEARTS:
                this._type = utils_1.CardType.POTION;
                break;
            case utils_1.Suit.CLUBS:
            case utils_1.Suit.SPADES:
                this._type = utils_1.CardType.MONSTER;
                break;
            case utils_1.Suit.DIAMONDS:
                this._type = utils_1.CardType.WEAPON;
                break;
            default:
                break;
        }
    }
    get suit() {
        return this._suit;
    }
    get rank() {
        return this._rank;
    }
    toString() {
        return `Suit: ${this.suit}, Rank: ${this._rank}, Type: ${this._type}`;
    }
}
exports.CardData = CardData;
class CardScene extends node_1.Node {
    get suit() {
        if (!this.card_data)
            return 0;
        return this.card_data.suit;
    }
    get rank() {
        if (!this.card_data)
            return 0;
        return this.card_data.rank;
    }
    constructor(name, position, geometry, card_data) {
        super(name, position, geometry);
        this[_a] = true;
        this._geometry = new three_1.PlaneGeometry(this.width, this.height);
        this._material = new three_1.MeshBasicMaterial({
            color: 0xffffff
        });
        this.card_data = card_data;
    }
    init() {
        super.init();
        (0, asset_loader_1.TextureAtlas)(asset_loader_1.CARD_TEXTURE_MAP, new THREE.Vector4(this.suit, this.rank, 524, 751))
            .then((atlas) => {
            this._material.map = atlas.texture;
            this._material.needsUpdate = true;
        })
            .catch((error) => {
            console.error('Error loading texture:', error);
        });
        this._mesh = new three_1.Mesh(this._geometry, this._material);
    }
    update(delta) {
        super.update(delta);
    }
    onMouseEntered() {
        console.log("Card vagyok entered", this.mesh.material);
        if (this.mesh.material) {
            this._material.color.set(0xD32A37);
        }
    }
    onMouseExited() {
        if (this.mesh.material) {
            this._material.color.set(0xffffff);
        }
    }
}
exports.CardScene = CardScene;
_a = entity_1.iHoverable;
//# sourceMappingURL=card.js.map