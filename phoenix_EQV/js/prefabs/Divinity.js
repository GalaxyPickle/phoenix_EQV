var divinity;
class Divinity extends Phaser.Sprite {
	
	constructor(game, x, y, key_div, key_bar, playerbody, index) {
		
		var frame = Math.floor(Math.random()*1);
		super(game, x, y, key_div);
		
		this.height = Math.random()*3 + 16;
		this.width = Math.random()*3 + 8;
		this.player = playerbody;
		
		this.xdest = playerbody.x + 350 + (index-4)*40; //x coordinate for divinity location
		this.ydest = playerbody.x + 70; //y coordinate
		
		this.ready = false;
	}
	
	update() {
		
		if (this.ready) {
		
			this.ydistance = this.player.x + 20 - this.x;
			this.xdistance = this.player.y + 20 - this.y;
			this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
			
			if (this.distance < 30) {
				divinity += 1;
				this.destroy();
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
		
		else {
			this.ydistance = this.xdest - this.x;
			this.xdistance = this.ydest - this.y;
			this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
			
			if (this.distance < 10) {
				this.ready = true;
				console.log("hi");
			}
			else {
				if (this.xdest + 20 > this.x) this.x += .05*this.distance;
				else this.x -= .5*this.distance;
				if (this.ydest + 20 > this.y) this.y += .5*this.distance;
				else this.y -= .5*this.distance;
			}
		}
	}
}