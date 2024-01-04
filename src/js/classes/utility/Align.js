import {game} from "../../index";

export default class Align {

    static scaleToGameWidth(obj, per) {
        obj.displayWidth = game.config.width * per;
        obj.scaleY = obj.scaleX;
    }

    static center(obj) {
        centerH(obj);
        centerV(obj);
    }

    static centerH(obj) {
        obj.x = game.config.width / 2;
    }

    static centerV(obj) {
        obj.y = game.config.height / 2;
    }
}