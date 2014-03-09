var box = {
	x: 200,
	y: 200,
	draw: function(zctx) {
		zctx.fillStyle = '#000';
		zctx.fillRect(this.x, this.y, 50, 50);
	}
}

var player = {
	x: 100,
	y: 100,
	draw: function(zctx) {
		zctx.fillStyle = '#f00';
		zctx.fillRect(this.x, this.y, 20, 20);
	}
};

window.addEventListener('keydown', function(event) {
	if (event.keyCode == 37)
		player.x -= 10;
	else if (event.keyCode == 39)
		player.x += 10;
	else if (event.keyCode == 38)
		player.y -= 10;
	else if (event.keyCode == 40)
		player.y += 10;
});

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var zctx = new ZoomContext(ctx);

(function tick() {

	zctx.clear();

	zctx.keepInView({
		coordinates: [
			{ x: player.x, y: player.y }
		],
		padding: 10
	});

	player.draw(zctx);
	box.draw(zctx);

	requestAnimationFrame(tick);

})();
