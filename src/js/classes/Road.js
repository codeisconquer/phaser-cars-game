import Align from "./utility/Align";
import Collision from "./utility/Collision";
import {G} from "../index";

export default class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.model = config.model;
        this.game = config.game;
        this.mediaManager = config.mediaManager
        this.emitter = config.emitter;
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, "road");
        this.add(this.back);
        this.scene.add.existing(this);

        Align.scaleToGameWidth(this.back, .5);

        this.setSize(this.back.displayWidth, this.game.config.height);

        this.lineGroup = this.scene.add.group();
        this.count = 0;


        this.car = this.scene.add.sprite(this.displayWidth / 4, this.game.config.height * 0.9, "cars");
        Align.scaleToGameWidth(this.car, 0.10)
        this.add(this.car);

        this.back.setInteractive();
        this.back.on("pointerdown", this.changeLanes, this);
        this.addObject();
    }

    addObject() {
        var objs = [{ key: "pcar1", speed: 10, scale: 10 }, { key: "pcar2", speed: 10, scale: 10 },
        { key: "cone", speed: 20, scale: 5 }, { key: "barrier", speed: 20, scale: 10 }];
        var index = Math.floor(Math.random() * (objs.length));
        var key = objs[index].key;
        var speed = objs[index].speed;
        var scale = objs[index].scale / 100;

        this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, key);
        this.object.speed = speed;

        var lane = Math.random() * 100;
        if (lane < 50) {
            this.object.x = this.displayWidth / 4;
        }
        Align.scaleToGameWidth(this.object, scale);
        this.add(this.object);
    }

    changeLanes() {
        this.mediaManager.playSound("whoosh");
        if (this.car.x > 0) {
            this.car.x = -this.displayWidth / 4
        } else {
            this.car.x = this.displayWidth / 4
        }
    }

    makeLines() {
        this.vSpace = this.displayHeight / 10;
        for (var i = 0; i < 20; i++) {
            var line = this.scene.add.image(this.x, this.vSpace * i, "line");
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }
    moveLines() {
        if (this.model.gameOver == true) {
            return;
        }
        this.lineGroup.children.iterate(function (child) {
            child.y += this.vSpace / 20;
        }.bind(this));
        this.count++;
        if (this.count == 20) {
            this.count = 0;
            this.lineGroup.children.iterate(function (child) {
                child.y = child.oy;
            }.bind(this));
        }
    }

    moveObject() {
        if (this.model.gameOver == true) {
            return;
        }
        this.object.y += (this.vSpace / this.object.speed) * this.model.speed;
        if (Collision.checkCollide(this.car, this.object) == true) {
            this.model.gameOver = true;
            this.mediaManager.playSound("boom");
            this.scene.tweens.add({targets: this.car,duration: 1000,y:this.game.config.height, angle: -270});
            this.scene.time.addEvent({ delay: 2000, callback: this.goGameOver, callbackScope: this.scene, loop: false });
        }
        
        if (this.object.y > this.game.config.height) {
            this.emitter.emit(G.UP_POINTS, 1);
            this.object.destroy();
            this.addObject();
        }
    }

    goGameOver() {
        this.scene.start("SceneOver");
    }
}