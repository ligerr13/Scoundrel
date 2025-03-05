"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = exports.EventType = void 0;
exports.EventType = {
    MOUSE_ENTERED: "mouse.entered",
    MOUSE_EXITED: "mouse.exited",
    MOUSE_CLICKED: "mouse.clicked",
};
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    subscribe(eventType, listener) {
        var _a;
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        (_a = this.listeners.get(eventType)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    unsubscribe(eventType, listener) {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
    notify(eventType, data) {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            listeners.forEach(listener => listener.update(data));
        }
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=event_manager.js.map