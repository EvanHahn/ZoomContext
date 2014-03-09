ZoomContext = require '../zoomcanvas'
expect = require('chai').expect
sinon = require 'sinon'

describe 'ZoomContext', ->

  canvas = null
  context = null
  beforeEach ->
    canvas = { width: 400, height: 300 }
    context = { canvas }

  describe 'relationship to real context', ->

    it 'is maintained', ->
      zoom = new ZoomContext(context)
      expect(zoom.realContext).to.equal context

    properties = ['imageSmoothingEnabled', 'fillStyle', 'strokeStyle', 'textBaseline', 'textAlign', 'font', 'currentPath', 'lineDashOffset', 'shadowColor', 'shadowBlur', 'shadowOffsetY', 'shadowOffsetX', 'miterLimit', 'lineJoin', 'lineCap', 'lineWidth', 'globalCompositeOperation', 'globalAlpha']

    for property in properties

      it "keeps the #{property} property in sync", ->
        context[property] = 123
        zoom = new ZoomContext(context)
        expect(zoom[property]).to.equal 123
        zoom[property] = 456
        expect(context[property]).to.equal 456
        expect(zoom[property]).to.equal 456

    it "doesn't let you set the `canvas` property", ->
      zoom = new ZoomContext(context)
      expect(zoom.canvas).to.equal canvas
      zoom.canvas = 123
      expect(zoom.canvas).to.equal canvas

  describe 'pan properties', ->

    it 'starts off with a center and zoom', ->
      zoom = new ZoomContext(context)
      expect(zoom.center.x).to.equal(canvas.width / 2)
      expect(zoom.center.y).to.equal(canvas.height / 2)
      expect(zoom.zoom).to.equal 1
