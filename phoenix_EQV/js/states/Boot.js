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
		// load the loading bar sprite and BG
		game.load.image('bar', 'meta/bar.png');
		game.load.image('bar_frame', 'meta/bar_frame.png');

		// bgs
		game.load.image('bg', 'bg/background.png');
		game.load.image('bg_tree', 'bg/trees.png');
		
		//menu
		game.load.image('pause_menu', 'meta/number-buttons-90x90.png', 270, 180);
		
		//audio
		game.load.path = 'assets/audio/fx/';
		
		game.load.audio('jump1', 'jump7.wav' , false);
		game.load.audio('jump2', 'jump12.wav', false);
		game.load.audio('jump3', 'jump14.wav', false);
		game.load.audio('land', 'land1.wav'  , false);
		game.load.audio('glide', 'glide.wav' , false);
		game.load.audio('fall', 'fall.wav'  , false);

		// make the canvas look better?
		game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);
		// don't allow losing browser to halt game
		game.stage.disableVisibilityChange = true;
	},
	create: function() {
		console.log('Boot: create');

		// start the loading screen
		game.state.start('Load');
	}
};