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

		splash = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
	},
	update: function() {

		// have a splash screen lasting maybe ~5 sec
		//	with title and sound intro thing

		// once the splash screen is over go to the play state(?)
		//	(if there's no main menu) start the game!!!!!
		game.state.start('Play');

	}
}