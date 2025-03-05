"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
class Process {
    constructor() {
        /* Settings */
        this.PHYSICS_FPS = 60;
        this.MIN_FPS = 20;
        this.MAX_FPS = 144;
        this.target_fps = this.PHYSICS_FPS;
        this.is_running = false;
        this.delta_time = 0.0;
        this.accumulator = 0.0;
        this.game_start_time = 0.0;
        this.last_time_stamp = 0.0;
    }
    calculate_delta_time(ts) {
        const delta_time = ts - this.last_time_stamp;
        this.last_time_stamp = ts;
        return Math.min(delta_time, this.max_delta_time);
    }
    update_game_logic(update) {
        this.accumulator += this.delta_time;
        if (this.accumulator > this.max_delta_time) {
            this.accumulator = this.max_delta_time;
        }
        const NumberOfUpdates = Math.floor(this.accumulator / this.target_frame_rate);
        for (let i = 0; i < NumberOfUpdates; i++) {
            update(this.target_frame_rate / 1000);
            this.accumulator -= this.target_frame_rate;
        }
    }
    Stop() {
        if (!this.last_requested_id)
            return;
        this.is_running = false;
        cancelAnimationFrame(this.last_requested_id);
        this.last_requested_id = undefined;
        this.game_start_time = 0;
    }
    start(init, update, render) {
        this.is_running = true;
        this.last_time_stamp = performance.now();
        this.game_start_time = this.last_time_stamp;
        init();
        const loop = (timestamp) => {
            if (!this.is_running)
                return;
            this.last_requested_id = requestAnimationFrame(loop);
            this.delta_time = this.calculate_delta_time(timestamp);
            this.update_game_logic(update);
            render();
        };
        requestAnimationFrame(loop);
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new Process();
        }
        return this._instance;
    }
    get time() {
        return this.last_time_stamp - this.game_start_time;
    }
    get target_frame_rate() {
        return 1000 / this.target_fps;
    }
    get max_delta_time() {
        return 1000 / this.MIN_FPS;
    }
    set_target_fps(fps) {
        this.target_fps = Math.min(Math.max(fps, this.MIN_FPS), this.MAX_FPS);
    }
}
exports.Process = Process;
//# sourceMappingURL=process.js.map