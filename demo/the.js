var player = {

	x: 300,
	y: 400,

	draw: function(zctx) {


	}

};

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var zctx = new ZoomContext(ctx);

(function tick() {

	player.draw(zctx);

	requestAnimationFrame(tick);

})();
