//armada edit
class Divinity extends Phaser.Sprite {
	
	constructor(game, key_div, key_bar, playerbody) {//, positions
		//for positions.length : x = positions[i][0], y = positions[i][1]
		var x = Math.random() * game.world.width;
		var y = Math.random() * game.world.height;
		var frame = Math.floor(Math.random()*95);
		super(game, x, y, key_div, frame);
		
		this.height = Math.random()*3 + 16;
		this.width = Math.random()*3 + 8;
		this.player = playerbody;
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
		
		this.ydistance = this.player.x + 20 - this.x;
		this.xdistance = this.player.y + 20 - this.y;
		
		if (Math.abs(this.xdistance) < 20 && Math.abs(this.ydistance) < 20) this.destroy();
		if (Math.abs(this.xdistance) < 50 && Math.abs(this.ydistance) < 50 ) {
			if (this.xdistance < 0) this.x += 1;
			else this.x -= 1;
			if (this.ydistance > 0) this.y += 1;
			else this.y -= 1;
		}
		//stamina.height = 2;
		//stamina.width = game.width;
		//stamina.fixedToCamera = true;
	}
}