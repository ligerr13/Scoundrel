import * as THREE from 'three';

const manager = new THREE.LoadingManager();
export const loader = new THREE.TextureLoader(manager);

interface TexturePromisesCache {
    [key: string]: Promise<THREE.Texture>;
}

export function texturePromise(texture_path: string, texture_loader: THREE.TextureLoader): Promise<THREE.Texture> {
    let texture_promise: Promise<THREE.Texture>;

    if (texturePromise.texturePromises_cache[texture_path] !== undefined) {
        return texturePromise.texturePromises_cache[texture_path];
    }

    texture_promise = new Promise<THREE.Texture>((resolve, reject) => {
        texture_loader.load(
            texture_path,
            (texture) => {
                resolve(texture);
            },
            undefined,
            (error) => {
                reject(new Error(`Could not load texture: ${texture_path}`));
            }
        );
    });

    texturePromise.texturePromises_cache[texture_path] = texture_promise;

    return texture_promise;
}

texturePromise.texturePromises_cache = {} as TexturePromisesCache;


export class SubTexture {
    private texture: THREE.Texture | null = null;
    private texture_coords: THREE.Vector2[] = [];

    constructor(texture: THREE.Texture, min: THREE.Vector2, max: THREE.Vector2) {
        this.texture = texture;

        this.texture_coords[0] = new THREE.Vector2(min.x, min.y);
        this.texture_coords[1] = new THREE.Vector2(max.x, min.y);
        this.texture_coords[2] = new THREE.Vector2(max.x, max.y);
        this.texture_coords[3] = new THREE.Vector2(min.x, max.y);
    }

    public static createFromCoords(texture: THREE.Texture, coords: THREE.Vector2, sprite_size: THREE.Vector2): THREE.Texture {
        const map_w: number = texture.image.width;
        const map_h: number = texture.image.height;

        const min: THREE.Vector2 = new THREE.Vector2(
            (coords.x * sprite_size.x) / map_w,
            (coords.y * sprite_size.y) / map_h
        );

        const max: THREE.Vector2 = new THREE.Vector2(
            ((coords.x + 1) * sprite_size.x) / map_w,
            ((coords.y + 1) * sprite_size.y) / map_h
        );

        const newTexture = texture.clone();

        newTexture.offset.set(min.x, min.y);
        newTexture.repeat.set(max.x - min.x, max.y - min.y);

        newTexture.minFilter = THREE.NearestFilter;
        newTexture.magFilter = THREE.NearestFilter;

        return newTexture;
    }
}
