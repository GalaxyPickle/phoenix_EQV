// Preload state
//
// Preload.js

// preloader state (loading bar and load music?)
var Preloader = function(game) {
	// variables
};
Preloader.prototype = {
	preload: function() 
	{

	},
	create: function() {
		game.state.start('MainMenu');
	}
}