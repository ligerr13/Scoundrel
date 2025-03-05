import { iEmitter, EventMap, EventKey, EventReceiver } from './interfaces/entity';
import EventEmitter from 'eventemitter3';




export class Emitter<T extends EventMap> implements iEmitter<T> {
    private emitter = new EventEmitter();

    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
        this.emitter.on(eventName, fn);
    }

    off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
        this.emitter.off(eventName, fn);
    }

    emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
        this.emitter.emit(eventName, params);
    }
}
