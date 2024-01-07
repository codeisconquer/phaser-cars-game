import {G} from "../../index";
import Singleton from "./Singleton";

export default class Controller {

    constructor(config) {

        this.emitter = config.emitter;
        this.model = config.model;
        this.emitter.on(G.SET_SCORE, this.setScore);
        this.emitter.on(G.UP_POINTS, this.upPoints);
        this.emitter.on(G.TOGGLE_SOUND, this.toggleSound);
        this.emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
    }


    toggleSound(val) {
        this.model.soundOn = val;
    }

    toggleMusic(val) {
        this.model.musicOn = val;
    }

    setScore(score) {
        this.model.score = score;
    }

    upPoints(points) {
        const s = new Singleton();
        console.log("s 3", s);
        const model = s.model;
        console.log("smodel 3", s.model);
        var score = model.getScore();
        score += points;
        model.setScore(score);
    }
}
