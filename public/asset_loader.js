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
exports.SubTexture = exports.CARD_TEXTURE_MAP = void 0;
exports.texturePromise = texturePromise;
exports.TextureAtlas = TextureAtlas;
const THREE = __importStar(require("three"));
// Állandó a textúra elérési úthoz
exports.CARD_TEXTURE_MAP = '../src/assets/cards.png';
const manager = new THREE.LoadingManager();
function texturePromise(texture_path, texture_loader) {
    let texture_promise;
    if (texturePromise.texturePromises_cache[texture_path] !== undefined) {
        return texturePromise.texturePromises_cache[texture_path];
    }
    texture_promise = new Promise((resolve, reject) => {
        texture_loader.load(texture_path, (texture) => {
            resolve(texture);
        }, undefined, (error) => {
            reject(new Error(`Could not load texture: ${texture_path}`));
        });
    });
    texturePromise.texturePromises_cache[texture_path] = texture_promise;
    return texture_promise;
}
texturePromise.texturePromises_cache = {};
// A szubtextúra osztálya
class SubTexture {
    get texture() {
        return this._texture;
    }
    constructor(texture, min, max) {
        this._texture = null;
        this.texture_coords = [];
        this._texture = texture;
        this.texture_coords[0] = new THREE.Vector2(min.x, min.y);
        this.texture_coords[1] = new THREE.Vector2(max.x, min.y);
        this.texture_coords[2] = new THREE.Vector2(max.x, max.y);
        this.texture_coords[3] = new THREE.Vector2(min.x, max.y);
    }
    static createFromCoords(texture, coords, sprite_size) {
        const map_w = texture.image.width;
        const map_h = texture.image.height;
        const min = new THREE.Vector2((coords.x * sprite_size.x) / map_w, (coords.y * sprite_size.y) / map_h);
        const max = new THREE.Vector2(((coords.x + 1) * sprite_size.x) / map_w, ((coords.y + 1) * sprite_size.y) / map_h);
        const newTexture = texture.clone();
        newTexture.offset.set(min.x, min.y);
        newTexture.repeat.set(max.x - min.x, max.y - min.y);
        newTexture.minFilter = THREE.NearestFilter;
        newTexture.magFilter = THREE.NearestFilter;
        return new SubTexture(newTexture, min, max);
    }
}
exports.SubTexture = SubTexture;
function TextureAtlas(texturePath, region) {
    const loader = new THREE.TextureLoader(manager);
    return new Promise((resolve, reject) => {
        const cardMeshPromise = texturePromise(texturePath, loader);
        cardMeshPromise.then((texture) => {
            const sprite_size = new THREE.Vector2(region.z, region.w);
            const coords = new THREE.Vector2(region.x, region.y);
            const subTexture = SubTexture.createFromCoords(texture, coords, sprite_size);
            resolve(subTexture);
        }).catch((error) => {
            reject(new Error('Error occurred while loading texture: ' + error.message));
        });
    });
}
//# sourceMappingURL=asset_loader.js.map