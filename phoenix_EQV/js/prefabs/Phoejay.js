// prefab Phoejay (Player)
//  has all its properties and button pressings

// written by: _________

function Phoejay(game, key, frame, x, y, hitbox_size=100/3) {
	// call to Pahser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// set sprite properties
	game.physics.ninja.enableCircle(this, hitbox_size);
	this.body.bounce = 0;
	this.body.friction = 0.03;
	this.scale.x = 1;
	this.scale.y = 1;

	// set CUSTOM properties
	this.cursors = game.input.keyboard.createCursorKeys();

	this.turnspeed = 0.6;               //                 ,dPYb,         
	this.boost = 9999.0;                //                 IP'`Yb         
	this.jetpack = 20;                  //                 I8  8I                              gg 
	this.jetpackmax = 20;               //                 I8  8'                              ""     
	this.grounded = false;              //     gg,gggg,    I8 dPgg,     ,ggggg,    ,ggg,       gg    ,gggg,gg  gg     gg 
	this.jumpswitch = false;            //     I8P"  "Yb   I8dP" "8I   dP"  "Y8gggi8" "8i      8I   dP"  "Y8I  I8     8I 
	this.jump = null;                   //     I8'    ,8i  I8P    I8  i8'    ,8I  I8, ,8I     ,8I  i8'    ,8I  I8,   ,8I 
	this.run = false;                   //    ,I8 _  ,d8' ,d8     I8,,d8,   ,d8'  `YbadP'   _,d8I ,d8,   ,d8b,,d8b, ,d8I 
	this.birdWeight = 2;                //    PI8 YY88888P88P     `Y8P"Y8888P"   888P"Y888888P"888P"Y8888P"`Y8P""Y88P"888
	this.glide = 2.8;                   //     I8                                            ,d8I'                  ,d8I'
                                        //     I8                                          ,dP'8I                 ,dP'8I 
	// add this bad boy to the game!           I8                                         ,8"  8I                ,8"  8I 
	game.add.existing(this);            //     I8                                         I8   8I                I8   8I 
                                        //     I8                                         `8, ,8I                `8, ,8I 
                                        //     I8                                          `Y8P"                  `Y8P"  
}

Phoejay.prototype = Object.create(Phaser.Sprite.prototype);
Phoejay.prototype.constructor = Phoejay;

Phoejay.prototype.create = function(Phoejay) {
	this.anchor.setTo(.5,.5);
	this.animations.add('idle', [0], 1,  false); //                       __     __
	this.animations.add('run', [1, 2], 12,true); //                      /  \~~~/  |
	this.animations.add('jump1', [3], 1, false); //                ,----(     ..    )
	this.animations.add('jump2', [4], 1, false); //               /      \__     __/
	this.animations.add('glide', [5], 1, false); //              /|         (\  |(
}                                                //             ^ \   /___\  /\ |
Phoejay.prototype.update = function(Phoejay) {   //                |__|   |__| -"

	this.body.touching.down&&(this.grounded=!0);
	var dir=this.cursors.right.isDown-this.cursors.left.isDown;                                 this.jumpswitch=!this.jumpswitch&&this.cursors.up.isDown,
	this.body.gravityScale=this.birdWeight, /* (\(\      */  this.grounded&&(this.jetpack=this.jetpackmax,this.jump=0,dir||this.animations.play("idle")),
	dir&&(this.scale.x=-dir,               /*  ( -.-)    */                                    this.grounded&&!this.running?(this.animations.play("run"),
	this.running=!0):this.running=!1,     /*   O_(")(")  */                                 dir<0?this.body.moveLeft(30):dir>0&&this.body.moveRight(30)),
	this.jump>2&&(this.cursors.up.isDown?(this.body.y>this.body.shape.oldpos.y&&(this.body.gravityScale=0,this.body.shape.oldpos.y=this.body.shape.pos.y,
	this.body.moveDown(20*this.glide)),                                                    this.animations.play("glide")):this.animations.play("jump2")),
	(this.grounded||this.body.touching.downleft||this.body.touching.downright)                    &&this.jumpswitch&&(this.body.moveUp(150),this.jump=1),
	1==this.jump&&this.cursors.up.isDown&&(this.jetpack>0&&(this.body.moveUp(4*this.jetpack), /*    (\ __/)      */                     this.jetpack-=1),
	this.animations.play("jump1")),1!=this.jump||this.cursors.up.isDown||(this.jump=2),       /*    (=`.`=)     */
	0!=this.jump&&2!=this.jump||this.grounded||!this.cursors.up.isDown||                      /*    (") (")    */ (this.body.moveUp(500*this.birdWeight),
	this.jump=3),this.jumpswitch=this.cursors.up.isDown;
}
















// EOF //