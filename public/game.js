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
exports.GameScene = void 0;
const THREE = __importStar(require("three"));
const event_manager_1 = require("./event_manager");
const node_1 = require("./node");
class GameScene {
    static get instance() {
        if (!this._instance) {
            this._instance = new GameScene();
        }
        return this._instance;
    }
    get entities() {
        return this._entities;
    }
    constructor() {
        this._scene = new THREE.Scene;
        this._entities = [];
        this._intersected = null;
        this._emitter = new event_manager_1.Emitter();
        if (GameScene._instance) {
            throw new Error("Use GameScene.instance instead of new GameScene()");
        }
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(this._width, this._height);
        document.body.appendChild(this._renderer.domElement);
        const aspectRatio = this._width / this._height;
        this._camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        this._camera.position.set(0, 0, 4);
        this._pointer = new THREE.Vector2(0, 0);
        this._raycaster = new THREE.Raycaster();
        window.addEventListener('resize', () => {
            this._emitter.emit('windowResize', {});
        }, false);
        document.addEventListener('mousemove', (event) => {
            this._emitter.emit('mouseMove', event);
        });
    }
    init() {
        this._emitter.on("nodeAdded", (node) => {
            node.init();
            this._scene.add(node.mesh);
            console.info(`Node added: ${node.name}`);
        });
        this._emitter.on("mouseMove", (event) => {
            this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this._pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        this._emitter.on("mouseEntered", (node) => {
            node.eventEmitter.emit("onMouseEntered", {});
        });
        this._emitter.on("mouseExited", (node) => {
            node.eventEmitter.emit("onMouseExited", {});
        });
        this._emitter.on("windowResize", (event) => {
            this._width = window.innerWidth;
            this._height = window.innerHeight;
            this._renderer.setSize(this._width, this._height);
            this._camera.aspect = this._width / this._height;
            this._camera.updateProjectionMatrix();
        });
    }
    update(delta) {
        this._entities.forEach(entity => entity.update(delta));
        this._raycaster.setFromCamera(this._pointer, this._camera);
        const intersects = this._raycaster.intersectObjects(this._scene.children, false);
        if (intersects.length > 0) {
            if (this._intersected != intersects[0].object) {
                if (this._intersected) {
                    // console.log("was")
                }
                this._intersected = intersects[0].object;
                const node = this.getEntityById(this._intersected.id);
                if (node)
                    this._emitter.emit("mouseEntered", node);
            }
        }
        else {
            if (this._intersected) {
                const node = this.getEntityById(this._intersected.id);
                if (node)
                    this._emitter.emit("mouseExited", node);
            }
            this._intersected = null;
        }
    }
    render() {
        this._camera.updateMatrixWorld();
        this._renderer.render(this._scene, this._camera);
    }
    addNode(node) {
        if (!(node instanceof node_1.Node)) {
            throw new Error("Invalid argument: Expected an instance of Node.");
        }
        this._entities.push(node);
        this._scene.add(node.mesh);
        this._emitter.emit("nodeAdded", node);
    }
    getEntityById(id) {
        return this._entities.find(entity => entity.mesh.id === id);
    }
}
exports.GameScene = GameScene;
//# sourceMappingURL=game.js.map