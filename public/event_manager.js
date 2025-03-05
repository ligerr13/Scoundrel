"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class Emitter {
    constructor() {
        this.emitter = new eventemitter3_1.default();
    }
    on(eventName, fn) {
        this.emitter.on(eventName, fn);
    }
    off(eventName, fn) {
        this.emitter.off(eventName, fn);
    }
    emit(eventName, params) {
        this.emitter.emit(eventName, params);
    }
}
exports.Emitter = Emitter;
//# sourceMappingURL=event_manager.js.map