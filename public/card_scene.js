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
var Suit;
(function (Suit) {
    Suit[Suit["HEARTS"] = 0] = "HEARTS";
    Suit[Suit["DIAMONDS"] = 1] = "DIAMONDS";
    Suit[Suit["SPADES"] = 2] = "SPADES";
    Suit[Suit["CLUBS"] = 3] = "CLUBS";
})(Suit || (exports.Suit = Suit = {}));
class CardScene extends THREE.Object3D {
    constructor(suit, rank) {
        super();
        this._suit = suit;
        this._rank = rank;
        this.geometry = new THREE.PlaneGeometry(0.57 * 2, 0.88 * 2);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
    }
    Ready() {
        console.log("Ready?");
    }
    Update(delta) {
        this.mesh.rotation.y += 4 * delta;
    }
    Render() {
    }
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
//# sourceMappingURL=card_scene.js.map