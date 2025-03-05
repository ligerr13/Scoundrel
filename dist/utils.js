"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardType = exports.CardState = exports.Suit = void 0;
var Suit;
(function (Suit) {
    Suit[Suit["HEARTS"] = 0] = "HEARTS";
    Suit[Suit["DIAMONDS"] = 1] = "DIAMONDS";
    Suit[Suit["SPADES"] = 2] = "SPADES";
    Suit[Suit["CLUBS"] = 3] = "CLUBS";
})(Suit || (exports.Suit = Suit = {}));
var CardState;
(function (CardState) {
    CardState[CardState["DECK"] = 0] = "DECK";
    CardState[CardState["HAND"] = 1] = "HAND";
    CardState[CardState["TABLE"] = 2] = "TABLE";
    CardState[CardState["DISCARD_PILE"] = 3] = "DISCARD_PILE";
})(CardState || (exports.CardState = CardState = {}));
var CardType;
(function (CardType) {
    CardType[CardType["POTION"] = 0] = "POTION";
    CardType[CardType["WEAPON"] = 1] = "WEAPON";
    CardType[CardType["MONSTER"] = 2] = "MONSTER";
})(CardType || (exports.CardType = CardType = {}));
//# sourceMappingURL=utils.js.map