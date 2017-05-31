//armada edit

class Divinity extends Phaser.Sprite {
	
	constructor(game, key_div, key_bar, playerbody, index) {
		
		var x = playerbody.x + 350 + (index-4)*40;
		var y = playerbody.x + 70;
		var frame = Math.floor(Math.random()*1);
		super(game, x, y, key_div);
		
		this.height = Math.random()*3 + 16;
		this.width = Math.random()*3 + 8;
		this.player = playerbody;
	}
	
	update() {
		
		this.ydistance = this.player.x + 20 - this.x;
		this.xdistance = this.player.y + 20 - this.y;
		this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
		
		if (this.distance < 30) {
			this.destroy();
			this.player.divinity += 1;
			console.log(this.player.divinity);
		}
		else if (this.distance < 170) {
			if (this.player.x + 20 > this.x) this.x += 120/this.distance;
			else this.x -= 120/this.distance;
			if (this.player.y + 20 > this.y) this.y += 120/this.distance;
			else this.y -= 120/this.distance;
		}
		//stamina.height = 2;
		//stamina.width = game.width;
		//stamina.fixedToCamera = true;
	}
}