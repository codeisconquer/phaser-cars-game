import Phaser from 'phaser';
import SceneLoad from "./scenes/SceneLoad";
import SceneMain from "./scenes/SceneMain";
import SceneOver from "./scenes/SceneOver";
import SceneTitle from "./scenes/SceneTitle";
import Constants from "./common/Constants";
// import EventEmitterPlugin from './classes/plugins/EventEmitterPlugin';
// import ModelPlugin from './classes/plugins/ModelPlugin';
// import CustomPlugin from './classes/plugins/CustomPlugin';

export const G = new Constants();
export var game;
export var mediaManager;

var isMobile = navigator.userAgent.indexOf("Mobile");
if (isMobile == -1) {
  isMobile = navigator.userAgent.indexOf("Tablet");
}

var config;

if (isMobile == -1) {
  config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: 'phaser-game',
    scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    plugins: {
      global: [
        // { key: 'EventEmitterPlugin', plugin: EventEmitterPlugin, start: true },
        // { key: 'ModelPlugin', plugin: ModelPlugin, start: true }
        //   {
        //     key: 'CustomPlugin',
        //     plugin: CustomPlugin,
        //     start: true
        // }
        // Weitere Plugins können hier hinzugefügt werden
      ],
    },
  };
} else {
  config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'phaser-game',
    scene: [SceneLoad, SceneTitle, SceneMain, SceneOver],
    plugins: {
      global: [
        // { key: 'EventEmitterPlugin', plugin: EventEmitterPlugin, start: true },
        // { key: 'ModelPlugin', plugin: ModelPlugin, start: true }
        // {
        //   key: 'CustomPlugin',
        //   plugin: CustomPlugin,
        //   start: true
        // }
      ],
    },
  };
}

window.addEventListener("load", () => {
  // console.log('config', config);
  game = new Phaser.Game(config);
  // console.log('game', game);
});
