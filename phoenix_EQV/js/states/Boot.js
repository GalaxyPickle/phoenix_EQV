// state Boot
//	show loading bar

// written by: ___________

var Boot = function(game) {
	// variables
};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');

		// ready the path to load img assets
		game.load.path = 'assets/img/';
		// load the loading bar sprite and BG
		game.load.image('bar', 'meta/bar.png');
		game.load.image('bg', 'bg/bg@1x.png')
	},
	create: function() {
		console.log('Boot: create');

		// start the loading screen
		game.state.start('Load');
	}
};