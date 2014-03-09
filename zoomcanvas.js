(function() {

  // utility methods
  // ===============

  function arrayMin(array) {
    return Math.min.apply(Math, array);
  }

  function arrayMax(array) {
    return Math.max.apply(Math, array);
  }

  // store all the real context properties and methods
  // =================================================

  var contextProperties;
  var contextMethods;
  (function() {
    var fakeCanvas = document.createElement('canvas');
    var fakeContext = fakeCanvas.getContext('2d');
    contextProperties = Object.keys(fakeContext);
    contextMethods = Object.keys(Object.getPrototypeOf(fakeContext));
  })();

  // the constructor
  // ===============

  function ZoomContext(real) {

    var me = this;

    this.realContext = real;

    this.width = real.canvas.width;
    this.height = real.canvas.height;

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

    contextProperties.forEach(function(property) {
      if (property !== 'canvas') {
        Object.defineProperty(me, property, {
          enumerable: true,
          get: function() {
            return real[property];
          },
          set: function(value) {
            return (real[property] = value);
          }
        });
      }
    });

  }

  // get the real values (mostly internal methods)
  // =============================================

  ZoomContext.prototype.realSize = function realSize(s) {
    return s; // TODO
  };

  ZoomContext.prototype.realX = function realX(x) {
    return x - this.center.x + (this.width / 2);
  };

  ZoomContext.prototype.realY = function realY(y) {
    return y - this.center.y + (this.height / 2);
  };

  ZoomContext.prototype.real = function real(thing, v) {
    if (thing === 'size')
      return this.realSize(v);
    else if (thing === 'x')
      return this.realX(v);
    else if (thing === 'y')
      return this.realY(v);
    else
      return v;
  };

  // zoom-related methods
  // ====================

  ZoomContext.prototype.keepInView = function keepInView(options) {
    var padding = options.padding || 0;
    var xs = options.coordinates.map(function(c) { return c.x; });
    var ys = options.coordinates.map(function(c) { return c.y; });
    var min = { x: arrayMin(xs) - padding, y: arrayMin(ys) + padding };
    var max = { x: arrayMax(xs) + padding, y: arrayMax(ys) + padding };
    this.center.x = (min.x + max.x) / 2;
    this.center.y = (min.y + max.y) / 2;
  };

  // define a bunch of the methods
  // =============================

  var updatedMethods = {
    fillRect: ['x', 'y', 'size', 'size']
  };

  Object.keys(updatedMethods).forEach(function(methodName) {

    var method = updatedMethods[methodName];

    var fn = function() {
      var args = arguments;
      for (var i = 0, len = method.length; i < len; i ++) {
        if (method[i])
          args[i] = this.real(method[i], arguments[i]);
      }
      this.realContext[methodName].apply(this.realContext, args);
    };
    fn.name = methodName;
    ZoomContext.prototype[methodName] = fn;

  });

  // for all undefined methods, defer to the real
  // ============================================

  contextMethods.forEach(function(method) {
    var deferToOriginal = !ZoomContext.prototype[method];
    if (deferToOriginal) {
      var fn = function() {
        this.realContext[method].apply(this.realContext, arguments);
      };
      fn.name = method;
      ZoomContext.prototype[method] = fn;
    }
  });

  // some other fun methods
  // ======================

  ZoomContext.prototype.clear = function clear() {
    this.realContext.clearRect(0, 0, this.width, this.height);
  };

  // export it all
  // =============

  if (typeof module !== 'undefined')
    module.exports = ZoomContext;
  else
    this.ZoomContext = ZoomContext;

})();
