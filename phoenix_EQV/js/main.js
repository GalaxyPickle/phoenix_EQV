//////////////////////////////////////////////////////////
//                                                      //
//                  Team Augment BOW                    //
//  Calvin Walantus                                     //
//  Vienna Chan                                         //
//  Alex Lang                                           //
//  Shuoen Li                                           //
//  Joey Sandmeyer                                      //
//                                                      //
//              ----Phoenix Equinox V----               //
//                                                      //
//                      main.js                         //
//                                                      //
//////////////////////////////////////////////////////////


// ONLY GLOBAL VAR, game
var game;
var W = 1280;
var H = 720;

var config = {
	width: W,
	height: H,
	renderer: Phaser.AUTO,
	antialias: false,
	multiTexture: false
}

// wait for browser window load, then start the GAME
window.onload = function() {
	game = new Phaser.Game(config);

	game.state.add('Boot', Boot);
	game.state.add('Title', Title);
	game.state.add('Load', Load);
	game.state.add('Story', Story);
	game.state.add('Play', Play);
	game.state.add('End', End);

	game.state.start('Boot');
}
