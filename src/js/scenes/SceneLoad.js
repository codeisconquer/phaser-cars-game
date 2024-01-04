import Bar from "../classes/comps/Bar";
import Model from "../classes/mc/Model";
import Controller from "../classes/mc/Controller";
import Singleton from "../classes/mc/Singleton";
import MediaManager from "../classes/utility/MediaManager";

export default class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload() {

        console.log('SceneLoad preload method called');
        const emitter = new Phaser.Events.EventEmitter();
        const model = new Model(emitter);
        const controller = new Controller({emitter: emitter, model: model});
        const mediaManager = new MediaManager({scene: this, emitter: emitter, model: model});
        const s = new Singleton({
            emitter: emitter,
            model: model,
            controller: controller,
            mediaManager: mediaManager
        });
        // s.increaseScore();
        // s.increaseScore();
        console.log("s 1", s);
        
        this.bar = new Bar({ scene: this, x: this.game.config.width / 2, y: this.game.config.height / 2 });
        this.progText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "0%", { color: "#ffffff", fontSize: this.game.config.width / 20 });
        this.progText.setOrigin(0.5, 0.5);
        this.load.on("progress", this.onProgress, this);
        this.load.image("road", "images/road.jpg");
        this.load.spritesheet("cars", "images/cars.png", { frameWidth: 60, frameHeight: 126 });
        this.load.image("line", "images/line.png");

        this.load.image("cone", "images/cone.png");
        this.load.image("pcar1", "images/pcar1.png");
        this.load.image("pcar2", "images/pcar2.png");
        this.load.image("barrier", "images/barrier.png");


        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");

        this.load.audio("boom", ["audio/boom.mp3", "audio/boom.ogg"]);
        this.load.audio("whoosh", ["audio/whoosh.mp3", "audio/whoosh.ogg"]);
        this.load.audio("backgroundMusic", ["audio/random-race.mp3", "audio/random-race.ogg"]);

        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("title", "images/title.png");
        this.load.image("titleBack", "images/titleBack.jpg");

    }
    create() {
        console.log('SceneLoad create method called', this.game);
        this.scene.start("SceneTitle");
    }


    update() {
        // console.log('SceneLoad update method called');
    }

    onProgress(value) {

        this.bar.setPercent(value);
        var per = Math.floor(value * 100);
        this.progText.setText(`${per}%`);
    }

}