// state MainMenu 
//	with start game, options, instructions

// written by: ___________

var Title = function(game) {
	// variables
};
Title.prototype = {
	preload: function() {
		console.log('Title: preload');

	},
	create: function() {
		console.log('Title: create');

		game.state.start('Play');
	},
	update: function() {

	}
}