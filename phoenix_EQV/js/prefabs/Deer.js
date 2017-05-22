//NOT DONE YET
var deerStat = 0;
function Deer(game, key, frame, x, y){
	Phaser.Sprite.call(this, game, x, y, key, frame);
	//will decide where to spawn it later

	game.physics.enable(this);

}

Deer.prototype = Object.create(Phaser.Sprite.prototype);
Deer.prototype.constructor = Armada; 

Deer.prototype.update = function() {
	if (deerStat == 0 && this.collide(Phoejay)){
		//idk exactly how to write the collide function
		deerStat = 1;
		var  j = 5;
		//amount of divinity
		//something with divinity, will create divinity prefab later
		//divCounter should be under main or Phoejay
		if (divCounter == j)
		{
			//switch sprite form
			deerStat = 2;
			//deer alive
			//divCounter reset
		}
		else if (timerrunsout && deerStat != divCounter){
			//where should the timer be implemented? in main?
			deerStat = 0;
			//dead again
			//divCounter should be resetted


		}
	}
}