
import Phaser from 'phaser';

class EventEmitterPlugin extends Phaser.Plugins.BasePlugin {
  constructor() {
    super();
  }


  init(config) {
    // Überprüfe, ob data.scene korrekt übergeben wurde
    if (!config || !config.scene) {
      throw new Error('Invalid scene data for EventEmitterPlugin initialization');
    }

    this.scene = config.scene;
    this.emitter = new Phaser.Events.EventEmitter();

  }

  getEmitter() {
    return this.emitter;
  }
}

export default EventEmitterPlugin;
