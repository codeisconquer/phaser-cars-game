
import Phaser from 'phaser';
import { G } from "../../index";

class ModelPlugin extends Phaser.Plugins.BasePlugin {
    constructor() {
        super();
        this.isMobile = navigator.userAgent.indexOf("Mobile");
        if (this.isMobile == -1) {
            this.isMobile = navigator.userAgent.indexOf("Tablet");
        }
        this._gameOver = false;
        this._score = 0;
        this._soundOn = true;
        this._musicOn = true;
        this.emitter = null;
    }

    init(config) {
        const scene = config.scene;
        this.emitter = config.emitter;
        if (!this.emitter) {
            console.error("Emitter plugin not found");
        }
    }

    initEmitters() {

        this.emitter.on(G.SET_SCORE, this.setScore);
        this.emitter.on(G.UP_POINTS, this.upPoints);
        this.emitter.on(G.TOGGLE_SOUND, this.toggleSound);
        this.emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
    }

    toggleSound(val) {
        this.soundOn = val;
    }

    toggleMusic(val) {
        this.musicOn = val;
    }

    setScore(score) {
        this.score = score;
    }

    upPoints(points) {
        var score = this.score;
        score += points;
        this.score = score;
    }


    set score(val) {
        this._score = val;
        console.log('Score updated', this._score);
        if (this._gameOver == true) return;
        this.emitter.emit(G.SCORE_UPDATED);
    }

    get score() {
        return this._score;
    }

    get gameOver() {
        return this._gameOver;
    }

    set gameOver(val) {
        this._gameOver = val;
    }

    get soundOn() {
        return this._soundOn;
    }

    set soundOn(val) {
        this._soundOn = val;
    }

    get musicOn() {
        return this._musicOn;
    }

    set musicOn(val) {
        this._musicOn = val;
        this.emitter.emit(G.MUSIC_CHANGED);
        mediaManager.musicChanged();
    }
}

export default ModelPlugin;
