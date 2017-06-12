	// state Play
//	has the player core loop

// written by: ____________

var divinity;


var creature1;
var creature2;
var creature3;


var Play = function(game) {
	// variables
	player = null;
	tile = null;
	map = null;
	layer1 = null;
	layer2 = null;
	layer3 = null;
	tiles = null;
	divCounter = 0;

	//bubbles = new Array();

	this.features = {
		// Arcade slopes
		slopes: true,
		minimumOffsetY: true,
		pullUp: 0,
		pullDown: 0,
		pullLeft: 0,
		pullRight: 0,
		snapUp: 0,
		snapDown: 0,
		snapLeft: 0,
		snapRight: 0,

		// Camera controls
		cameraZoom: 1.0,
		cameraMicroZoom: 0.0,
		cameraRotation: 0.0,
		cameraMicroRotation: 0.0,
		cameraLerp: 0.15,
		cameraFollow: true,
		cameraRoundPixels: false,
		cam_y_move: 51,
		cam_x_move: 77,

		// Collision controls
		particleSelfCollide: 0,

		// Debug controls
		debugLayers: false,
		debugPlayerBody: false,
		debugPlayerBodyInfo: false,
		debugCameraInfo: false,
		debugInputInfo: false,

		// Player controls
		acceleration: 2000,
		dragX: 4000,
		dragY: 0,
		bounceX: 0,
		bounceY: 0,
		frictionX: 0,
		frictionY: 0,
		jump: 500,
		wallJump: 350,
		shape: 'aabb',
		size: 40,
		anchorX: 0.5,
		anchorY: 0.5,

		// Tilemaps
		tilemapOffsetX1: 0,
		tilemapOffsetY1: 0,
		tilemapOffsetX2: 0,
		tilemapOffsetY2: 0,

		// World
		gravity: 1500,
		enableGravity: true,

		// Fun
		slowMotion: 1,
		debug: 1,
	};
};
Play.prototype = {
	goFull: function() {

		let centerX = game.world.centerX
		let centerY = game.world.centerY;

	    if (game.scale.isFullScreen) {
	    	console.log('{fullscreen} FALSE')

	        game.scale.stopFullScreen();
	        game.width = W;
	        game.height = H;

	        // set center
	        centerX = game.width / 2;
	        centerY = game.height / 2;
	    }
	    else {
	    	console.log('{fullscreen} TRUE')

	        game.scale.startFullScreen(true);
	        game.width = window.screen.width;
	        game.height = window.screen.height;

	        // set center
	        centerX = window.screen.width / 2;
	        centerY = window.screen.height / 2;
	    }
	},
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		console.log('Play: create');
		sfx_jump1 = game.add.audio('jump1');
		sfx_jump2 = game.add.audio('jump2');
		sfx_jump3 = game.add.audio('jump3');
		sfx_land1 = game.add.audio('land' );
		sfx_glide = game.add.audio('glide');
		//sfx_fall1 = game.add.audio('fall' );
		sfx_call = game.add.audio('screech');
		
		this.jump1 = false;
		this.jump2 = false;
		this.jump3 = false;
		this.land1 = false;
		this.glide = false;
		//this.fall1 = false;

		// MUSICCXSSSSSZZZZZ
		// jungle music
		jungle_music = game.add.audio('jungle_theme');
		jungle_music.play('', 0, .75, true);
		jungle_music.loop = true;
		// deforest music
		deforest_music = game.add.audio('deforest_theme');
		deforest_music.onLoop.add(this.deforest_stop, game);
		deforest_music.loop = true;
		end_music = game.add.audio('end_theme');

		// SOUND FX
		// play jungle sound
		jungle_sounds.volume = 1;
		// wind sound
		heavy_wind = game.add.audio('heavy_wind');
		heavy_wind.play('', 0, 1, true);
		heavy_wind.loop = true;
		heavy_wind.volume = 0;

		// fullscreen key
		// fullscreen_key = game.input.keyboard.addKey(Phaser.Keyboard.F);
  		// fullscreen_key.onDown.add(this.goFull, game);

		// I always have this on :)
		this.time.advancedTiming = true;

		// Start up Arcade Physics
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.arcadeSlopesPlugin = this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);

		// Set the stage background colour
		this.stage.backgroundColor = '#facade';

		// add background image/tilemaps
		// add the bg
		bg = game.add.tileSprite(0, 0, 3000, 2000, 'bg');
		bg_trees = game.add.tileSprite(0, 0, 1989, 2386, 'bg_tree');
		bg.fixedToCamera = true;
		bg_trees.fixedToCamera = true;

		bg_mountains = game.add.tileSprite(0, game.height - 600, 3000, 600, 'bg_mountain');
		bg_mountains.fixedToCamera = true;
		bg_mountains.alpha = 0;

		bg_trans = 18150;
		new_area = false;

		// Create the tilemap object from the map JSON data

		this.map = this.add.tilemap('map');
		// this.map.addTilesetImage('forest_tilemap', 'forest');
		this.map.addTilesetImage('collision_layer','forest');
		this.map.addTilesetImage('noncollision_layer','forest2');

		layer1 = this.map.createLayer('Noncollision_1');
		layer2 = this.map.createLayer('Noncollision_2');

		layer3 = this.map.createLayer('Collision_1');
		this.map.setCollisionBetween(1, 173, true, "Collision_1");
		// DEBUG
		layer3.debug = false;
		this.game.slopes.convertTilemapLayer(layer3, game.cache.getJSON('slope_map'));

		layer3.resizeWorld();

		//Add Tutorial pictures
		this.Move = this.add.sprite(109, 2063, 'Move', 0);
		this.Look = this.add.sprite(1481, 1069, 'Look', 0);
		this.Double_Jump = this.add.sprite(388, 1412, 'Double_Jump', 0);
		this.Glide = this.add.sprite(3126, 900, 'Glide', 0);
		this.Wall_Jump = this.add.sprite(6121, 1455, 'Wall_Jump', 0);
		this.Pause = this.add.sprite(4630, 400, 'Pause', 0);


		// Create a player texture atlas
		this.player = this.add.sprite(200, 2290, 'phoejay', 'static');
		this.player.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 5), 10, true);
		this.player.animations.add('static', ['static'], 1, false);
		this.player.animations.add('hop', ['hop'], 1, false);
		this.player.animations.add('top', ['top'], 1, false);
		this.player.animations.add('glide', ['glide'], 1, false);
		this.player.animations.add('crouch', ['wallcrouch'], 1, false);
		//this.player.animations.add('fall', ['wallhop'], 1, true);


		// Create a graphics object for the player
		this.playerGraphics = new Phaser.Graphics(this);

		// Generate a texture for the player and give it a physics body
		this.updatePlayer(this.player);

		// Set the player modifiers
		this.physics.arcade.gravity.y = 1000;
		this.jetpack = this.jetpackmax = 24;
		this.running = false;

		// Add a touch of tile padding for the collision detection
		this.player.body.tilePadding.x = 1;
		this.player.body.tilePadding.y = 1;

		// Set the initial properties of the player's physics body
		this.player.body.drag.x = this.features.dragX;
		this.player.body.bounce.x = this.features.bounceX;
		this.player.body.bounce.y = this.features.bounceY;
		this.player.body.slopes.friction.x = this.features.frictionX;
		this.player.body.slopes.friction.y = this.features.frictionY;
		this.player.body.maxVelocity.x = 500;
		this.player.body.maxVelocity.y = 1000;
		this.player.body.collideWorldBounds = true;

		// Create a particle emitter and position it on the player (particle lifespan for 1000)
		this.emitter = this.add.emitter(this.player.x, this.player.y, 1000);

		// Particle graphics
		// var particleGraphics = new Phaser.Graphics(this)
		// 	.beginFill(Phaser.Color.hexToRGB('#fff'), 0.5)
		// 	.drawCircle(0, 0, 16);

		// // Cache the particle graphics as an image
		// this.cache.addImage('particle', null, particleGraphics.generateTexture().baseTexture.source);

		// Create 2000 particles using our newly cached image
		this.emitter.makeParticles('particle_PJ');

		// Attach Arcade Physics polygon data to the particle bodies
		// this.game.slopes.enable(this.emitter);

		// Set some particle behaviours and properties
		// this.emitter.bounce.set(1, 1);
		this.emitter.setXSpeed(-10, 10);
		this.emitter.setYSpeed(-10, 10);
		this.emitter.width = 10;
		this.emitter.height = 10;

	    this.emitter.setRotation(0, 360);
	    this.emitter.setAlpha(0.5, 1);
	    this.emitter.setScale(1);
	    this.emitter.gravity.y = -1200;

	    this.emitter.start(false, 1000, 1);

		// Map some keys for use in our update() loop
		this.controls = this.input.keyboard.addKeys({
			'up': Phaser.KeyCode.UP,
			'down': Phaser.KeyCode.DOWN,
			'left': Phaser.KeyCode.LEFT,
			'right': Phaser.KeyCode.RIGHT,
			
			'controls': Phaser.KeyCode.X,
			
			'cameraUp': Phaser.KeyCode.W,
			'cameraDown': Phaser.KeyCode.S,
			'cameraLeft': Phaser.KeyCode.A,
			'cameraRight': Phaser.KeyCode.D
		});

		// Set camera to start on player
		// Player position - 1/2 screen size + 1/2 Phoejay image size
		this.camera.x = this.player.x - screen.width/2 + 101.6;
		this.camera.y = this.player.y - screen.height/2 + 77;
		
		// Follow the player with the camera
		this.camera.follow(this.player);

		// Smooth out the camera movement with linear interpolation (lerp)
		this.camera.lerp.setTo(this.features.cameraLerp);

		var that = this;

		// Register a pointer input event handler that teleports the player
		this.input.onDown.add(function (pointer, mouseEvent) {
			that.player.position.x = pointer.worldX;
			that.player.position.y = pointer.worldY;

			// Reset the player's velocity
			that.player.body.velocity.set(0);
		});

		// Prevent the debug text from rendering with a shadow
		this.game.debug.renderShadow = false;

		// ---------------------------------------------------------------------------------------------------------
		// ---------------------------     ALL DEAD ANIMAL CODE GOES HERE    ---------------------------------------
		// ---------------------------------------------------------------------------------------------------------

		//spawn divinity
		divinity = 0;


		var coordinates1 = [
			[6632,1753],
			[6881,939],
			[6827,2100],
			[7727,1602],
			[8052,1233],
			[8206,1588],
			[8567,1700],
			[8342,2373]
		];
		var coordinates2 = [
			[9639,1039],
			[9755,2391],
			[10155,2388],
			[10724,818],
			[10321,927],
			[11942,2152],
			[11085,2367],
			[11085,912],
			[11483,1395]
		];

		var coordinates3 = [
			[21864,1160],
			[21464,2248],
			[23856,2040],
			[24664,2552],
			[25576,2280],
			[25960,1272],
			[25960,1273],
			[25960,1274]
			
		];
		//////first stage- revive the burrel



		creature1 = new DeadAnimal(game, 9490, 1870, 'dead_burrel', 'divinity', '', this.player, coordinates1, 3000, this.camera, 1);
		game.add.existing(creature1);
		
		//add the live burrel at the same time but make it invisible at first
		game.burrel = this.add.sprite(9236, 1850, 'burrel', 'burrel_1');
		game.burrel.animations.add('burrel_animate', [0, 1, 2], 5, true);
		game.burrel.animations.play('burrel_animate');
		
		game.burrel.visible = creature1.alive;



		//could change the variable name when other animals are added
		
		//////second stage- revive the fox

        creature2 = new DeadAnimal(game, 12900, 1861, 'dead_fox', 'divinity', '', this.player, coordinates2, 4000, this.camera, 2);
		game.add.existing(creature2);

		
		game.fox = this.add.sprite(13260, 1941, 'fox','fox_1');
		game.fox.animations.add('fox_animate', [0, 1, 2], 5, true);
		game.fox.animations.play('fox_animate');


		game.fox.visible = creature2.alive;

		//////third stage- revive the deer
		creature3 = new DeadAnimal(game, 22672, 3054, 'dead_deer', 'divinity', '', this.player, coordinates3, 5000, this.camera, 3);
		game.add.existing(creature3);

		
		game.deer = this.add.sprite(22672, 2724, 'deer','deer_1');
		game.deer.animations.add('deer_animate', [0, 1, 2], 5, true);
		game.deer.animations.play('deer_animate');


		game.deer.visible = creature3.alive;




		// ---------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------

		// fade-in
		// add the fade-in sprite overlay
		fade_in = game.add.tileSprite(0, 0, 3000, 3000, 'fade-in');
		fade_in.alpha = 1;
		game.add.tween(fade_in).to( { alpha: 0 }, 2000, "Linear", true, 0); // unveil
		
		/*
        Code for the pause menu
		*/

		// Create a label to use as a button
		game.pause_label = game.add.text(game.width - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
		game.pause_label.fixedToCamera = true;
		game.pause_label.inputEnabled = true;
		game.pause_label.events.onInputUp.add(pause);

		// Add a input listener that can help us return from being paused
		var pause_key = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
		pause_key.onDown.add(pause_switch, self);
		game.input.onDown.add(unpause, self);
		var reset_key = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
		reset_key.onDown.add(restart, self); 
	},

	// function to start final music once semi-final finishes
	deforest_stop: function() {
		deforest_music.stop();
		deforest_music.loop = false;
		end_music.play('', 0, 1, true);
		end_music.loop = true;
	},

	updatePlayer: function (player) {
		var features = this.features;
		var graphics = this.playerGraphics;
		var size = features.size;
		var halfSize = Math.floor(features.size * 0.5);

		// Update the player's anchor
		player.anchor.set(features.anchorX, features.anchorY);

		// Determine whether we need to update the player
		if (player.body && player.body.height === features.size && player.body.isCircle == features.shape) {
			// If the player has a body, and the body's height hasn't
			// changed, we don't need to update it
			return;
		}

		// Enable physics for the player (give it a physics body)
		this.physics.arcade.enable(player);


		// Start the graphics instructions
		graphics.clear();
		graphics._currentBounds = null; // Get Phaser to behave
		graphics.beginFill(Phaser.Color.hexToRGB('#e3cce9'), 1);

		// player.body.setCircle(halfSize);
		player.body.enable = true;
		graphics.drawCircle(0, 0, features.size);
		// SET PLAYER BODY SMALLER
		// rect width, rect height, start x, start y
		player.body.setSize(player.width / 3, player.height * 3 / 5, player.width / 3, player.height / 4);
		// I don't know why we need this lol	//player.height = size;

		// Enable Arcade Slopes physics
		if (this.game.slopes) {
			player.body.slopes = null; // TODO: Fix Phaser.Util.Mixin or use something else
			this.game.slopes.enable(player);
		}

		player.scale.x = -1;
	},

	update: function () {

		// Define some shortcuts to some useful objects
		var body = this.player.body;
		var camera = this.camera;
		var gravity = this.physics.arcade.gravity;
		var blocked = body.blocked;
		var touching = body.touching;
		var controls = this.controls;
		var features = this.features;

		// our own variables

		// Update slow motion values; these two are great fun together
		// ( ?� ?? ?�)
		if (this.time.slowMotion !== features.slowMotion) {
			this.time.slowMotion = features.slowMotion;
			this.time.desiredFps = 60 + (features.slowMotion > 1 ? features.slowMotion * 20 : 0);
		}

		// Update camera zoom and rotation
		camera.scale.set(
			features.cameraZoom + features.cameraMicroZoom
		);
		camera.rotation = Phaser.Math.degToRad(
			features.cameraRotation + features.cameraMicroRotation
		);
		// this.game.input.scale.set(
		// 	1.0 / (features.cameraZoom + features.cameraMicroZoom)
		// );

		// Update camera linear interpolation and pixel rounding
		camera.lerp.set(features.cameraLerp);
		camera.roundPx = features.cameraRoundPixels;

		// Toggle camera follow
		if (features.cameraFollow && !camera.target) {
			camera.follow(this.player);
			camera.lerp.set(0.2);
		}

		if (!features.cameraFollow && camera.target) {
			camera.unfollow();
		}

		// Update gravity
		if (features.enableGravity) {
			gravity.y = features.gravity;
		} else {
			gravity.y = 0;
		}

		// ---------------------------------------------------------------------------------------
		// 								tilesprites and sound environmental change
		// ---------------------------------------------------------------------------------------

		/// switch tilesprite bgs
		// switch background FX and music upon different area change
		if (this.player.x > bg_trans) {

			new_area = true;

			// tilesprites
			bg_mountains.visible = true;
			if (bg_trees.alpha > 0.05) bg_trees.alpha -= 0.01;
			else bg_trees.visible = false;
			if (bg_mountains.alpha < 1) bg_mountains.alpha += 0.01;

			// background SFX
			// game.add.tween(heavy_wind).to( { volume: 1 }, 800, "Linear", true, 0, -1, true); // flash forever
			if (jungle_sounds.volume > 0) {
				jungle_sounds.volume -= 0.01;
				heavy_wind.volume += 0.01;
			}
		}
		else {

			// tilesprites
			bg_trees.visible = true;
			if (bg_trees.alpha < 1) bg_trees.alpha += 0.01;
			if (bg_mountains.alpha > 0.05) bg_mountains.alpha -= 0.01;
			else bg_mountains.visible = false;

			// background SFX
			if (heavy_wind.volume > 0) {
				heavy_wind.volume -= 0.01;
				jungle_sounds.volume += 0.01;
			}
		}

		// music change
		if (new_area && !deforest_music.isPlaying && !end_music.isPlaying) {
			deforest_music.play('', 0, 0.0, true);
			game.add.tween(jungle_music).to( {volume: 0}, 5000).start();
			jungle_music.loop = false;
			game.add.tween(deforest_music).to( {volume: 1}, 5000).start();
		}

		// update the tilesprites for parallaxing
		bg_trees.tilePosition.x = -camera.view.x / 5;
		bg_trees.tilePosition.y = -camera.view.y / 5;
		bg_mountains.tilePosition.x = -camera.view.x / 5;
		bg.tilePosition.y = -camera.view.y / 10;

		// ---------------------------------------------------------------------------------------
		// 
		// ---------------------------------------------------------------------------------------

		// Update player body properties
		body.drag.x = features.dragX;
		body.drag.y = features.dragY;
		body.bounce.x = features.bounceX;
		body.bounce.y = features.bounceY;

		// Update player body Arcade Slopes properties
		body.slopes.friction.x = features.frictionX;
		body.slopes.friction.y = features.frictionY;
		body.slopes.preferY    = features.minimumOffsetY;
		body.slopes.pullUp     = features.pullUp;
		body.slopes.pullDown   = features.pullDown;
		body.slopes.pullLeft   = features.pullLeft;
		body.slopes.pullRight  = features.pullRight;
		body.slopes.snapUp     = features.snapUp;
		body.slopes.snapDown   = features.snapDown;
		body.slopes.snapLeft   = features.snapLeft;
		body.slopes.snapRight  = features.snapRight;

		// Update particle lifespan
		// this.emitter.lifespan = 3000 / this.time.slowMotion;

		// This provides a much better slow motion effect for particles, but
		// because this only affects newly spawned particles, old particles
		// can take ages to die after returning to normal timing
		//this.emitter.lifespan = 3000 * this.time.slowMotion;
		//this.emitter.frequency = 1 * this.time.slowMotion;
		//this.emitter.setAlpha(1, 0, 3000 * this.time.slowMotion);

		// Ensure that all new particles defy gravity
		this.emitter.gravity.y = -this.physics.arcade.gravity.y;

		// Give each particle fade-out
		this.emitter.forEach(function (p) {
			p.alpha = p.lifespan / 1000;
		});

		// Toggle the Arcade Slopes plugin itself
		if (features.slopes && !this.game.slopes) {
			this.game.arcadeSlopesPlugin = this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
		}

		if (!features.slopes && this.game.slopes) {
			this.game.plugins.remove(this.game.arcadeSlopesPlugin);
			this.game.arcadeSlopes = null;
		}

		// Camera shake for the fun of it
		if (this.input.keyboard.isDown(Phaser.KeyCode.H)) {
			camera.shake(0.005, 50); // :sunglasses:
		}

		// Collide the player against the collision layer
		this.physics.arcade.collide(this.player, layer3);
		

		// Collide the player against the particles
		//this.physics.arcade.collide(this.emitter, this.player);

		// Collide the particles against each other
		if (features.particleSelfCollide) {
			this.physics.arcade.collide(this.emitter);
		}

		// Move the camera
		if (controls.cameraUp.isDown) {
			camera.y -= features.cam_y_move;
		}

		if (controls.cameraDown.isDown) {
			camera.y += features.cam_y_move;
		}

		if (controls.cameraLeft.isDown) {
			camera.x -= features.cam_x_move;
		}

		if (controls.cameraRight.isDown) {
			camera.x += features.cam_x_move;
		}

		// Reset the player acceleration
		body.acceleration.x = 0;
		body.acceleration.y = 0;

		var grounded = false;
		dir = controls.right.isDown - controls.left.isDown; //direction facing
		this.jumpswitch = !this.jumpswitch && controls.up.isDown;

		// Keep the particle emitter attached to the player (though there's
		// probably a better way than this)
		this.emitter.x = this.player.x + 50 * this.player.scale.x * -1;
		this.emitter.y = this.player.y - 22;
		
		//wall touch animation
		/*
		if (blocked.left || touching.left || blocked.right || touching.right)
			this.player.animations.play('crouch');*/
		
		if (this.input.keyboard.justPressed(Phaser.KeyCode.P)) {
			
		}

		//vertical movement
		if (dir) {
			this.player.scale.x = -dir;
			if (dir < 0) {
				body.acceleration.x = -features.acceleration;
			} else if (dir > 0) {
				body.acceleration.x = features.acceleration
			}
		}

		// Accelerate or jump up
		if (gravity.y > 0 && (blocked.down || touching.down)) {
			this.jetpack = this.jetpackmax;
			this.jump = 0;
			this.jump2 = false;
			grounded = true;
			if (!this.land1) {
				sfx_land1.play();
				this.land1 = true;
			}
			if (!dir) this.player.animations.play('static');
			else { //running
				this.player.animations.play('walk');
				fireTime -= 1;
			}
		}
		else this.land1 = false;

		if (grounded && this.jumpswitch) {
			body.velocity.y = -features.jump*.3;    
			this.jump = 1;
			sfx_jump1.play()
		}

		if (this.jump == 1 && controls.up.isDown) { //first jump shorthop
			if (this.jetpack > 0) {
				body.velocity.y = -360;
				this.jetpack -= 1;
			}
			this.player.animations.play('hop');
		}

		if (this.jump == 1 && !controls.up.isDown){ //reset
			this.jump = 2;
		}
		if (this.jump == 3) {
			if (controls.up.isDown) {
				if (body.y > this.lasty) body.velocity.y = 130;
				this.player.animations.play('top');
				if (!this.jump2) {
					sfx_jump2.play();
					this.jump2 = true;
				}
				else if (!this.glide) {
					sfx_glide.play();
					this.glide = true;
				}
			}
			else {
				this.player.animations.play('glide');
				this.glide = false;
			}
			
			/*if (blocked.left || touching.left || blocked.right || touching.right)
			this.player.animations.play('crouch');*/
			
			//
		}

		if ((this.jump == 0 || this.jump == 2) && !grounded && controls.up.isDown) { //first jump post-jump
			body.velocity.y = -features.jump;
			this.jump = 3;
			//sfx_jump2.play()
		}
		this.jumpswitch = controls.up.isDown;
		this.lasty = body.y;


		// Accelerate down or jump down
		if (controls.down.isDown) {
			
			if (features.jump) {
				if (gravity.y < 0 && (blocked.up || touching.up)) {
					body.velocity.y = features.jump;
				}
			}

			if (!features.jump || gravity.y >= 0){
				body.acceleration.y = Math.abs(gravity.y) + features.acceleration;
				if (!this.fall1) {
					//sfx_fall1.play()
					this.fall1 = true;
				}
			}
		}
		else this.fall1 = false;

		// Wall jump
		if (features.wallJump && (controls.up.justPressed() && gravity.y > 0) || (controls.down.justPressed() && gravity.y < 0)) {
			
			if (!(features.down || blocked.up || touching.up)) {
				
				// Would be even better to use collision normals here
				if (blocked.left || touching.left) {
					body.velocity.x = features.wallJump;
					body.velocity.y = gravity.y < 0 ? features.jump : -features.jump;
					sfx_jump3.play()
				}

				if (blocked.right || touching.right) {
					body.velocity.x = -features.wallJump;
					body.velocity.y = gravity.y < 0 ? features.jump : -features.jump;
					sfx_jump3.play()
				}
			}
		}
		
		/*
		//next level
		if (this.player.body.x > game.world.width - 50) {
			layer1.destroy();
			layer2.destroy();
			layer3.destroy();
			
			layer1 = this.map.createLayer('Noncollision_2');
			layer2 = this.map.createLayer('Noncollision_1');
			layer3 = this.map.createLayer('Collision_1');
			this.player.body.x = 100;
			this.player.body.y = 100;
			this.player.bringToTop();
			
			layer3.resizeWorld();
		}*/

		// MAKE A CALL PHOEJAY!!!!!!
		if (this.input.keyboard.justPressed(Phaser.KeyCode.C)) {
			game.add.audio('screech').play();
		}
		if (this.input.keyboard.isDown(Phaser.KeyCode.C))
				this.player.animations.play('top');

		//ANIMALS


		

		game.burrel.visible = creature1.alive;
		game.fox.visible = creature2.alive;
		game.deer.visible = creature3.alive;


		//Embers
		// if (fireTime < 0) {
		// 	fireTime = 800;
		// 	var v = game.add.sprite(body.x + body.width/2, body.y + body.height, 'ember');
		// }
		//
	},

	render: function () {
		var debug = this.game.debug;
		var controls = this.controls;
		var features = this.features;

		// Render the frame rate
		debug.text('FPS: ' + this.time.fps || '--', 50, 50, "red");

		// Render the keyboard controls
		if(controls.controls.isDown) {
			debug.start(32, 196, '#fff', 64);
			debug.line('Click:', 'Teleport');
			debug.line('WASD:', 'Move/jump');
			debug.line('Arrows:', 'Move the camera');
			debug.line('K:', 'Toggle Arcade Slopes plugin');
			debug.line('C:', 'Show these controls');
			debug.stop();
		}

		// Render some debug information about the input, player and camera
		if (features.debugPlayerBody) {
			this.game.debug.body(this.player);
		}

		if (features.debugPlayerBodyInfo) {
			debug.bodyInfo(this.player, 32, 32);
		}

		if (features.debugCameraInfo) {
			debug.cameraInfo(this.camera, 32, 628);
		}

		if (features.debugInputInfo) {
			debug.inputInfo(540, 628);
		}
	}
}

var fireTime = 10;

function restart(event) {
	if (game.paused) {
		game.paused = false;
		location.reload();
	}
};

function pause_switch() {
	if (game.paused) unpause();
	else pause();
}

function pause() {
	// When the paus button is pressed, we pause the game
	game.pause_label.setText("Unpause");
	game.pause_label.x -= 30;
	game.paused = true;

	// And a label to illustrate which menu item was chosen. (This is not necessary)
	choiseLabel = game.add.text(game.camera.x + game.width/2, game.camera.y + game.height/2 + 80, 'Press R to restart', { font: '30px Arial', fill: '#fff' });
	choiseLabel.anchor.setTo(0.5, 0.5);
};

function unpause() {
	// Only act if paused
	if(game.paused){
		game.pause_label.setText("Pause");
		choiseLabel.destroy();

		// Unpause the game
		game.paused = false;
	}
};

// EOF //
