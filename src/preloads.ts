import { ScoundrelTexture } from './utils';

export async function preloadTextures(): Promise<void> {
    const textureLoader = ScoundrelTexture.getInstance();
    
    await textureLoader.loadTexture('cards', '/assets/cards.png');
}
