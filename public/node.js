"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const three_1 = require("three");
const entity_1 = require("./interfaces/entity");
const event_manager_1 = require("./event_manager");
class Node {
    get mesh() {
        return this._mesh;
    }
    get name() {
        return this._name;
    }
    get width() {
        return this._g.x;
    }
    get height() {
        return this._g.y;
    }
    constructor(name = "Node", position, geometry) {
        this[_a] = true;
        this[_b] = false;
        this._name = "";
        this._mesh = new three_1.Mesh();
        this.eventEmitter = new event_manager_1.Emitter();
        this.id = Node.ref_counted += 1;
        this._name = `${name}_${this.id}`;
        this._position = position;
        this._g = geometry;
        this._mesh.position.set(this._position.x, this._position.y, this._position.z);
    }
    init() {
        this.eventEmitter.on("onMouseEntered", (node) => {
            this.onMouseEntered();
        });
        this.eventEmitter.on("onMouseExited", (node) => {
            this.onMouseExited();
        });
    }
    update(delta) {
        this._mesh.position.set(this._position.x, this._position.y, this._position.z);
    }
    render() {
    }
    onMouseEntered() {
        console.log("Mouse Entered");
    }
    onMouseExited() {
        console.log("Mouse Exited");
    }
}
exports.Node = Node;
_a = entity_1.iEntity, _b = entity_1.iHoverable;
Node.ref_counted = 0;
//# sourceMappingURL=node.js.map