// prefab Phoejay (Player)
//  has all its properties and button pressings

// written by: _________

function Phoejay(game, key, frame, x, y, hitbox_size=100/3, birdWeight=2) {
	// call to Pahser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// set sprite properties
	game.physics.ninja.enableCircle(this, hitbox_size);
	this.body.bounce = 0;
	this.body.friction = 0.03;
	this.scale.x = 1;
	this.scale.y = 1;
	this.body.gravityScale = birdWeight;

	// set CUSTOM properties
	this.cursors = game.input.keyboard.createCursorKeys();

	this.turnspeed = 0.6;
	this.boost = 9999.0;
	this.jetpack = 20;
	this.jetpackmax = 20;
	this.birdWeight = 2;
	this.grounded = false;
	this.dir = 0; //direction left = -1; direction right = 1;
	this.jump = null;
	this.run = false;
	this.lasty = null;

	// add this bad boy to the game!
	game.add.existing(this);
}

Phoejay.prototype = Object.create(Phaser.Sprite.prototype);
Phoejay.prototype.constructor = Phoejay;

Phoejay.prototype.create = function(Phoejay) {
	this.anchor.setTo(.5,.5);
	this.animations.add('idle', [0], 1, false);
	this.animations.add('run', [1, 2], 12, true);
	this.animations.add('jump1', [3], 1, false);
	this.animations.add('jump2', [4], 1, false);
	this.animations.add('glide', [5], 1, false);
}
Phoejay.prototype.update = function(Phoejay) {
	//console.log(this.jetpack);

	// this needs to be rewritten and simplified----/////////////

	if (this.body.touching.down) this.grounded = true;
	dir = this.cursors.right.isDown - this.cursors.left.isDown; //direction facing

	if (this.grounded) { //player.body.touching.down
		this.jetpack = this.jetpackmax;
		this.jump = 0;
		if (!dir) this.animations.play('idle');
	}

	//vertical movement
	if (dir) {
		this.scale.x = -dir;
		if (this.grounded && !this.running) {
			this.animations.play('run');
			this.running = true;
		}
		else this.running = false;
		if (dir < 0) {
			this.body.moveLeft(30);
		} else if (dir > 0) {
			this.body.moveRight(30);
		}
	}

	//horizontal movement
	if ((this.grounded || this.body.touching.downleft || this.body.touching.downright) && this.cursors.up.isDown) { //first jump
		this.body.moveUp(150);
		this.jump = 1;
	}

	if (this.jump == 1 && this.cursors.up.isDown) { //first jump shorthop
		if (this.jetpack > 0) {
			this.body.moveUp(this.jetpack * 4);
			this.jetpack -= 1;
		}
		this.animations.play('jump1');
	}
	if (this.jump == 1 && !this.cursors.up.isDown) { //reset
		this.jump = 2; 
	}
	if ((this.jump == 0 || this.jump == 2) && !this.grounded && this.cursors.up.isDown) { //first jump post-jump
		this.body.moveUp(this.birdWeight * 500);
		this.jump = 3;
	}
	if (this.jump == 3) {
		if (this.cursors.up.isDown) {
			if (this.body.y > this.lasty) this.body.moveUp(this.birdWeight * 10.2);
			this.animations.play('glide');
		}
		else this.animations.play('jump2');
	}
	this.lasty = this.body.y;

	////////////////////////////////////////////////////////////////
}