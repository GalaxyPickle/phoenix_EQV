// state Load
//	load all main assets for game and decode music, etc.

// written by: ___________

var Load = function(game) {
	// variables
};
Load.prototype = {
	preload: function() {

	},
	create: function() {
		game.state.start('Title');
	}
}