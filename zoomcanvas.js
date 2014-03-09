(function() {

  function ZoomContext(real) {

    var me = this;

    this.realContext = real;

    this.zoom = 1;
    this.center = {
      x: real.canvas.width / 2,
      y: real.canvas.height / 2
    };

    Object.defineProperty(this, 'canvas', {
      value: real.canvas,
      enumerable: true,
      writable: false
    });

    Object.keys(real).forEach(function(property) {

      if (property === 'canvas')
        return;

      Object.defineProperty(me, property, {
        enumerable: true,
        get: function() {
          return real[property];
        },
        set: function(value) {
          return (real[property] = value);
        }
      });

    });

  }

  if (typeof module !== 'undefined')
    module.exports = ZoomContext;
  else
    this.ZoomContext = ZoomContext;

})();
