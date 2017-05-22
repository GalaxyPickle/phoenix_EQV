	// state Play
//	has the player core loop

// written by: ____________

var Play = function(game) {
	// variables
	player = null;

	tile = null;
	map = null;
	layer = null;
	tiles = null;
	divCounter = 0;
	deer = null;
	fox = null;
	burrel = null;
	stamina = null;

	bubbles = new Array();
};
Play.prototype = {
	preload: function() {
		console.log('Play: preload');

		// load images path
		game.load.path = 'assets/img/';

		// bg
		game.load.image('bg', 'bg/bg@1x.png');

		// moving things
		game.load.image('bird', 'entity/phoenix/phoejay2.png');

		// tilemap stuff 
		game.load.image('kenney', 'meta/kenney.png');

		// load tilemap
		game.load.path = 'json/';
		game.load.tilemap('map', 'ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create: function() {
		console.log('Play: create');

		// set background and make PARALLAXING (WIP)
		bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
		bg.fixedToCamera = true;

		// start ninja physics
		game.physics.startSystem(Phaser.Physics.NINJA);

		/////////////////////////////////////////////////
		// this needs to be refactored into a GUI class
		stamina = game.add.sprite(0, 0, 'stamina');
		stamina.height = 2;
		stamina.width = game.width;
		stamina.fixedToCamera = true;
		/////////////////////////////////////////////////

		map = game.add.tilemap('map');
		map.addTilesetImage('kenney');

		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();
		var slopeMap = { '32': 1, '77': 1, '95': 2, '36': 3, '137': 3, '140': 2 };
		tiles = game.physics.ninja.convertTilemap(map, layer, slopeMap);
		//insert deer here
		deer = new DeadAnimal(game, 'deer', 10, x, y, 5);
		//need to add deer asset still
		fox = new DeadAnimal(game, 'fox', 10, x, y, 6);
		burrel = new DeadAnimal(game, 'burrel', 10, x, y, 7);

		/////////////////////////////////////////////////
		/////////// ----- behold, the power of prefab 
		/////////////////////////////////////////////////
		player = new Phoejay(game, 'bird', 200, 100);
		//player.name = 'phoenix';

		game.camera.follow(player);
		game.camera.deadzone = new Phaser.Rectangle(
			game.width / 3, game.height / 3, game.width / 3, game.height / 3);

		//spawn bubbles
		// for (var i = 0; i < Math.floor(game.world.width/50); i++) {
		// 	bubbles[i] = new Bubbles(game, 'ship');
		// 	game.add.existing(bubbles[i]);
		// }   
	},
	update: function() {

		//bg.tilePosition.x -= 0.5;

		for (var i = 0; i < tiles.length; i++)
			player.body.circle.collideCircleVsTile(tiles[i].tile)

		game.physics.ninja.collide(player, tile);

		stamina.width = game.width * player.jetpack * 0.05;
	},
	render: function() {

	}
}

//http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// function shadeColor1(color, percent) { // deprecated. See below.
//   var num = parseInt(color.slice(1), 16),
//     amt = Math.round(2.55 * percent),
//     R = (num >> 16) + amt,
//     G = (num >> 8 & 0x00FF) + amt,
//     B = (num & 0x0000FF) + amt;
//   return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
// }
