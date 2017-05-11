//armada edit
class Phoejay extends Phaser.Sprite {
	
  constructor(game, key) {

    var x = Math.random() * game.world.width;
    var y = Math.random() * game.world.height;
    var frame = Math.floor(Math.random()*95);
	
	var sprite1;
var tile;
var cursors;
var origin;
var shift;
var turnspeed = 0.6;
var boost = 9999.0;
var jetpack = 100;
var jetpackmax = 100;
var stamina;

    super(game, x, y, key, frame);
    this.height = Math.random()*3 + 16;
    this.width = Math.random()*3 + 8;
    this.velocity = Math.random()*.8 + .7;
    this.step = 0;
  }
  
  create() {
      
  }

  update() {
    this.y -= this.velocity + this.step;
    if (this.y > game.world.height-1) this.y = 0;
    if (this.y < 0) this.y = game.world.height-1;
    this.step += Math.random()*.04;
    if (this.step > 1.8) this.step = 0;
  }
}