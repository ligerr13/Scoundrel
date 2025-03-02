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
exports.loader = void 0;
exports.texturePromise = texturePromise;
const THREE = __importStar(require("three"));
const manager = new THREE.LoadingManager();
exports.loader = new THREE.TextureLoader(manager);
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
//# sourceMappingURL=asset_loader.js.map