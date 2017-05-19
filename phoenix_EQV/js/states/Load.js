// state Load
//	load all main assets for game and decode music, etc.

// written by: ___________

var Load = function(game) {
	// variables
};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// load path to assets

		// load all the image assets for the game

		// load all the audio assets for the game

	},
	create: function() {
		console.log('Load: create');

		// add the bg

		// display the loading txt

		// add the preloader bar and set it
		
		// go to the main splash screen
		game.state.start('Title');
	}
}