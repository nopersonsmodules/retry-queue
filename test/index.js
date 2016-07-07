var tape = require('tape')

var Queue = require('../')


tape('sync queue', function (t) {
  var written = []

  var enqueue = Queue(function (ary, cb) {
    console.log("WRITE", ary)
    if(Math.random() < 0.5) {
      console.log('write failed')
      return cb(new Error('oops'))
    }
    cb()
    written = written.concat(ary)

    if(written.length == 10) t.end()
  }, 10, 100)


  for(var i = 0; i < 10; i++)
    enqueue(i)

})



tape('async queue', function (t) {
  var written = []

  var enqueue = Queue(function (ary, cb) {
    setTimeout(function () {
      console.log("WRITE", ary)
      if(Math.random() < 0.5) {
        console.log('write failed')
        return cb(new Error('oops'))
      }
      cb()
      written = written.concat(ary)

      if(written.length == 10) t.end()
    }, 100)
  }, 10, 100)


  for(var i = 0; i < 10; i++)
    enqueue(i)

})


