// state Boot
//	show loading bar

// written by: ___________

var Boot = function(game) {
	// variables
};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');
		
	},
	create: function() {
		console.log('Boot: create');
		game.state.start('Load');
	}
};