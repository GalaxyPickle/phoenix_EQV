var divinity;
class DeadAnimal extends Phaser.Sprite {
	
	constructor(game, x, y, key_animal, key_div, key_bar, playerbody, coords, time) {

		super(game, x, y, key_animal);
		
		this.anchor.set(0.5);

		this.coordinates = coords;
		this.time = time;
		this.t = -100;
		this.player = playerbody;
		this.divinities = new Array();
	}
	
	update() {
		if (this.t >= 0) this.t--;
		
		if (this.t < 0 && this.t > -100) {
			for (var i = 0; i < this.coordinates.length; i++)
				this.divinities[i].remove();
			game.camera.shake(0.006, 210);
			this.t = -100;
			//play fail sound
		}
		
		if (divinity >= this.coordinates.length) this.success();
		
		this.ydistance = this.player.x + 20 - this.x + 10;
		this.xdistance = this.player.y + 20 - this.y + 10;
		this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
		
		if (this.distance < 30 && this.t <= 0) this.spawnDivinity();
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
		
		game.add.sprite(300, 600, 'mushroom');
		this.destroy();
	}
}