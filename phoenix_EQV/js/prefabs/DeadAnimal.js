
function DeadAnimal(game, key, frame, x, y, divRequired) {
     // call to Pahser.Sprite // new Sprite(game, x, y, key, frame)
     Phaser.Sprite.call(this, game, x, y, key, frame, divRequired);

     // set sprite properties
     this.scale.x = 1;
     this.scale.y = 1;

     //custom properties
     var alive = false;
     //this is for the main function
     var animalStatus = 0;
     //0 means dead, 1 means in process of reviving, 2 means alive

     // add this bad boy to the game!
     game.add.existing(this);
}

DeadAnimal.prototype = Object.create(Phaser.Sprite.prototype);
DeadAnimal.prototype.constructor = DeadAnimal;

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

}