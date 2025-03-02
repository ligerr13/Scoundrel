
export class Process {
    /* Settings */
    private readonly PHYSICS_FPS = 60;
    private readonly MIN_FPS = 20;
    private readonly MAX_FPS = 144;
    private target_fps: number = this.PHYSICS_FPS

    /* Time */
    private last_requested_id?: number;
    private is_running: Boolean = false;
    private delta_time: number = 0.0
    private accumulator: number = 0.0
    private game_start_time: number = 0.0
    public last_time_stamp: number = 0.0;
    
    /* Singleton instance */
    private static instance: Process;
    
    private constructor() {}
    
    private calculate_delta_time(ts: number): number  {
        const delta_time = ts - this.last_time_stamp;
        this.last_time_stamp = ts;
        return Math.min(delta_time, this.max_delta_time);
    }
    
    private update_game_logic(update: (delta: number) => void) {
        this.accumulator += this.delta_time;
        
        if (this.accumulator > this.max_delta_time) {
            this.accumulator = this.max_delta_time;}
            
        
        const NumberOfUpdates = Math.floor(this.accumulator / this.target_frame_rate);
        for (let i = 0; i < NumberOfUpdates; i++) {
            update(this.target_frame_rate / 1000);
            this.accumulator -= this.target_frame_rate;}
        }
        
    
    public Stop(): void {
        if (!this.last_requested_id) 
            return;
        
        this.is_running = false;
        cancelAnimationFrame(this.last_requested_id);
      
        this.last_requested_id = undefined;
        this.game_start_time = 0;   
    }
    
    public Start(update: (delta: number) => void, render: () => void) {
        this.is_running = true;
        this.last_time_stamp = performance.now();      
        this.game_start_time = this.last_time_stamp;
            
        const loop = (timestamp: number) => {
            if (!this.is_running) 
                return;
                
            this.last_requested_id = requestAnimationFrame(loop);
            this.delta_time = this.calculate_delta_time(timestamp);
                
            this.update_game_logic(update);
                
            render();
        };
            
        requestAnimationFrame(loop);
    }

    public static get_instance(): Process {
        if (!this.instance) {
            this.instance = new Process();
        }
        return this.instance;
    }
    
    public get time(): number {
        return this.last_time_stamp - this.game_start_time;
    }
    
    public get target_frame_rate(): number {
        return 1000 / this.target_fps;
    }
    
    public get max_delta_time(): number {
        return 1000 / this.MIN_FPS;
    }

    public set_target_fps(fps: number) {
        this.target_fps = Math.min(Math.max(fps, this.MIN_FPS), this.MAX_FPS);
    }
}
    