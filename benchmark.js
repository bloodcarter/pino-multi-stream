'use strict'

var bench = require('fastbench')
var bunyan = require('bunyan')
var pinoms = require('./')
var fs = require('fs')
var dest = fs.createWriteStream('/dev/null')

var tenStreams = [
  {stream: dest},
  {stream: dest},
  {stream: dest},
  {stream: dest},
  {stream: dest},
  {level: 'debug', stream: dest},
  {level: 'debug', stream: dest},
  {level: 'trace', stream: dest},
  {level: 'warn', stream: dest},
  {level: 'fatal', stream: dest}
]
var pinomsTen = pinoms({streams: tenStreams})

var fourStreams = [
  {stream: dest},
  {stream: dest},
  {level: 'debug', stream: dest},
  {level: 'trace', stream: dest}
]
var pinomsFour = pinoms({streams: fourStreams})

var pinomsOne = pinoms({streams: [{stream: dest}]})
var blogOne = bunyan.createLogger({
  name: 'myapp',
  streams: [{stream: dest}]
})

var blogTen = bunyan.createLogger({
  name: 'myapp',
  streams: tenStreams
})
var blogFour = bunyan.createLogger({
  name: 'myapp',
  streams: fourStreams
})

var max = 10
var run = bench([
  function benchBunyanTen (cb) {
    for (var i = 0; i < max; i++) {
      blogTen.info('hello world')
      blogTen.debug('hello world')
      blogTen.trace('hello world')
      blogTen.warn('hello world')
      blogTen.fatal('hello world')
    }
    setImmediate(cb)
  },
  function benchPinoMSTen (cb) {
    for (var i = 0; i < max; i++) {
      pinomsTen.info('hello world')
      pinomsTen.debug('hello world')
      pinomsTen.trace('hello world')
      pinomsTen.warn('hello world')
      pinomsTen.fatal('hello world')
    }
    setImmediate(cb)
  },
  function benchBunyanFour (cb) {
    for (var i = 0; i < max; i++) {
      blogFour.info('hello world')
      blogFour.debug('hello world')
      blogFour.trace('hello world')
    }
    setImmediate(cb)
  },
  function benchPinoMSFour (cb) {
    for (var i = 0; i < max; i++) {
      pinomsFour.info('hello world')
      pinomsFour.debug('hello world')
      pinomsFour.trace('hello world')
    }
    setImmediate(cb)
  },
  function benchBunyanOne (cb) {
    for (var i = 0; i < max; i++) {
      blogOne.info('hello world')
    }
    setImmediate(cb)
  },
  function benchPinoMSOne (cb) {
    for (var i = 0; i < max; i++) {
      pinomsOne.info('hello world')
    }
    setImmediate(cb)
  }
], 10000)

run()
