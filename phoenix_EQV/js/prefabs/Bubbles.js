//armada edit
class Bubbles extends Phaser.Sprite {
	
  constructor(game, key) {

    var x = Math.random() * game.world.width;
    var y = Math.random() * game.world.height;
    var frame = Math.floor(Math.random()*95);

    super(game, x, y, key, frame);
    this.height = Math.random()*3 + 16;
    this.width = Math.random()*3 + 8;
    this.velocity = Math.random()*.8 + .7;
	this.step = 0;
  }

  update() {
    this.y -= this.velocity + this.step;
	if (this.y < -10) this.y = game.world.height-1;
	this.step += Math.random()*.04;
	if (this.step > 1.8) this.step = 0;
  }
}