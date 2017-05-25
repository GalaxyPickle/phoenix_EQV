	// state Play
//	has the player core loop

// written by: ____________

var Play = function(game) {
	// variables
	player = null;

	tile = null;
	map = null;
	layer = null;
	tiles = null;
	divCounter = 0;
	deer = null;
	fox = null;
	burrel = null;

	bubbles = new Array();
	
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
		cameraLerp: 0.1,
		cameraFollow: true,
		cameraRoundPixels: false,
		
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
		dragX: 1200,
		dragY: 0,
		bounceX: 0,
		bounceY: 0,
		frictionX: 0,
		frictionY: 0,
		jump: 500,
		wallJump: 350,
		shape: 'aabb',
		size: 96,
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
		debug: 0,
	};
};
Play.prototype = {
	preload: function() {
		console.log('Play: preload');
	
		// load images path
		game.load.path = 'assets/img/';

		// bg
		game.load.image('bg', 'bg/bg@1x.png');

		// moving things
		game.load.spritesheet('bird', 'entity/phoenix/phoejay_s.png',60,39);

		// tilemap stuff 
		game.load.image('forest', 'tilesets/forest_tilemap.png');
		game.load.image('arcade-slopes', 'tilesets/arcade-slopes-64.png');

		// load tilemap
		game.load.path = 'json/';
		game.load.tilemap('map', 'forest_tilemap.json', null, Phaser.Tilemap.TILED_JSON);

		// load slope map
		game.load.json('slope_map', 'slope_map.json');
	},
	create: function() {
		console.log('Play: create');
		
		// I always have this on :)
		this.time.advancedTiming = true;
		
		// Start up Arcade Physics
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.arcadeSlopesPlugin = this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
		
		// Set the stage background colour
		this.stage.backgroundColor = '#facade';
		
		// Create the tilemap object from the map JSON data

		this.map = this.add.tilemap('map');
		//map.addTilesetImage('forest', 'arcade-slopes');
		this.map.addTilesetImage('forest_tilemap', 'forest');

		layer = this.map.createLayer('Tile Layer 1');
		this.game.slopes.convertTilemapLayer(layer, game.cache.getJSON('slope_map'));
		this.map.setCollisionBetween(1, 304, true, "Tile Layer 1");

		layer.resizeWorld();
		
		// Create a player sprite
		this.player = this.add.sprite(595, 384);
		
		// Create a graphics object for the player
		this.playerGraphics = new Phaser.Graphics(this);
		
		// Generate a texture for the player and give it a physics body
		this.updatePlayer(this.player);
		
		// Set the gravity
		this.physics.arcade.gravity.y = 1000;
		
		// Set the Jetpack
		this.jetpack = this.jetpackmax = 24;
		
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
		
		// Create a particle emitter and position it on the player
		this.emitter = this.add.emitter(this.player.x, this.player.y, 2000);
		
		// Particle graphics
		var particleGraphics = new Phaser.Graphics(this)
			.beginFill(Phaser.Color.hexToRGB('#fff'), 0.5)
			.drawCircle(0, 0, 16);
		
		// Cache the particle graphics as an image
		this.cache.addImage('particle', null, particleGraphics.generateTexture().baseTexture.source);
		
		// Create 2000 particles using our newly cached image
		this.emitter.makeParticles('particle', 0, 2000, true, true);
		
		// Give each particle a circular collision body
		this.emitter.forEach(function (particle) {
			particle.body.setCircle(8);
		});
		
		// Attach Arcade Physics polygon data to the particle bodies
		this.game.slopes.enable(this.emitter);
		
		// Set some particle behaviours and properties
		this.emitter.gravity.y = -this.physics.arcade.gravity.y;
		this.emitter.bounce.set(1, 1);
		this.emitter.width = this.player.width;
		this.emitter.height = this.player.height;
		this.emitter.setAlpha(1, 0, 6000);
		this.emitter.setXSpeed(-500, 500);
		this.emitter.setYSpeed(-500, 500);
		
		// Map some keys for use in our update() loop
		this.controls = this.input.keyboard.addKeys({
			'up': Phaser.KeyCode.W,
			'down': Phaser.KeyCode.S,
			'left': Phaser.KeyCode.A,
			'right': Phaser.KeyCode.D,
			'follow': Phaser.KeyCode.F,
			'gravity': Phaser.KeyCode.G,
			'controls': Phaser.KeyCode.C,
			'particles': Phaser.KeyCode.J,
			'toggle': Phaser.KeyCode.K,
			'cameraUp': Phaser.KeyCode.UP,
			'cameraDown': Phaser.KeyCode.DOWN,
			'cameraLeft': Phaser.KeyCode.LEFT,
			'cameraRight': Phaser.KeyCode.RIGHT
		});
		
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
		
		player.body.setCircle(halfSize);
		graphics.drawCircle(0, 0, features.size);
		
		// Create a Pixi texture from the graphics and give it to the player
		player.setTexture(graphics.generateTexture(), true);
			
		player.width = size;
		player.height = size;
		
		// Enable Arcade Slopes physics
		if (this.game.slopes) {
			player.body.slopes = null; // TODO: Fix Phaser.Util.Mixin or use something else
			this.game.slopes.enable(player);
		}
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
		
		// Toggle gravity
		if (controls.gravity.justDown) {
			features.enableGravity = !features.enableGravity;
		}
		
		// Update gravity
		if (features.enableGravity) {
			gravity.y = features.gravity;
		} else {
			gravity.y = 0;
		}
		
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
		
		// Keep the particle emitter attached to the player (though there's
		// probably a better way than this)
		this.emitter.x = this.player.x;
		this.emitter.y = this.player.y;
		this.emitter.width = this.player.width;
		this.emitter.height = this.player.height;
		
		// Update particle lifespan
		this.emitter.lifespan = 3000 / this.time.slowMotion;
		
		// This provides a much better slow motion effect for particles, but
		// because this only affects newly spawned particles, old particles
		// can take ages to die after returning to normal timing
		//this.emitter.lifespan = 3000 * this.time.slowMotion;
		//this.emitter.frequency = 1 * this.time.slowMotion;
		//this.emitter.setAlpha(1, 0, 3000 * this.time.slowMotion);
		
		// Ensure that all new particles defy gravity
		this.emitter.gravity.y = -this.physics.arcade.gravity.y;
		
		// Toggle particle flow
		if (controls.particles.justDown) {
			if (this.emitter.on) {
				this.emitter.kill();
			} else {
				this.emitter.flow(3000 / this.time.slowMotion, 1, 5);
			}
		}
		
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
		this.physics.arcade.collide(this.player, layer);
		
		// Collide the player against the particles
		//this.physics.arcade.collide(this.emitter, this.player);
		
		// Collide the particles against each other
		if (features.particleSelfCollide) {
			this.physics.arcade.collide(this.emitter);
		}
		
		// Move the camera
		if (controls.cameraUp.isDown) {
			camera.y -= 20;
		}
		
		if (controls.cameraDown.isDown) {
			camera.y += 20;
		}
		
		if (controls.cameraLeft.isDown) {
			camera.x -= 20;
		}
		
		if (controls.cameraRight.isDown) {
			camera.x += 20;
		}
		
		// Reset the player acceleration
		body.acceleration.x = 0;
		body.acceleration.y = 0;
		
		dir = controls.right.isDown - controls.left.isDown; //direction facing
		
		//vertical movement
		if (dir) {
			//this.scale.x = -dir;
			if (this.grounded && !this.running) {
				//this.animations.play('run');
				//this.running = true;
			}
			//else this.running = false;
			if (dir < 0) {
				body.acceleration.x = -features.acceleration;
			} else if (dir > 0) {
				body.acceleration.x = features.acceleration
			}
		}
		
		// Accelerate or jump up
		var grounded = false;
		this.jumpswitch = !this.jumpswitch && controls.up.isDown;
		
		if (gravity.y > 0 && (blocked.down || touching.down)) {
			this.jetpack = this.jetpackmax;
			this.jump = 0;
			grounded = true;
			//if (!dir) this.animations.play('idle');
		}
		
		if (grounded && this.jumpswitch) {
			body.velocity.y = -features.jump*.3;
			this.jump = 1;
		}
		
		if (this.jump == 1 && controls.up.isDown) { //first jump shorthop
			if (this.jetpack > 0) {
				body.velocity.y = -360;
				this.jetpack -= 1;
			}
			//this.animations.play('jump1');
		}
		
		if (this.jump == 1 && !controls.up.isDown) //reset
			this.jump = 2; 
			
		if (this.jump == 3) {
			if (controls.up.isDown) {
				if (body.y > this.lasty) body.velocity.y = 130;
				//this.animations.play('glide');
			}
			//else this.animations.play('jump2');
		}
			
		if ((this.jump == 0 || this.jump == 2) && !grounded && controls.up.isDown) { //first jump post-jump
			body.velocity.y = -features.jump;
			this.jump = 3;
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
			}
		}
		
		// Wall jump
		if (features.wallJump && (controls.up.isDown && gravity.y > 0) || (controls.down.isDown && gravity.y < 0)) {
			if (!(blocked.down || blocked.up || touching.up)) {
				// Would be even better to use collision normals here
				if (blocked.left || touching.left) {
					body.velocity.x = features.wallJump;
					body.velocity.y = gravity.y < 0 ? features.jump : -features.jump;
				}
				
				if (blocked.right || touching.right) {
					body.velocity.x = -features.wallJump;
					body.velocity.y = gravity.y < 0 ? features.jump : -features.jump;
				}
			}
		}
	},
	
	render: function () {
		var debug = this.game.debug;
		var controls = this.controls;
		var features = this.features;
		
		// Render the frame rate
		debug.text(this.time.fps || '--', 4, 16, "#ffffff");
		
		// Render the keyboard controls
		if(controls.controls.isDown) {
			debug.start(32, 196, '#fff', 64);
			debug.line('Click:', 'Teleport');
			debug.line('WASD:', 'Move/jump');
			debug.line('Arrows:', 'Move the camera');
			debug.line('F:', 'Toggle camera follow');
			debug.line('G:', 'Toggle gravity');
			debug.line('J:', 'Toggle particles');
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

//http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// function shadeColor1(color, percent) { // deprecated. See below.
//   var num = parseInt(color.slice(1), 16),
//     amt = Math.round(2.55 * percent),
//     R = (num >> 16) + amt,
//     G = (num >> 8 & 0x00FF) + amt,
//     B = (num & 0x0000FF) + amt;
//   return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
// }
