var divinity;
class DeadAnimal extends Phaser.Sprite {
	
	constructor(game, key_animal, key_div, key_bar, playerbody, n, time) {
		
		var x = 100;
		var y = 100;
		super(game, x, y, key_animal);
		
		this.n = n;
		this.time = time;
		this.t = -100;
		this.player = playerbody;
		this.divinities = new Array();
	}
	
	update() {
		if (this.t >= 0) this.t--;
		
		if (this.t < 0 && this.t > -100) {
			for (var i = 0; i < this.n; i++)
				this.divinities[i].destroy();
		}
		
		if (divinity >= this.n) this.success();
		
		this.ydistance = this.player.x + 20 - this.x + 10;
		this.xdistance = this.player.y + 20 - this.y + 10;
		this.distance = Math.sqrt(this.xdistance*this.xdistance + this.ydistance*this.ydistance);
		
		if (this.distance < 30 && this.t <= 0) this.spawnDivinity();
	}
		
	spawnDivinity() {
		for (var i = 0; i < this.n; i++) {
			divinity = 0;
			this.t = this.time;
			this.divinities[i] = new Divinity(game, this.x, this.y, 'divinity', '', this.player, i);
			game.add.existing(this.divinities[i]);
		}
	}
	
	success() {
		divinity = 0;
		console.log("congrats");
		
		game.add.sprite(300, 600, 'mushroom');
	}
}
	/*
DeadAnimal.prototype.update = function(DeadAnimal) {
    
    
    function collideWithPhoejay(){
        //this is for when the Phoejay collides with the dead animal
        if  (animalStatus = 0){
            alive = 1;
            //so now in a state where animal is in the process of reviving
            if (divCounter == divRequired)
            {
                //divCounter should be the global variable in Phoejay
                animalStatus = 2;
                alive = true;
                divCounter = 0;
            }
            else if (divCounter != divRequired && timerRunsOut){
                alive = 0;
                //animal is dead again and the player can retouch  it again to retry
                divCounter = 0;
            }

    }

}*/