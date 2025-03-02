"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoundrelTexture = void 0;
const three_1 = require("three");
class ScoundrelTexture {
    constructor() {
        this.textures = new Map();
        this.loader = new three_1.TextureLoader();
    }
    static getInstance() {
        if (!ScoundrelTexture.instance) {
            ScoundrelTexture.instance = new ScoundrelTexture();
        }
        return ScoundrelTexture.instance;
    }
    loadTexture(name, path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.loader.load(path, (texture) => {
                    this.textures.set(name, texture);
                    resolve();
                }, undefined, (error) => reject(error));
            });
        });
    }
    getTexture(name) {
        return this.textures.get(name);
    }
}
exports.ScoundrelTexture = ScoundrelTexture;
//# sourceMappingURL=utils.js.map