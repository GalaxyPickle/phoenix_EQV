//global variables for status of animals
var deerStat = 0;
var foxStat = 0;
var burrelStat = 0;
//0 means animal is DEAD, 1 will be for the PROCESS OF REVIVING, 2 will mean animal is ALIVE
var divCount = 0;
//counter for divinity
var deerCount = 5;
//how much divinity you must collect for the deer
var foxCount = 1000000;
var burrelCount = 200000000000000000000000000000000;

//In PELOAD function
game.load.image('deerD', 'filepath');
//deerD meaning deer dead
game.load.image('deerA', 'filepath');
//deerA meaning deer alive
//so the dead and alive versions will be separate sprites
game.load.image('divinity', 'filepath');
//yada yada you get the point

//in CREATE function
deadDeer = game.add.sprite(x, y, 'deerD');
//may have to make the below global depending on where we put it in the code
divinities = game.add.group();
divinities.game.enableBody = true;

//in UPDATE function
game.physics.ninja.overlap(player, divinities, collectDiv, null, this);
game.physics.ninja.overlap(player, divinities, hitDeerD, null, this);

if (deerStat = 2 && foxStat = 2 && burrelStat = 2)
{
	//we will use this depending on how we decide to implement the activiation of next level or game end or whatever
}

function hitDeerD(player, deerD){
	if (deerStat = 0){
		deerStat = 1;
		//change to one for process of collecting div
		var j = 5;
		//collect 5 div
		for (i = 0; i < j, i++){
			var divinity = divinities.create(something, something, 'divinity');
		}
		//not really sure how/where we will spawn the stuff but we'll figure it out later
		var deerTimer//not exactly sure how to implement the time stuff but I will figure it out later
		if (timer runs out && divCount != deerCount)
		{
			//kill all divinity
			divCount = 0;
			deerStat = 0;
			//back to 0 so player and retry
		}
		if (divCount == deerCount)
		{
			//tree branch grows out? or maybe new variable with animalCount?
			deadDeer.kill();
			//particle effects to be fancy?
			aliveDeer = game.add.srite(x, y, 'deerA');
			deerStat = 2;
			//deer is now alive yayyy
			divCount = 0;
			//reset divCount for next animal
		}


	}
}
function collectDiv(player, divinity){
	divinity.kill();
	divCount += 1;
}
