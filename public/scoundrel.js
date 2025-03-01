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
const THREE = __importStar(require("three"));
const game_loop_1 = require("./game_loop");
const card_scene_1 = require("./card_scene");
const game_loop = game_loop_1.GameLoop.get_instance();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 4;
document.body.appendChild(renderer.domElement);
const MouseMove = (event) => {
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;
        if (scene.intersected != hoveredObject) {
            scene.intersected = hoveredObject;
            if (scene.intersected) {
                if (scene.intersected.parent) {
                    scene.events.notify(EVENTS.MOUSE_ENTERED, scene.intersected.parent.id);
                }
            }
        }
    }
    else {
        if (scene.intersected) {
            if (scene.intersected.parent) {
                scene.events.notify(EVENTS.MOUSE_EXITED, scene.intersected.parent.id);
            }
        }
        scene.intersected = null;
    }
};
const EVENTS = {
    MOUSE_ENTERED: "mouse.entered",
    MOUSE_EXITED: "mouse.exited",
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
            listeners.forEach(listener => listener.Update(data));
        }
    }
}
class OnMouseEntered {
    Update(id) {
        const entity = scene.GetEntity(id);
        if (entity && "onMouseEntered" in entity) {
            entity.onMouseEntered();
        }
    }
}
class OnMouseExited {
    Update(id) {
        const entity = scene.GetEntity(id);
        if (entity && "onMouseExited" in entity) {
            entity.onMouseExited();
        }
    }
}
class Scoundrel extends THREE.Scene {
    constructor() {
        super();
        this.events = new EventManager();
        this.entities = new Map();
        this.intersected = null;
    }
    AddChild(entity) {
        if (entity) {
            const entityId = entity.id;
            if (entityId) {
                this.entities.set(entityId, entity);
            }
        }
        this.add(entity);
    }
    UpdateEntities(delta) {
        this.entities.forEach(entity => {
            if (typeof entity.Update === 'function') {
                entity.Update(delta);
            }
        });
    }
    GetEntity(id) {
        return this.entities.get(id);
    }
}
const scene = new Scoundrel();
scene.events.subscribe(EVENTS.MOUSE_ENTERED, new OnMouseEntered());
scene.events.subscribe(EVENTS.MOUSE_EXITED, new OnMouseExited());
const card = new card_scene_1.CardScene(card_scene_1.Suit.HEARTS, 1);
scene.AddChild(card);
window.addEventListener('mousemove', MouseMove);
game_loop.Start((delta) => {
    scene.UpdateEntities(delta);
}, () => {
    raycaster.setFromCamera(pointer, camera);
    renderer.render(scene, camera);
});
//# sourceMappingURL=scoundrel.js.map