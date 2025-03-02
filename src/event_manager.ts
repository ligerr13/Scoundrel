import { IEventListener, IHoverable } from './interfaces/entity';

export const EventType = {
    MOUSE_ENTERED: "mouse.entered",
    MOUSE_EXITED: "mouse.exited",
} as const;

type EventTypeKeys = keyof typeof EventType;
type EventTypeValues = (typeof EventType)[EventTypeKeys];

export class EventManager {
    private listeners: Map<EventTypeValues, IEventListener[]> = new Map();

    subscribe(eventType: EventTypeValues, listener: IEventListener): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(listener);
    }

    unsubscribe(eventType: EventTypeValues, listener: IEventListener): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    notify(eventType: EventTypeValues, data: any): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            listeners.forEach(listener => listener.update(data));
        }
    }
}
