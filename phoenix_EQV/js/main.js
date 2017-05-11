//////////////////////////////////////////////////////////
//														//
//					Team Augment BOW					//
//	Calvin Walantus										//
//	Vienna Chan											//
//	Alex Lang											//
//	Shuoen Li											//
//	Joey Sandmeyer										//
//														//
//				----Phoenix Equinox V----				//
//														//
//						main.js							//
//														//
//////////////////////////////////////////////////////////


var game = new Phaser.Game(800, 600, Phaser.AUTO);

//define various states and their methods
var Preloader = function(game) {};
Preloader.prototype = {
  preload: function() {},
  create: function() {
    game.state.start('MainMenu');
  }
}
var MainMenu = function(game) {};
MainMenu.prototype = {
  create: function() {
    game.state.start('Game');
  },
  update: function() {}
}

var player;
var sprite1;
var tile;
var cursors;
var origin;
var shift;
var feathers;
var turnspeed = 0.6;
var boost = 9999.0;
var jetpack = 100;
var jetpackmax = 100;
var stamina;
var map;
var layer;
var tiles;

var Game = function(game) {};
Game.prototype = {
  preload: function() {
	game.load.image('sky', 'assets/img/bg/fff.jpg');
    game.load.image('bird', 'assets/img/entity/phoenix/phoejay_s.png');
    game.load.image('mouse', '');
    game.load.spritesheet('bubbles', '', 2, 2);
    game.load.image('stamina', '')
	
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

    cursors = game.input.keyboard.createCursorKeys();

    game.input.mouse.capture = true;

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

    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {

    for (var i = 0; i < tiles.length; i++)
    {
        sprite1.body.circle.collideCircleVsTile(tiles[i].tile);
    }
  
    stamina.width = game.width*jetpack*.01;
    if (sprite1.body.touching.down) jetpack = jetpackmax;

    var mouseleft = game.input.activePointer.leftButton.isDown;
    var mouseright = game.input.activePointer.rightButton.isDown;
    var mousemiddle = game.input.activePointer.middleButton.isDown;

    sprite1.turnspeed = 5;

    if (!mouseleft) origin = 0;
    else origin += game.input.mousePointer.worldX - shift;

    game.physics.ninja.collide(sprite1, tile);

    if (cursors.left.isDown) {
      sprite1.body.moveLeft(30);
    } else if (cursors.right.isDown) {
      sprite1.body.moveRight(30);
    }

    if (origin < 0) {
      sprite1.body.moveLeft(-origin * turnspeed);
      origin += 2;
    } else if ((origin > 0)) {
      sprite1.body.moveRight(origin * turnspeed);
      origin += -2;
    }

    if (cursors.up.isDown) {
      if (jetpack > 0) {
        sprite1.body.moveUp(30);
        jetpack -= 1;
      }
      else sprite1.body.moveUp(11);
    }

    if (mouseleft) {
      if (jetpack > 0) {
        if (sprite1.y > game.input.mousePointer.worldY) {
            jetpack -= 1;
            sprite1.body.moveUp(30);
        }
      }
      else sprite1.body.moveUp(11);
    }

    shift = game.input.mousePointer.worldX;
  },
  render: function() {

    game.debug.text("Left Button: " + game.input.activePointer.leftButton.isDown, 300, 132);
    game.debug.text("Middle Button: " + game.input.activePointer.middleButton.isDown, 300, 196);
    game.debug.text("Right Button: " + game.input.activePointer.rightButton.isDown, 300, 260);

  }
}

//http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor1(color, percent) { // deprecated. See below.
  var num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.start('Preloader');
game.state.add('Game', Game);
game.state.start('Preloader');