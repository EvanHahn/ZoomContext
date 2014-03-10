describe('ZoomContext', function() {

  var canvas, context, zoom;
  beforeEach(function() {
    canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    context = canvas.getContext('2d');
    zoom = new ZoomContext(context);
  });

  describe('properties', function() {

    it('starts off with a center and zoom', function() {
      expect(zoom.center.x).toEqual(canvas.width / 2);
      expect(zoom.center.y).toEqual(canvas.height / 2);
      expect(zoom.zoom).toEqual(1);
    });

    it('contains the proper `realContext`', function() {
      expect(zoom.realContext).toBe(context);
    });

    var properties = ['fillStyle', 'strokeStyle', 'textBaseline', 'textAlign', 'font', 'currentPath', 'lineDashOffset', 'shadowColor', 'shadowBlur', 'shadowOffsetY', 'shadowOffsetX', 'miterLimit', 'lineJoin', 'lineCap', 'lineWidth', 'globalCompositeOperation', 'globalAlpha'];

    for (var i = 0; i < properties.length; i ++) {
      property = properties[i];
      it('keeps the ' + property + ' property', function() {
        var original = context[property];
        expect(zoom[property]).toEqual(original);
      });
    }

    it("doesn't let you set the `canvas` property", function() {
      expect(zoom.canvas).toBe(canvas);
      zoom.canvas = 123;
      expect(zoom.canvas).toBe(canvas);
    });

  });

  describe('#realSize', function() {
    it('scales values based on zoom', function() {
      zoom.zoom = 1;
      expect(zoom.realSize(12)).toEqual(12);
      zoom.zoom = 35;
      expect(zoom.realSize(12)).toEqual(420);
      zoom.zoom = 0.0555;
      expect(zoom.realSize(12)).toEqual(0.666);
    });
  });

});
