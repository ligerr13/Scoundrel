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
exports.CardScene = exports.Suit = void 0;
const THREE = __importStar(require("three"));
const asset_loader_1 = require("./asset_loader");
const CARD_TEXTURE_MAP = '../src/assets/cards.png';
var Suit;
(function (Suit) {
    Suit[Suit["HEARTS"] = 0] = "HEARTS";
    Suit[Suit["DIAMONDS"] = 1] = "DIAMONDS";
    Suit[Suit["SPADES"] = 2] = "SPADES";
    Suit[Suit["CLUBS"] = 3] = "CLUBS";
})(Suit || (exports.Suit = Suit = {}));
class CardScene extends THREE.Mesh {
    constructor(suit, rank) {
        super();
        this._suit = null;
        this._rank = null;
        this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
        this.material = new THREE.MeshBasicMaterial({
            map: null,
            color: 0xffffff,
            transparent: true,
            side: THREE.DoubleSide
        });
        this._suit = suit;
        this._rank = rank;
        this.position.set(THREE.MathUtils.randFloat(-2, 2), THREE.MathUtils.randFloat(-2, 2), 0);
        const card_mesh_promise = (0, asset_loader_1.texturePromise)(CARD_TEXTURE_MAP, asset_loader_1.loader);
        card_mesh_promise
            .then((texture) => {
            console.log('Texture loaded successfully:', texture);
        })
            .catch((error) => {
            console.error('Failed to load texture:', error);
        });
        console.log(this._texture);
    }
    ready() {
        if (this._texture) {
            console.log("wooooo");
            this.material.map = this._texture;
            this.material.needsUpdate = true;
        }
    }
    // Hiba esetén
    onTextureError() {
        console.error("There was an error loading the texture.");
    }
    update(delta) {
        this.rotation.y += 1 * delta;
    }
    render() { }
    onMouseEntered() {
        this.material.color.set(0xff0000);
    }
    onMouseExited() {
        this.material.color.set(0xffffff);
    }
    get Suit() {
        return this._suit;
    }
    get Rank() {
        return this._rank;
    }
    get Texture() {
        return this._texture;
    }
}
exports.CardScene = CardScene;
//# sourceMappingURL=card.js.map