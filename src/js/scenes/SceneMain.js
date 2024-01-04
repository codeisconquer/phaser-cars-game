import Road from "../classes/Road";
import { G } from "../index";
import AlignGrid from "../classes/utility/AlignGrid";
import SoundButtons from "../classes/ui/SoundButtons";
import ScoreBox from "../classes/comps/ScoreBox";
import Singleton from "../classes/mc/Singleton";

export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() { }
    create() {
        const s = new Singleton();
        console.log("s 2", s);
        const emitter = s.emitter;
        const model = s.model;
        const mediaManager = s.mediaManager;
        

        s.model.reset();

        this.road = new Road({
            emitter: emitter,
            game: this.game,
            model: model,
            mediaManager: mediaManager,
            scene: this
        });
        this.road.x = this.game.config.width * .25;
        this.road.makeLines();

        this.road2 = new Road({
            emitter: emitter,
            game: this.game,
            model: model,
            mediaManager: mediaManager,
            scene: this
        });
        this.road2.x = this.game.config.width * .75;
        this.road2.makeLines();
        this.road2.car.setFrame(1);
        this.alignGrid = new AlignGrid({
            scene: this,
            rows: 5,
            cols: 5
        });
        var soundButtons = new SoundButtons({ scene: this, model: model });
        this.sb = new ScoreBox({ scene: this, emitter: emitter, model: model });
        this.sb.x = this.game.config.width / 2;
        this.sb.y = 50;
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }
    update() {
        this.road.moveLines();
        this.road.moveObject();
        this.road2.moveLines();
        this.road2.moveObject();
    }

    scoreUpdated() {
        const s = new Singleton();
        const model = s.model;
        if (model.getScore() / 5 == Math.floor(model.score / 5)) {
            model.speed += .25;
            if (model.speed > 1.5) {
                model.speed = 1.5;
            }

        }

    }
}