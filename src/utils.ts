import { TextureLoader, Texture } from "three";



export class ScoundrelTexture {
    private static instance: ScoundrelTexture;
    private textures: Map<string, Texture> = new Map();
    private loader: TextureLoader = new TextureLoader();

    private constructor() {}

    public static getInstance(): ScoundrelTexture {
        if (!ScoundrelTexture.instance) {
            ScoundrelTexture.instance = new ScoundrelTexture();
        }
        return ScoundrelTexture.instance;
    }

    public async loadTexture(name: string, path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                path,
                (texture) => {
                    this.textures.set(name, texture);
                    resolve();
                },
                undefined,
                (error) => reject(error)
            );
        });
    }

    public getTexture(name: string): Texture | undefined {
        return this.textures.get(name);
    }
}
