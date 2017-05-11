//armada edit
class Feathers extends Phaser.Sprite {
	
  constructor(game, key, bird) {

    var x = bird.x;
    var y = bird.y;
    var frame = Math.floor(Math.random()*95); //sprite variations

    super(game, x, y, key, frame);
    this.height = Math.random()*3 + 16;
    this.width = Math.random()*3 + 8;
    this.velocity = 1;
  }

  update() {

  }
}