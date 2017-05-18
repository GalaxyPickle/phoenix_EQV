// state Play.js
//	has the main play core loop

var player;
var sprite1;
var tile;
var cursors;
var feathers;
var turnspeed = 0.6;
var boost = 9999.0;
var jetpack = 20;
var jetpackmax = 20;
var birdWeight = 2;
var grounded = false;
var stamina;
var map;
var layer;
var tiles;
var jump;
var lasty;
var bubbles = new Array();

var Play = function(game) {
	// variables 
};
Play.prototype = {
	preload: function() {
		// bg
		game.load.image('sky', 'assets/img/bg/fff.jpg');

		
		game.load.image('bird', 'assets/img/entity/phoenix/phoejay_s.png');
		game.load.spritesheet('bubbles', '', 2, 2);
		game.load.image('stamina', '');
		game.load.spritesheet('ship', 'assets/img/particles/ship.png', 24, 32);

		game.load.tilemap('map', 'json/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('kenney', 'assets/img/meta/kenney.png');
	},
	create: function() {

		sky = game.add.sprite(0, 0, 'sky');
		sky.height = game.height;
		sky.width = game.width;
		sky.fixedToCamera = true;

		game.physics.startSystem(Phaser.Physics.NINJA);

		sprite1 = game.add.sprite(600, 100, 'bird');
		sprite1.name = 'phoenix';

		game.physics.ninja.enableCircle(sprite1, sprite1.width / 2);
		sprite1.body.bounce = 0;
		sprite1.body.friction = 0.03;
		sprite1.body.gravityScale = birdWeight;

		cursors = game.input.keyboard.createCursorKeys();

		stamina = game.add.sprite(0, 0, 'stamina');
		stamina.height = 2;
		stamina.width = game.width;
		stamina.fixedToCamera = true;

		//init player
		player = game.add.group();

		game.camera.follow(sprite1);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);

		map = game.add.tilemap('map');
		map.addTilesetImage('kenney');
		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();
		var slopeMap = { '32': 1, '77': 1, '95': 2, '36': 3, '137': 3, '140': 2 };
		tiles = game.physics.ninja.convertTilemap(map, layer, slopeMap);

		//spawn bubbles
		// for (var i = 0; i < Math.floor(game.world.width/50); i++) {
		// 	bubbles[i] = new Bubbles(game, 'ship');
		// 	game.add.existing(bubbles[i]);
		// }   
	},
	update: function() {

		grounded = false;

		for (var i = 0; i < tiles.length; i++)
		if (sprite1.body.circle.collideCircleVsTile(tiles[i].tile))
		if (!sprite1.body.touching.up) grounded = true;

		if (sprite1.body.touching.down) grounded = true;

		stamina.width = game.width*jetpack*.05;
		if (grounded) { //sprite1.body.touching.down
		jetpack = jetpackmax;
		jump = 0;
		}

		game.physics.ninja.collide(sprite1, tile);

		if (cursors.left.isDown) {
		sprite1.body.moveLeft(30);
		} else if (cursors.right.isDown) {
		sprite1.body.moveRight(30);
		}

		if ((grounded || sprite1.body.touching.downleft || sprite1.body.touching.downright) && cursors.up.isDown) { //first jump
		sprite1.body.moveUp(150);
		jump = 1;
		}

		if (jump == 1 && cursors.up.isDown) { //first jump shorthop
		if (jetpack > 0) {
		sprite1.body.moveUp(jetpack*4);
		jetpack -= 1;
		}
		}

		if (jump == 1 && !cursors.up.isDown) {
		jump = 2; 
		}

		if ((jump == 0 || jump == 2) && !grounded && cursors.up.isDown) { //first jump post-jump
		sprite1.body.moveUp(birdWeight*500);
		jump = 3;
		}

		if (jump == 3 && cursors.up.isDown) {
		if (sprite1.body.y > lasty) sprite1.body.moveUp(birdWeight*10.2);
		}

		lasty = sprite1.body.y;
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