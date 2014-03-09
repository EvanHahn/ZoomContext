(function() {

  function ZoomContext(real) {

    var me = this;

    this.realContext = real;

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
