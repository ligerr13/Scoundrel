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
const process_1 = require("./process");
const card_1 = require("./card");
const event_manager_1 = require("./event_manager");
const game_loop = process_1.Process.get_instance();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 4;
document.body.appendChild(renderer.domElement);
const mouseMove = (event) => {
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const intersects = raycaster.intersectObjects(scoundrel.children);
    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;
        if (scoundrel.intersected != hoveredObject) {
            scoundrel.intersected = hoveredObject;
            if (scoundrel.intersected) {
                if (scoundrel.intersected.parent) {
                    scoundrel.events.notify(event_manager_1.EventType.MOUSE_ENTERED, scoundrel.intersected.id);
                }
            }
        }
    }
    else {
        if (scoundrel.intersected) {
            if (scoundrel.intersected.parent) {
                scoundrel.events.notify(event_manager_1.EventType.MOUSE_EXITED, scoundrel.intersected.id);
            }
        }
        scoundrel.intersected = null;
    }
};
class onMouseEntered {
    update(id) {
        const entity = scoundrel.getChild(id);
        if (entity && "onMouseEntered" in entity) {
            entity.onMouseEntered();
        }
    }
}
class onMouseExited {
    update(id) {
        const entity = scoundrel.getChild(id);
        if (entity && "onMouseExited" in entity) {
            entity.onMouseExited();
        }
    }
}
class Scoundrel extends THREE.Scene {
    constructor() {
        super();
        this.events = new event_manager_1.EventManager();
        this.entities = new Map();
        this.intersected = null;
        this.events.subscribe(event_manager_1.EventType.MOUSE_ENTERED, new onMouseEntered());
        this.events.subscribe(event_manager_1.EventType.MOUSE_EXITED, new onMouseExited());
    }
    addChild(entity) {
        if (entity) {
            const entityId = entity.id;
            if (entityId) {
                this.entities.set(entityId, entity);
            }
        }
        this.add(entity);
    }
    updateEntities(delta) {
        this.entities.forEach(entity => {
            if (typeof entity.update === 'function') {
                entity.update(delta);
            }
        });
    }
    getChild(id) {
        return this.entities.get(id);
    }
    getChildren() {
        return this.entities;
    }
}
const scoundrel = new Scoundrel();
const card = new card_1.CardScene(card_1.Suit.HEARTS, 2);
const card_2 = new card_1.CardScene(card_1.Suit.HEARTS, 5);
const card_23 = new card_1.CardScene(card_1.Suit.HEARTS, 7);
scoundrel.addChild(card);
scoundrel.addChild(card_2);
scoundrel.addChild(card_23);
window.addEventListener('mousemove', mouseMove);
game_loop.Start((delta) => {
    scoundrel.updateEntities(delta);
}, () => {
    raycaster.setFromCamera(pointer, camera);
    renderer.render(scoundrel, camera);
});
//# sourceMappingURL=scoundrel.js.map