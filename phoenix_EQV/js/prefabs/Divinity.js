var divinity;
class Divinity extends Phaser.Sprite {
	
	constructor(game, x, y, key_div, key_bar, playerbody, index) {
		
		var frame = Math.floor(Math.random()*1);
		super(game, x, y, key_div);
		
		this.width = 89 / 2; // half width
		this.height = 96 / 2; // half height
		this.anchor.set(0.5);
		this.player = playerbody;
		
		this.xdest = playerbody.x + 350 + (index-4)*40; //x coordinate for divinity location
		this.ydest = playerbody.x + 70; //y coordinate
		
		this.ready = false;

		// EMITTER
		//	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
	    this.emitter = game.add.emitter(this.x, this.y, 20, 20);

	    //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
	    this.emitter.width = 10;

	    this.emitter.makeParticles('particle_divinity');

	    this.emitter.minParticleSpeed.set(-50, -50);
	    this.emitter.maxParticleSpeed.set(50, -100);

	    this.emitter.setRotation(0, 360);
	    this.emitter.setAlpha(0.5, 1);
	    this.emitter.setScale(1, 1, 1, 1);
	    this.emitter.gravity = -1500;

	    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
	    //	The 2000 value is the lifespan of each particle before it's killed
	    this.emitter.start(false, 2000, 100);
	}
	
	update() {
		
		if (this.ready) {
		
			this.ydistance = this.player.x + 20 - this.x;
			this.xdistance = this.player.y + 20 - this.y;
			this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
			
			if (this.distance < 50) {
				divinity += 1;
				this.emitter.on = false;
				this.destroy();
			}
			else if (this.distance < 150) {
				if (this.player.x + 20 > this.x) this.x += 120/this.distance;
				else this.x -= 120/this.distance;
				if (this.player.y + 20 > this.y) this.y += 120/this.distance;
				else this.y -= 120/this.distance;
			}
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

		// update emitter
		this.emitter.x = this.x;
		this.emitter.y = this.y;

		this.emitter.forEachAlive(function(p) {
			p.alpha = p.lifespan / 2000;	
		});
	}
}











// EOF //