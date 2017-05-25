// prefab Phoejay (Player)
//  has all its properties and button pressings

// written by: _________

function Phoejay(game, key, frame, x, y, hitbox_size=100/3) {
	// call to Pahser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);

}

Phoejay.prototype = Object.create(Phaser.Sprite.prototype);
Phoejay.prototype.constructor = Phoejay;

Phoejay.prototype.create = function(Phoejay) {
}
Phoejay.prototype.update = function(Phoejay) {


	////////////////////////////////////////////////////////////////
}
