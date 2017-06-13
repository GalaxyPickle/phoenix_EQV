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

		// aaaaand start the ambiance ;)
		jungle_sounds = game.add.audio('jungle_sounds');
		jungle_sounds.play();
		jungle_sounds.onDecoded.add(this.music_fade, game);
		jungle_sounds.onLoop.add(this.hasLooped, game);

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
		big_style = { fontSize: '50px', fill: '#333', font: 'Meta'};
		small_style = { fontSize: '20px', fill: '#333', font: 'Meta'};

		// set other texts
		space = game.add.text(game.world.centerX, game.world.centerY + 300, "", big_style);
		click_b = game.add.text(game.world.centerX, game.world.height - 50, "", small_style);
		//	Progress report for loading bar
		text_loading = game.add.text(game.world.centerX, game.world.centerY + 3, 'Loading...', small_style);
		text_loading.anchor.set(0.5);

		// add fullscreen key (esc)
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
		// fullscreen_key = game.input.keyboard.addKey(Phaser.Keyboard.F);
		// fullscreen_key.onDown.add(this.goFull, game);

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
		game.load.image('grass', 'bg/grass.png');
		game.load.image('light_ray', 'entity/light_ray.png');
		game.load.image('ashes', 'ashes.png');

		// BACKGROUND
		game.load.image('bg_mountain', 'bg/mountain.png');
		game.load.image('title', 'bg/title_text.png');
		game.load.image('feather', 'bg/feather.png');

		// player
		//load the player
		game.load.path = 'assets/img/entity/phoenix/';
		game.load.atlas('phoejay', 'phoejay_mov.png', 'phoejay_mov.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		// load divinity
		game.load.path = 'assets/img/entity/';
		game.load.image('divinity', 'divinity.png');

		// all the animals path
		game.load.path = 'assets/img/entity/animals/';
		// here we goooooooo
		//load burrel animations
		game.load.atlas('burrel', 'animations/burrel_animation.png', 'animations/burrel_animation.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		//load fox animations 
		game.load.atlas('fox', 'animations/fox_animation.png', 'animations/fox_animation.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		//load deer animations
		game.load.atlas('deer', 'animations/deer_animation.png', 'animations/deer_animation.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.atlas('animals', 'animals.png', 'animals.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		//load dead animals
		game.load.image('dead_burrel', 'images/dead_burrel.png');
		game.load.image('dead_fox', 'images/dead_fox.png');
		game.load.image('dead_deer', 'images/dead_deer.png');
		//load flower
		game.load.image('sprout', 'images/sprout.png');
		game.load.image('flower', 'images/flower.png');

		// load instruction images
		game.load.path = 'assets/img/Tutorial_Pictures/';
		game.load.image('Move', 'Move.png');
		game.load.image('Double_Jump', 'Double_Jump.png');
		game.load.image('Look', 'Look.png');
		game.load.image('Glide', 'Glide.png');
		game.load.image('Wall_Jump', 'Wall_Jump.png');
		game.load.image('Pause', 'Pause.png');





		//load the revival transition thing
		game.load.path = 'assets/img/entity/revival/';
		game.load.atlas('revival', 'revival_animation.png', 'revival_animation.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

		// particlesssss
		game.load.path = 'assets/img/particles/';
		game.load.image('particle_divinity', 'particle_divinity.png');
		game.load.image('particle_PJ', 'particle_PJ.png');

		// tilemap spritesheets
		game.load.path = 'assets/img/tilesets/USE_THESE/';
		game.load.image('forest', 'collision_layer.png');
		game.load.image('forest2', 'noncollision_layer.png');

		// load tilemap path
		game.load.path = 'json/';
		// load tilemaps
		game.load.tilemap('map', 'newest_forest.json', null, Phaser.Tilemap.TILED_JSON);
		// load slope map
		game.load.json('slope_map', 'slope_map.json');

		// LOADING SOUNDS --------------------------------------------------

		// load path to music assets
		game.load.path = 'assets/audio/music/';
		// load all the audio music assets
		game.load.audio('jungle_theme', ['jungle_theme.mp3', 'jungle_theme.ogg']); // first stage theme
		game.load.audio('deforest_theme', ['deforest_theme.mp3', 'deforest_theme.ogg']); // middle part theme
		game.load.audio('end_theme', ['end_theme.mp3', 'end_theme.ogg']); // end game intense theme

		// sfx loading
		// misc sounds
		game.load.path = 'assets/audio/fx/misc/';

		game.load.audio('revival', ['chorus.ogg']);
		game.load.audio('fail', ['dun_fail.mp3', 'dun_fail.ogg']);
		game.load.audio('collect', ['YES.mp3', 'YES.ogg']);
		game.load.audio('begin', ['begin.mp3']);
		game.load.audio('tick_tock', ['tick_tock.mp3', 'tick_tock.ogg']);
		game.load.audio('pause', ['freeze.ogg', 'freeze.mp3']);
		game.load.audio('unpause', ['unfreeze.ogg', 'unfreeze.mp3']);

		// MOVEMENT
		game.load.path = 'assets/audio/fx/movement/';
		// phoejay movement
		game.load.audio('jump1', ['jump.mp3', 'jump.ogg']);
		game.load.audio('jump2', ['jump_low.mp3']);
		game.load.audio('jump3', ['boing.mp3', 'boing.ogg']);
		game.load.audio('land', ['tap_land.mp3']);
		game.load.audio('glide', ['jump_high.mp3']);

		// aminals
		game.load.path = 'assets/audio/fx/animals/';
		// screech
		game.load.audio('screech', ['screech.mp3', 'screech.ogg']);
		game.load.audio('burrel', ['burrel1.mp3', 'burrel1.ogg']);
		game.load.audio('fox', ['fox_call.mp3', 'fox_call.ogg']);
		game.load.audio('deer', ['deer.mp3', 'deer.ogg']);
		// .........

		// environ sounds
		game.load.path = 'assets/audio/fx/environment/'
		// environmental sounds
		game.load.audio('heavy_wind', ['heavy_wind.mp3', 'heavy_wind.ogg']); // 2nd/last part stump mountain wind sound
		// game.load.audio('jungle_sounds', ['jungle_sounds.mp3', 'jungle_sounds.ogg']);

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
		bg_title = game.add.image(game.world.centerX, game.world.centerY, 'title');
		bg_title.anchor.set(0.5);

		space.setText("PRESS SPACE");
		space.anchor.set(0.5);
		space.alpha = 0.5;
		game.add.tween(space).to( { alpha: 1 }, 1000, "Linear", true, 0, -1, true); // forever

		lfeather = game.add.sprite(space.x - 350, space.y - 10, 'feather');
		lfeather.angle = 53;
		rfeather = game.add.sprite(space.x + 350, space.y - 10, 'feather');
		rfeather.angle = -132;
		//click_b.setText("press F for fullscreen");

		texties = [lfeather, rfeather] //click_b];
		// for each text, make it tween foreverrrrr flash
		texties.forEach(function(e) {
			e.anchor.set(0.5);
			e.alpha = 0.5;
			game.add.tween(e).to( { alpha: 1 }, 1000, "Linear", true, 1000, -1, true); // forever
		}); 
	},
	music_fade: function() {
		jungle_sounds.fadeIn(5000);
	},
	hasLooped: function() {
		jungle_sounds.play();
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
			click_b.setText("press F for fullscreen");

			// // set center
			// centerX = game.width / 2;
			// centerY = game.height / 2;
		}
		else {
			console.log('{fullscreen} TRUE')
			game.scale.startFullScreen(false);
			game.width = window.screen.width;
			game.height = window.screen.height;

			// set click fullscreen text
			click_b.setText("press F for windowed");

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

		jungle_sounds.loop = true;

		// crop bar crizzle?
		if (this.preload_bar != null)
			this.preload_bar.cropEnabled = false;

	},
	update: function() {
		// wait for first music to properly decode
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			this.killAll();
			tween = game.add.tween(this.fade_in).to( { alpha: 1 }, 1000, "Linear", true, 0); // REVEIL
			tween.onComplete.add(this.startGame, game);
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
			this.startGame
		}
		// tilesprite movement
		this.bg_tree.tilePosition.x -= 1;
		this.bg_tree.tilePosition.y += .1;
	},
	startGame: function() {
		bg_title.alpha = 0;
		rfeather.alpha = 0;
		lfeather.alpha = 0;
		game.state.start('Story');
	},
	render: function() {

		// debug info
		// game.debug.text('Click / Tap to go fullscreen', 0, 16);
		// game.debug.inputInfo(32, 32);
	}
}
