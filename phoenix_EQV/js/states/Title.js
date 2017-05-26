// state MainMenu 
//	with start game, options, instructions

// written by: ___________

var Title = function(game) {
	// variables
};
Title.prototype = {
	preload: function() {
		console.log('Title: preload');

		// not much should be preloaded
	},
	create: function() {
		console.log('Title: create');

		// timer
		// create a Timer object - (autoDestroy) = kill timer after its event is dispatched
		timer01 = game.time.create(false);
		// add a new event to the Timer (delay, callback, context)
		max = 11;
		timedEvent01 = timer01.add(Phaser.Timer.SECOND * max, null, game);
		// start the timer (delay)
		timer01.start();

		// load splash screen image
		splash = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
		splash.anchor.set(0.5);

		// set text for member names


		// fade-in
		// add the fade-in sprite overlay
		fade_in = game.add.tileSprite(0, 0, 3000, 3000, 'fade-in');
		fade_in.alpha = 1;
		game.add.tween(fade_in).to( { alpha: 0 }, 2000, "Linear", true, 0); // unveil
	},
	update: function() {

		// have a splash screen lasting maybe ~5 sec
		//	with title and sound intro thing
		if (timer01.seconds >= max - 1 || game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			tween = game.add.tween(fade_in).to( { alpha: 1 }, 2000, "Linear", true, 0); // REVEIL
			tween.onComplete.add(this.startGame, game);
		}
			//this.startGame();
	},
	render: function() {
		// show timer01 debug text
		game.debug.text('ms: ' + timer01.seconds, 32, 32, "#ff0");
	},
	startGame: function() {
		// once the splash screen is over go to the play state(?)
		//	(if there's no main menu) start the game!!!!!
		game.state.start('Play');
	}
}