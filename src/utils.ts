import * as THREE from 'three';

export enum Suit {
    HEARTS = 0,
    DIAMONDS = 1,
    SPADES = 2,
    CLUBS = 3
}
export enum CardState {
    DECK,
    HAND,
    TABLE,
    DISCARD_PILE
}

export enum CardType {
    POTION,
    WEAPON,
    MONSTER,
}

export function setPosition(actor: THREE.Object3D, x: number, y: number, z: number): void {
    actor.position.set(x, y, z);
}

function instanceOfA(object: any): boolean {
    return 'member' in object;
}