// state Boot
//	show loading bar

// written by: ___________

var Boot = function(game) {
	// variables
};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');

		// ready the path to load img assets for Load state
		game.load.path = 'assets/img/';
		// fade-in sprite
		game.load.image('fade-in', 'meta/fade_in.png');

		// splash screen
		game.load.image('splash', 'logo.png');

		// load the loading bar sprite and BG
		game.load.image('bar', 'meta/bar.png');
		game.load.image('bar_frame', 'meta/bar_frame.png');

		// bgs
		game.load.image('bg', 'bg/background.png');
		game.load.image('bg_tree', 'bg/trees.png');
		game.load.image('title', 'bg/title_text.png');
		
		//menu
		game.load.image('pause_menu', 'meta/number-buttons-90x90.png', 270, 180);

		// SFX 
		game.load.path = 'assets/audio/fx/environment/';
		game.load.audio('jungle_sounds', ['jungle_sounds.mp3', 'jungle_sounds.ogg']);

		// make the canvas look better?
		game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);
		// don't allow losing browser to halt game
		game.stage.disableVisibilityChange = true;
	},
	create: function() {
		console.log('Boot: create');

		// start the loading screen
		game.state.start('Title');
	}
};
