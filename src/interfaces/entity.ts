export interface IEntity {
    ready(): void;
    render(): void;
    update(delta: number): void;
}

export interface IEventListener {
    update(data: any): void;
}

export interface IHoverable {
    onMouseEntered(): void;
    onMouseExited(): void;
}
