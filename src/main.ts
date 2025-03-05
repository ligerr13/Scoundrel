import {GameScene} from './game'
import {Process} from './process'
import {Node} from './node'
import {CardScene, CardData} from './card'
import {DeckScene} from './deck'
import { Vector3, Vector2} from 'three';


Process.instance.start(
    ()=> {
        GameScene.instance.init(); 

        
        const deck: DeckScene = new DeckScene("DungeonDeck", new Vector3(-2, 0, 0), new Vector2(0.57 * 2, 0.88 * 2));
        const data_1: CardData = new CardData(0, 2);
        const data_2: CardData = new CardData(0, 3);
        
        const newNode = new CardScene("Card", new Vector3(0, 0, 0), new Vector2(0.57 * 2, 0.88 * 2), data_1);
        const newNode2 = new CardScene("Card", new Vector3(2, 0, 0), new Vector2(0.57 * 2, 0.88 * 2), data_2);
        
        GameScene.instance.addNode(deck); 
        GameScene.instance.addNode(newNode); 
        GameScene.instance.addNode(newNode2);

    },
    (delta)=> { 
        GameScene.instance.update(delta); 
    },
    ()=> { 
        GameScene.instance.render();
    }
);