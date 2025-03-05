"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const process_1 = require("./process");
const card_1 = require("./card");
const three_1 = require("three");
process_1.Process.instance.start(() => {
    game_1.GameScene.instance.init();
    const data_1 = new card_1.CardData(0, 2);
    const data_2 = new card_1.CardData(0, 3);
    const newNode = new card_1.CardScene("Card", new three_1.Vector3(0, 0, 0), new three_1.Vector2(0.57 * 2, 0.88 * 2), data_1);
    const newNode2 = new card_1.CardScene("Card", new three_1.Vector3(2, 0, 0), new three_1.Vector2(0.57 * 2, 0.88 * 2), data_2);
    game_1.GameScene.instance.addNode(newNode);
    game_1.GameScene.instance.addNode(newNode2);
}, (delta) => {
    game_1.GameScene.instance.update(delta);
}, () => {
    game_1.GameScene.instance.render();
});
//# sourceMappingURL=main.js.map