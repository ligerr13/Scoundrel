
export class Player {
    health: number = 20;
    equippedWeapon?: number = undefined;

    constructor() {}

    public takeDamage(damage: number) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

    public equipWeapon(weapon: number) {
        this.equippedWeapon = weapon;
    }

    public heal(amount: number) {
        if (this.health + amount <= 20) {
            this.health += amount;
        }
    } 

    public get isAlive(): boolean {
        return (this.health < 0);
    }

    public get hasWeapon(): boolean {
        return this.equippedWeapon != undefined;
    }
}