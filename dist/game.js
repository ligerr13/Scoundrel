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
const deck_1 = require("./deck");
const event_manager_1 = require("./event_manager");
class onMouseEntered {
    update(id) {
        const entity = game.getChild(id);
        if (entity && "onMouseEntered" in entity) {
            entity.onMouseEntered();
        }
    }
}
class onMouseExited {
    update(id) {
        const entity = game.getChild(id);
        if (entity && "onMouseExited" in entity) {
            entity.onMouseExited();
        }
    }
}
class onClicked {
    update(id) {
        const entity = game.getChild(id);
        if (entity && "onClick" in entity) {
            entity.onClick();
        }
    }
}
// class Scoundrel extends THREE.Scene {
//     public events: EventManager = new EventManager();
//     private entities: Map<number, THREE.Object3D> = new Map();
//     public intersected?: THREE.Object3D | null = null;
//     constructor() {
//         super();
//         this.events.subscribe(EventType.MOUSE_ENTERED, 
//             new onMouseEntered());
//         this.events.subscribe(EventType.MOUSE_EXITED, 
//             new onMouseExited());
//         this.events.subscribe(EventType.MOUSE_CLICKED,
//             new onClicked());
//     }
//     public addChild(entity: THREE.Object3D) {
//         if (entity) {
//             const entityId = (entity as any).id;
//             if (entityId) {
//                 this.entities.set(entityId, entity);
//             }
//         }
//         this.add(entity);
//     }
//     public updateEntities(delta: number) {
//         this.entities.forEach(entity => {
//             if (typeof (entity as any).update === 'function') {
//                 (entity as any).update(delta);
//             }
//         });
//     }
//     public getChild(id: number): THREE.Object3D | null | undefined {
//         return this.entities.get(id);
//     }
//     public getChildren(): Map<number, THREE.Object3D> | null {
//         return this.entities
//     }
// }
class Game {
    constructor() {
        this.game_loop = process_1.Process.get_instance();
        this.dungeonScene = new deck_1.Dungeon();
        this.entities = new Map();
        this.events = new event_manager_1.EventManager();
        this.intersected = null;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.scoundrel = new THREE.Scene();
        this.camera.position.set(0, 0, 5);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.events.subscribe(event_manager_1.EventType.MOUSE_ENTERED, new onMouseEntered());
        this.events.subscribe(event_manager_1.EventType.MOUSE_EXITED, new onMouseExited());
        this.events.subscribe(event_manager_1.EventType.MOUSE_CLICKED, new onClicked());
    }
    windowResize() {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        this.renderer.setSize(canvasWidth, canvasHeight);
        this.camera.aspect = canvasWidth / canvasHeight;
        this.camera.updateProjectionMatrix();
    }
    mouseWheel(event) {
        this.camera.position.z += event.deltaY * 0.01;
        this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
    }
    mouseMove(event) {
        event.preventDefault();
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const intersects = this.raycaster.intersectObjects(this.scoundrel.children);
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
            if (this.intersected !== hoveredObject) {
                this.intersected = hoveredObject;
                if (this.intersected && this.intersected.parent) {
                    this.events.notify(event_manager_1.EventType.MOUSE_ENTERED, this.intersected.id);
                }
            }
        }
        else {
            if (this.intersected && this.intersected.parent) {
                this.events.notify(event_manager_1.EventType.MOUSE_EXITED, this.intersected.id);
            }
            this.intersected = null;
        }
    }
    mouseDown(event) {
        if (this.intersected) {
            this.events.notify(event_manager_1.EventType.MOUSE_CLICKED, this.intersected.id);
        }
    }
    getScene() {
        return this.scoundrel;
    }
    addChild(entity) {
        if (entity) {
            const entityId = entity.id;
            if (entityId) {
                this.entities.set(entityId, entity);
            }
        }
        this.scoundrel.add(entity);
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
    start() {
        this.game_loop.Start(() => {
            window.addEventListener('mousemove', this.mouseMove.bind(this));
            window.addEventListener('mousedown', this.mouseDown.bind(this));
            window.addEventListener('resize', this.windowResize.bind(this));
            window.addEventListener('wheel', this.mouseWheel.bind(this));
            this.addChild(this.dungeonScene);
            const card = new card_1.CardData(0, 2);
            const card_scene = new card_1.CardScene(card);
            card_scene.createCard();
            this.addChild(card_scene);
        }, (delta) => {
            this.updateEntities(delta);
        }, () => {
            this.raycaster.setFromCamera(this.pointer, this.camera);
            this.renderer.render(this.scoundrel, this.camera);
        });
    }
}
const game = new Game();
game.start();
//# sourceMappingURL=game.js.map