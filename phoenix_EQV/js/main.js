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

// wait for browser window load, then start the GAME
window.onload = function() {

	game = new Phaser.Game(1280, 720);

	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Title', Title);
	game.state.add('Play', Play);

	game.state.start('Boot');
}