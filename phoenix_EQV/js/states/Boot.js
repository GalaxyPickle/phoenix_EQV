// state Boot
//	show loading bar

// written by: ___________

var Boot = function(game) {
	// variables
};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');

		// load the loading bar sprite and BG
		
	},
	create: function() {
		console.log('Boot: create');

		// start the loading screen
		game.state.start('Load');
	}
};