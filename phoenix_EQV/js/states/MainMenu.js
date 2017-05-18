// state MainMenu 
//	with start game, options, instructions

var MainMenu = function(game) {
	// variables
};
MainMenu.prototype = {
	preload: function() {

	},
	create: function() {
		game.state.start('Play');
	},
	update: function() {

	}
}