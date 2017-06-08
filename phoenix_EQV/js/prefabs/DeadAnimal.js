var divinity;
var alive1;
//for the burrel
var alive2; 
//for the fox
var alive3; 
//for the deer
class DeadAnimal extends Phaser.Sprite {
	
	constructor(game, x, y, key_animal, key_div, key_bar, phoejay, coords, time, camera, aniNumber) {

		super(game, x, y, key_animal);
		
		this.anchor.set(0.5);

		this.coordinates = coords;
		this.time = time;
		this.t = -100;
		this.player = phoejay.body;
		this.pj = phoejay;
		this.divinities = new Array();
		this.cam = camera;
		this.discovered = false;
		alive = false;

		// display text
		this.text = game.add.text(game.width / 2, game.height / 2, 'SPACE', big_style);
		this.text_s = game.add.text(game.width / 2, game.height / 2 + 100, 'to begin revive', small_style);

		// text tween
		this.texties = [this.text, this.text_s];
		// for each text, make it tween foreverrrrr flash
		this.texties.forEach(function(e) {
			e.anchor.set(0.5);
			e.alpha = 0.5;
			e.fixedToCamera = true;
			game.add.tween(e).to( { alpha: 1 }, 1000, "Linear", true, 0, -1, true); // forever
		});

		//animal is not alive yet
	}

	startEmitting() {
		// EMITTER START IT BOIS!!!!!
		//	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
	    this.emitter = game.add.emitter(this.x, this.y, this.width, this.height);

	    //	This emitter will have a width of 10px
	    this.emitter.width = 200;
	    this.emitter.height = 200;

	    this.emitter.makeParticles('particle_divinity');

	    this.emitter.minParticleSpeed.set(-10, -10);
	    this.emitter.maxParticleSpeed.set(10, -10);

	    this.emitter.setRotation(0, 360);
	    this.emitter.setAlpha(0.5, 1);
	    this.emitter.setScale(1);
	    this.emitter.gravity = -1500;

	    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
	    //	The 2000 value is the lifespan of each particle before it's killed
	    this.emitter.start(false, 2000, 50);

	    // BAR AT TOP OF SCREEN.
		this.bar = game.add.sprite(game.width / 2, 25, 'bar');
		this.bar.fixedToCamera = true;
		this.bar.width = game.width / 2;
		this.bar.visible = alive;
		this.bar.anchor.set(0.5);
		this.bar.tint = 0x4fb5e7;
	}
	
	update() {
		
		if (this.t >= 0) this.t--;
		
		if (this.t < 0 && this.t > -100) {
			for (var i = 0; i < this.coordinates.length; i++)
				this.divinities[i].remove();
			game.camera.shake(0.006, 200);
			this.t = -100;
			//play fail sound
			game.add.audio('fail').play();

			// TIMER BAR THINGY AT TOP OF SCREEN
			this.bar.visible = false;
		}
		
		if (divinity >= this.coordinates.length) this.success();
		
		this.ydistance = this.player.x + 20 - this.x + 10;
		this.xdistance = this.player.y + 20 - this.y + 10;
		this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
		
		if (this.distance < 1200 && !this.discovered) {
			this.discovered = true;
			var tween = game.add.tween(this.cam).to( { x: this.x - game.width/2, y: this.y - game.height/2}, 2400, Phaser.Easing.Exponential.Out, true);
		}
		
		if (this.distance < 150 && this.t <= 0) {
			this.text.setText('SPACE');
			this.text_s.setText('to begin revival');
			// if press space, start collectin!
			if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
				// TIMER BAR THINGY AT TOP OF SCREEN
				this.bar.visible = true;
				this.bar.width = game.width / 2;
				game.add.audio('begin').play();
				this.spawnDivinity();
			}
		}
		else {
			this.text.setText('');
			this.text_s.setText('');
		}

		// particles
		if (this.emitter != null) {
			this.emitter.forEachAlive(function(p) {
				p.alpha = p.lifespan / 2000;	
			});
		}
		else this.startEmitting();

		this.bar.width = -(game.width - 20) + (this.t);
	}
		
	spawnDivinity() {
		for (var i = 0; i < this.coordinates.length; i++) {
			divinity = 0;
			this.t = this.time;
			this.divinities[i] = new Divinity(game, this.x, this.y, 'divinity', this.player, this.coordinates[i]);
			game.add.existing(this.divinities[i]);
		}
	}
	
	success() {
		divinity = 0;
		console.log("congrats");

		// SFX for revival
		game.add.audio('revival').play();

		var max = 3;
		// timer
		// create a Timer object - (autoDestroy) = kill timer after its event is dispatched
		var timer01 = game.time.create(false);
		// add a new event to the Timer (delay, callback, context)
		var timedEvent01 = timer01.add(Phaser.Timer.SECOND * max, killFire, game);
		// start the timer (delay)
		timer01.start();
		var revival = game.add.sprite(this.x, this.y, 'revival');
		revival.animations.add('revival_animate', [0,1,2,3], 10, true);
		revival.animations.play('revival_animate');

		// KILLL IT
		this.emitter.on = false;
		this.bar.kill();
		this.destroy();

		//make the live version appear
		function killFire(){
			revival.destroy();
			if (this.aniNumber == 1)
			{
				alive1 = true;
			}
			if (this.aniNumber == 2)
			{
				alive2 = true;
			}
			if (this.aniNumber == 3)
			{
				alive3 = true;
			}
			
		}
	}
}