// state Load
//	load all main assets for game and decode music, etc.

// written by: ___________

var Load = function(game) {
	// variables
	// background images
	fade_in = null;
	bg = null;
	bg_trees = null;

	// click text
	click_b = null;
	// space start text
	space = null;
};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// add the bg
		this.bg = game.add.tileSprite(0, 0, 3000, 3000, 'bg');
		this.bg_tree = game.add.tileSprite(0, 0, 1989, 2386, 'bg_tree');

		// show loading text when starts loading
		game.load.onFileComplete.add(this.fileComplete, game);
		game.load.onLoadComplete.add(this.loadComplete, game);

		// ADDING /////////////////////////////////////////////////////

		// add the preloader bar and set it
		frame = game.add.sprite(game.world.centerX, game.world.centerY, 'bar_frame');
		frame.anchor.set(0.5)
		preload_bar = game.add.sprite(game.world.centerX - 200,
			game.world.centerY - 25, 'bar');
		//this.preload_bar.anchor.set(0.5);
		game.load.setPreloadSprite(preload_bar);

		// TEXT STYLE
		big_style = { fontSize: '100px', fill: '#333', font: 'Meta'};
		small_style = { fontSize: '20px', fill: '#333', font: 'Meta'};

		// set other texts
		space = game.add.text(game.world.centerX, game.world.centerY, "", big_style);
		click_b = game.add.text(game.world.centerX, game.world.height - 50, "", small_style);
		//	Progress report for loading bar
		text_loading = game.add.text(game.world.centerX, game.world.centerY + 3, 'Loading...', small_style);
		text_loading.anchor.set(0.5);

		// add fullscreen key (esc)
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
		fullscreen_key = game.input.keyboard.addKey(Phaser.Keyboard.F);
		fullscreen_key.onDown.add(this.goFull, game);

		// add the fade-in sprite overlay
		this.fade_in = game.add.tileSprite(0, 0, 3000, 3000, 'fade-in');
		this.fade_in.alpha = 1;
		game.add.tween(this.fade_in).to( { alpha: 0 }, 500, "Linear", true, 0); // unveil

		// start the loading
		this.start();

	},
	start: function() {
		console.log('Load: start');

		// LOADING IMAGES --------------------------------------------------

		// load path to img assets
		game.load.path = 'assets/img/';
		// load all the image assets for the game
		// splash screen
		game.load.image('splash', 'meta/splash.png');

		// player
		game.load.spritesheet('bird', 'entity/phoenix/phoejay_s.png', 60, 39);

		// tilemap spritesheets
		game.load.image('forest', 'tilesets/forest_tilemap.png');
		game.load.image('arcade-slopes', 'tilesets/arcade-slopes-64.png');

		// load tilemap path
		game.load.path = 'json/';
		// load tilemaps
		game.load.tilemap('map', 'forest_tilemap.json', null, Phaser.Tilemap.TILED_JSON);

		// load slope map
		game.load.json('slope_map', 'slope_map.json');

		// LOADING SOUNDS --------------------------------------------------

		// load path to snd assets
		game.load.path = 'assets/audio/music/';
		// load all the audio music assets
		game.load.audio('jungle_theme', ['jungle_theme.mp3', 'jungle_theme.ogg']);
		// sfx loading
		game.load.path = 'assets/audio/fx/';
		game.load.audio('phoejay_jump', ['jump.mp3', 'jump.ogg']);

		game.load.start();
	},
	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		// set loading text everytime a thing is being loaded
		text_loading.setText(progress + "%");// + totalLoaded + " out of " + totalFiles);
	},
	loadComplete: function() {
		// loading complete
		text_loading.kill();
		frame.kill();
		preload_bar.kill();

		// set other texts
		space.setText("PRESS SPACE");
		click_b.setText("double-tap F for fullscreen");

		texties = [space, click_b];
		// for each text, make it tween foreverrrrr flash
		texties.forEach(function(e) {
			e.anchor.set(0.5);
			e.alpha = 0.5;
			game.add.tween(e).to( { alpha: 1 }, 1000, "Linear", true, 0, -1, true); // forever
		}); 
	},
	goFull: function() {

		let centerX = game.world.centerX
		let centerY = game.world.centerY;

		if (game.scale.isFullScreen) {
			console.log('{fullscreen} FALSE')
			game.scale.stopFullScreen();
			game.width = game.world.width = W;
			game.height = game.world.height = H;

			// set click fullscreen text
			click_b.setText("double-tap F for fullscreen");

			// set center
			centerX = game.width / 2;
			centerY = game.height / 2;
		}
		else {
			console.log('{fullscreen} TRUE')
			game.scale.startFullScreen(false);
			game.width = window.screen.width;
			game.height = window.screen.height;

			// set click fullscreen text
			click_b.setText("double-tap F for windowed");

			// set center
			centerX = window.screen.width / 2;
			centerY = window.screen.height / 2;
		}
		// set all elements in center
		let text_array = [space, click_b];
		text_array.forEach(function(element) {
			element.x = centerX;
			element.y = centerY;
		});
		click_b.y = centerY * 2 - 50;
	},
	killAll: function() {
		// KILL EM ALL
		// click text
		click_b.setText("");
		// space start text
		space.setText("");

	},
	create: function() {
		console.log('Load: create');

		// crop bar crizzle?
		if (this.preload_bar != null)
			this.preload_bar.cropEnabled = false;

	},
	update: function() {
		// wait for first music to properly decode
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			this.killAll();
			tween = game.add.tween(this.fade_in).to( { alpha: 1 }, 3000, "Linear", true, 0); // REVEIL
			tween.onComplete.add(this.startGame, game);
		}
		// tilesprite movement
		this.bg_tree.tilePosition.x -= 1;
		this.bg_tree.tilePosition.y += .1;
	},
	startGame: function() {
		game.state.start('Title');
	},
	render: function() {

		// debug info
		// game.debug.text('Click / Tap to go fullscreen', 0, 16);
		// game.debug.inputInfo(32, 32);
	}
}