expect = require('chai').expect
ZoomContext = require '../zoomcanvas'

describe 'ZoomContext', ->

  describe 'relationship to real context', ->

    it 'exists', ->
      real = {}
      zoom = new ZoomContext(real)
      expect(zoom.realContext).to.equal real

  describe 'properties', ->

    properties = ['imageSmoothingEnabled', 'fillStyle', 'strokeStyle', 'textBaseline', 'textAlign', 'font', 'currentPath', 'lineDashOffset', 'shadowColor', 'shadowBlur', 'shadowOffsetY', 'shadowOffsetX', 'miterLimit', 'lineJoin', 'lineCap', 'lineWidth', 'globalCompositeOperation', 'globalAlpha']

    for property in properties

      it "keeps the #{property} property in sync", ->
        real = {}
        real[property] = 123
        zoom = new ZoomContext(real)
        expect(zoom[property]).to.equal 123
        zoom[property] = 456
        expect(real[property]).to.equal 456
        expect(zoom[property]).to.equal 456

    it "doesn't let you set the canvas property", ->
      canvas = {}
      real = { canvas }
      zoom = new ZoomContext(real)
      expect(zoom.canvas).to.equal canvas
      zoom.canvas = 123
      expect(zoom.canvas).to.equal canvas
