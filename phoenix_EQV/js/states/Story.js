// state Story
// little animation to introduce story to the players; placed between title screen and play state

// written by: ___________
var Story = function(game) {
	//variables for state
	var story1 = null;
	var pressSpace = null;
	var birdy = null;
};
Story.prototype = {
	preload: function() {
		console.log('Story: preload');

		// ready the path to load img assets for Load state
		game.load.path = 'assets/img/';
		// fade-in sprite
		game.load.image('fade-in', 'meta/fade_in.png');
		small_style = {fontSize: '20px', fill: '#333', font: 'Meta'};

		// bgs
		game.load.image('bg', 'bg/background.png');
		game.load.image('bg_tree', 'bg/trees.png');

		// make the canvas look better?
		game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);
		// don't allow losing browser to halt game
		game.stage.disableVisibilityChange = true;
	},
	create: function() {
		console.log('Story: create');
		//add background stuff
		this.bg = game.add.tileSprite(0, 0, 3000, 3000, 'bg');
		this.bg_tree = game.add.tileSprite(0, 0, 1989, 2386, 'bg_tree');
		let grass = game.add.image(0, game.world.height - 100, 'grass');
		//add images needed for animation
		let ashes = game.add.sprite(50, game.world.height - 140, 'ashes');
		ashes.alpha = 0;
		game.add.tween(ashes).to( { alpha: 1 }, 2000, "Linear", true, 0);
		let light_ray = game.add.sprite(190, game.world.height - 900, 'light_ray');
		light_ray.anchor.setTo(0.5, 0.5);
		let revival = game.add.sprite(100, game.world.height - 340, 'revival');
		revival.animations.add('revival_animate', [0,1,2,3], 15, true);
		//hide revival animation for later
		revival.visible = false;
		game.physics.enable(light_ray, Phaser.Physics.ARCADE);
		light_ray.body.velocity.y = 180;
		
		//timer to change first text
		let timer01 = game.time.create(false);
		let timedEvent01 = timer01.add(Phaser.Timer.SECOND * 7, updateText, game);
		timer01.start();
		//timer to change second text
		let timer02 = game.time.create(false);
		let timedEvent02 = timer01.add(Phaser.Timer.SECOND * 16, updateText2, game);
		timer02.start();
		//timer to change third text
		let timer03 = game.time.create(false);
		let timedEvent03 = timer01.add(Phaser.Timer.SECOND * 23, updateText3, game);
		timer03.start();
		//timer for the ray of light and revival fire
		let timer04 = game.time.create(false);
		let timedEvent04 = timer01.add(Phaser.Timer.SECOND * 4, fireStart, game);
		timer03.start();
		//time to go to game
		let timer05 = game.time.create(false);
		let timedEvent05 = timer01.add(Phaser.Timer.SECOND * 27, startGame, game);
		timer03.start();

		//add text for story
		story1 = game.add.text(game.world.centerX, game.world.centerY,
			"Into a tired land: the phoenix Phoejay is reborn after one long millenium.", 
			small_style);

		story1.anchor.setTo(0.5, 0.5);
		//make it fade in
		story1.alpha = 0;
		game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
		//text for if the player chooses to skip story
		pressSpace = game.add.text(game.world.centerX, game.world.height - 30, "Press SPACE to skip", small_style);
		pressSpace.anchor.setTo(0.5, 0.5);
		//fade in and out
		pressSpace.alpha = 0.5;
		game.add.tween(pressSpace).to( { alpha: 1 }, 1000, "Linear", true, 0, -1, true); 
		
		//function for first part of animation
		function fireStart(){
			light_ray.destroy();
			revival.visible = true;
			revival.animations.play('revival_animate');
		}
		
		function updateText(){
			//story1.alpha = 0;
			//game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 4000);
			story1.destroy();
			//phoejay revealed
			birdy = game.add.sprite(200, game.world.height - 100, 'phoejay');
			birdy.animations.add('phoejay_mov', [0,2,3,4,5, 6], 10, true);
			game.physics.enable(birdy, Phaser.Physics.ARCADE);
			birdy.scale.x = birdy.scale.x * -1;
			birdy.alpha = 0;
			game.add.tween(birdy).to( { alpha: 1 }, 2000, "Linear", true, 0);
			revival.destroy();
			ashes.destroy();
			story1 = game.add.text(game.world.centerX, game.world.centerY, 
				"            This ancient forest is familiar, and yet foreign." + 
				"\nParts of the land are the same, but something has changed....", small_style);
			story1.alpha = 0;
			game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
			story1.anchor.setTo(0.5, 0.5);
		}
		function updateText2(){

			story1.destroy();
			story1 = game.add.text(game.world.centerX, game.world.centerY, 
				"Phoejay feels an immense pain radiating from the very forest itself." + 
				"\n                    Something, something is terribly wrong.", 
				small_style);
			story1.anchor.setTo(0.5, 0.5);
			story1.alpha = 0;
			game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
		}
		function updateText3(){
			story1.destroy();
			story1 = game.add.text(game.world.centerX, game.world.centerY, "And the Phoenix begins to explore...", small_style);
			story1.anchor.setTo(0.5, 0.5);
			story1.alpha = 0;
			game.add.tween(story1).to( { alpha: 1 }, 2000, "Linear", true, 0);
			birdy.animations.play('phoejay_mov');
			birdy.body.velocity.x = 320;
		}
		function startGame(){
			game.state.start('Play');
		}
	},
	update: function() {
		//if space pressed skip to play state
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
		}
	}, 
}