export const iEntity = Symbol('IEntity'); 
export interface iEntity {
    [iEntity]: boolean;
    init(): void;
    render?(): void;
    update?(delta: number): void;
}

export const iHoverable = Symbol('iHoverable'); 
export interface iHoverable {
    [iHoverable]: boolean;
    onMouseEntered(): void;
    onMouseExited(): void;
}

export const iInteractable = Symbol('iInteractable'); 
export interface iInteractable {
    [iInteractable]: boolean;
    onClick(): void;
}

export type EventMap = Record<string, any>;
export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T> = (params: T) => void;

export interface iEmitter<T extends EventMap> {
    on<K extends EventKey<T>>
      (eventName: K, fn: EventReceiver<T[K]>): void;
    off<K extends EventKey<T>>
      (eventName: K, fn: EventReceiver<T[K]>): void;
    emit<K extends EventKey<T>>
      (eventName: K, params: T[K]): void;
  }