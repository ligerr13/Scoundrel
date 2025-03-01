export interface IEntity {
    Ready(): void;
    Render(): void;
    Update(delta: number): void;
}

export interface IEventListener {
    Update(data: any): void;
}

export interface IHoverable {
    onMouseEntered(): void;
    onMouseExited(): void;
}
