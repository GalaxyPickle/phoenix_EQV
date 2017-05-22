// state Load
//	load all main assets for game and decode music, etc.

// written by: ___________

var Load = function(game) {
	// variables
	preload_bar = null;
};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// LOADING ///////////////////////////////////////////////////

		// load path to assets
		game.load.path = 'assets/img/';
		// load all the image assets for the game
		///////////
		///////
		///////////////

		// load all the audio music assets
		game.load.path = 'assets/audio/music/';
		game.load.audio('jungle_theme', ['jungle_theme.mp3', 'jungle_theme.ogg']);

		// sfx loading
		game.load.path = 'assets/audio/fx/';
		game.load.audio('phoejay_jump', ['jump.mp3', 'jump.ogg']);

		// ADDING /////////////////////////////////////////////////////

		// add the bg
		game.add.image(0, 0, 'bg');

		// add the preloader bar and set it
		this.preload_bar = game.add.sprite(game.world.centerX - 100,
			game.world.centerY, 'bar');
		game.load.setPreloadSprite(this.preload_bar);

		///////////////////////////////////////////////////////////////
	},
	create: function() {
		console.log('Load: create');

		// display the loading txt

		// disable preload bar crop while we wait for mp3 decoding
		this.preload_bar.cropEnabled = false;

	},
	update: function() {
		// wait for first music to properly decode
		if (game.cache.isSoundDecoded('jungle_theme')) {
			game.state.start('Title');
		}
	}
}