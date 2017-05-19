// state Load
//	load all main assets for game and decode music, etc.

// written by: ___________

var Load = function(game) {
	// variables
};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

	},
	create: function() {
		console.log('Load: create');
		
		game.state.start('Title');
	}
}