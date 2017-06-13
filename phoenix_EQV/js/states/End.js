// state Load
//	load all main assets for game and decode music, etc.

// written by: ___________

var End = function(game) {
	// variables
	var story1 = null;
};
End.prototype = {
	preload: function() {
		console.log('End: preload');

		game.stage.backgroundColor = "#fff";


	},
	create: function() {
		console.log('End: create')
		
		small_style = {fontSize: '20px', fill: '#aaa', font: 'Meta'};
		
				//timer to change first text
		let timer01 = game.time.create(false);
		let timedEvent01 = timer01.add(Phaser.Timer.SECOND * 7, updateText, game);
		timer01.start();
		//timer to change second text
		let timer02 = game.time.create(false);
		let timedEvent02 = timer01.add(Phaser.Timer.SECOND * 16, updateText2, game);
		timer02.start();
		//timer to change third text
		let timer03 = game.time.create(false);
		let timedEvent03 = timer01.add(Phaser.Timer.SECOND * 28, updateText3, game);
		timer03.start();
		//time to go to game
		let timer05 = game.time.create(false);
		let timedEvent05 = timer01.add(Phaser.Timer.SECOND * 27, startGame, game);
		timer03.start();

		//add text for story
		story1 = game.add.text(game.width/2, game.height/2, 
			"The phoenix looks down over the barren, once-lush landscape.", 
			small_style);

		story1.anchor.setTo(0.5, 0.5);
		story1.bringToTop();
		//make it fade in
		story1.alpha = 0;
		game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
		
		function updateText(){
			//story1.alpha = 0;
			//game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 4000);
			console.log("hi");
			
			story1.destroy();
			story1 = game.add.text(game.width/2, game.height/2, 
				"The seeds of life have been sown in this wasteland.", 
				small_style);

			story1.alpha = 0;
			game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
			story1.anchor.setTo(0.5, 0.5);
		}
		function updateText2(){
			console.log("hi1");
			
			story1.destroy();
			story1 = game.add.text(game.width/2, game.height/2, 
				"Though this forest may some day thrive once again, 32 million acres of forest are destroyed every year.", 
				small_style);

			story1.anchor.setTo(0.5, 0.5);
			story1.alpha = 0;
			game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
		}
		function updateText3(){
			story1.destroy();
			story1 = game.add.text(game.width/2, game.height/2, 
				"Over half of the Earth's forest cover has been lost.", 
				small_style);

			story1.anchor.setTo(0.5, 0.5);
			story1.alpha = 0;
			game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
		}
		function startGame(){
			location.reload();
		}
	},
		
	update: function() {

	}
};