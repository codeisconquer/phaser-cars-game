class CustomPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);
        // Hier kannst du benutzerdefinierten Plugin-Code hinzufügen
        this.score = 0;
    }

    increaseScore() {
        this.score += 10;
        console.log('Score:', this.score);
    }
}

// Lade das Plugin in der Szene
CustomPlugin.register = function (PluginManager) {
    PluginManager.register('CustomPlugin', CustomPlugin, 'customPlugin');
};

export default CustomPlugin;
