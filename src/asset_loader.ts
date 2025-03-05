import * as THREE from 'three';

// Állandó a textúra elérési úthoz
export const CARD_TEXTURE_MAP: string = '../src/assets/cards.png'

const manager = new THREE.LoadingManager();

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

// A szubtextúra osztálya
export class SubTexture {
    private _texture: THREE.Texture | null = null;
    private texture_coords: THREE.Vector2[] = [];

    public get texture() {
        return this._texture;
    }

    constructor(texture: THREE.Texture, min: THREE.Vector2, max: THREE.Vector2) {
        this._texture = texture;

        this.texture_coords[0] = new THREE.Vector2(min.x, min.y);
        this.texture_coords[1] = new THREE.Vector2(max.x, min.y);
        this.texture_coords[2] = new THREE.Vector2(max.x, max.y);
        this.texture_coords[3] = new THREE.Vector2(min.x, max.y);
    }

    public static createFromCoords(texture: THREE.Texture, coords: THREE.Vector2, sprite_size: THREE.Vector2): SubTexture {
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

        return new SubTexture(newTexture, min, max); 
    }
}

export function TextureAtlas(texturePath: string, region: THREE.Vector4): Promise<SubTexture> {
    const loader = new THREE.TextureLoader(manager);

    return new Promise((resolve, reject) => {
        const cardMeshPromise = texturePromise(texturePath, loader);

        cardMeshPromise.then((texture) => {
            const sprite_size = new THREE.Vector2(region.z, region.w);
            const coords = new THREE.Vector2(region.x, region.y);

            const subTexture = SubTexture.createFromCoords(texture, coords, sprite_size);
            
            resolve(subTexture);
        }).catch((error) => {
            reject(new Error('Error occurred while loading texture: ' + error.message));
        });
    });
}
