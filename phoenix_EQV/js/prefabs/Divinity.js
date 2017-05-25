//armada edit
class Bubbles extends Phaser.Sprite {
	
	constructor(game, key_div, key_bar, positions) {
		//for positions.length : x = positions[i][0], y = positions[i][1]
		
	}
	
	create() {
		this.timer = 5000;
		this.bar = game.add.sprite(0, 0, key_bar);
		this.bar.height = 2;
		this.bar.width = game.width;
		this.bar.fixedToCamera = true;
	}
	
	update() {
		this.timer--;
		
		
		stamina.height = 2;
		stamina.width = game.width;
		stamina.fixedToCamera = true;
	}
}