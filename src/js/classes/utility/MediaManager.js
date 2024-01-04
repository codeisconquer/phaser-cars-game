import { G } from "../../index";

export default class MediaManager {
    constructor(config) {

        this.scene = config.scene;
        this.model = config.model;
        this.emitter = config.emitter;
        // console.log('this.emitter', this.emitter)
        this.emitter.on(G.PLAY_SOUND, this.playSound, this);
        this.emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);

    }

    musicChanged() {
        if (this.background) {
            if (this.model.musicOn == false) {
                this.background.stop();
            } else {
                this.background.play();
            }
        }
    }

    playSound(key) {

        if (this.model.soundOn == true) {
            this.sound = this.scene.sound.add(key);
            this.sound.play();
        }
    }

    setBackgroundMusic(key) {

        if (this.model.musicOn == true) {
            this.background = this.scene.sound.add(key, { volume: .5, loop: true });
            this.background.play();
        }
    }
}