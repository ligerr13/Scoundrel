"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor() {
        this.health = 20;
        this.equippedWeapon = undefined;
    }
    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0)
            this.health = 0;
    }
    equipWeapon(weapon) {
        this.equippedWeapon = weapon;
    }
    heal(amount) {
        if (this.health + amount <= 20) {
            this.health += amount;
        }
    }
    get isAlive() {
        return (this.health < 0);
    }
    get hasWeapon() {
        return this.equippedWeapon != undefined;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map