expect = require('chai').expect
ZoomContext = require '../zoomcanvas'

describe 'ZoomContext', ->

  describe 'relationship to real context', ->

    it 'exists', ->
      realContext = {}
      zoomContext = new ZoomContext(realContext)
      expect(zoomContext.realContext).to.equal realContext

  describe 'properties', ->
