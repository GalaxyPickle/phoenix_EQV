// state Boot
//	show loading bar

// written by: ___________

var Boot = function(game) {
	// variables
};
Boot.prototype = {
	preload: function() {
		
	},
	create: function() {
		game.state.start('Load');
	}
};