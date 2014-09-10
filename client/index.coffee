circuits = require 'circuit-boards'

main = ->
  page = new Page
  page.setup()

class Page
  constructor: ->
    @regenerateBtn = $ '#regenerate'
    @randomBtn = $ '#random'
    @setAsBackgroundBtn = $ '#set-as-background'
    @values = $ '#values'
    @canvas = document.getElementById 'tile'
    @isBackgroundSet = false
    @stopDraw = null

  setup: ->
    @regenerateBtn.click => @onRegenerateClick()
    @randomBtn.click => @onRandomClick()
    @setAsBackgroundBtn.click => @onSetAsBackgroundClick()
    @generateNewBoard()

  onRegenerateClick: ->
    if @stopDraw
      @stopDraw => @generateNewBoard()
    else
      @generateNewBoard()
    return

  onRandomClick: ->
    styles = Object.keys circuits.styles
    style = styles[Math.floor Math.random() * styles.length]
    @values.val JSON.stringify {style: style}, null, 4
    @onRegenerateClick()

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
