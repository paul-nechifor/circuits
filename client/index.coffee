circuits = require 'circuit-boards'

main = ->
  page = new Page
  page.setup()

class Page
  constructor: ->
    @regenerateBtn = $ '#regenerate'
    @setAsBackgroundBtn = $ '#set-as-background'
    @values = $ '#values'
    @canvas = document.getElementById 'tile'
    @isBackgroundSet = false
    @stopDraw = null

  setup: ->
    @regenerateBtn.click => @onRegenerateClick()
    @setAsBackgroundBtn.click => @onSetAsBackgroundClick()
    @generateNewBoard()

  onRegenerateClick: ->
    if @stopDraw
      @stopDraw => @generateNewBoard()
    else
      @generateNewBoard()

  onSetAsBackgroundClick: ->
    @isBackgroundSet = not @isBackgroundSet
    if @isBackgroundSet
      $('body').addClass 'circuit'
      document.body.style.backgroundImage = 'url(' +
          @canvas.toDataURL('image/png') + ')'
      x = 0
      move = =>
        return unless @isBackgroundSet
        x += 2
        document.body.style.backgroundPositionX = x + 'px'
        setTimeout move, 20
      move()
    else
      $('body').removeClass 'circuit'
      document.body.style.backgroundImage = 'none'
    return

  generateNewBoard: ->
    values = JSON.parse @values.val()
    @stopDraw = circuits.draw @canvas, values, =>
      @stopDraw = null

$(document).ready main
