"use strict";
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
}
//# sourceMappingURL=player.js.map