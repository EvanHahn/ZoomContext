(function() {

  function ZoomContext(realContext) {

    this.realContext = realContext;

  }

  if (typeof module !== 'undefined')
    module.exports = ZoomContext;
  else
    this.ZoomContext = ZoomContext;

})();
