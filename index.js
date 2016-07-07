
function delay(errors, interval, max) {
  return Math.min((Math.pow(2, errors)*interval) - interval, max)
}

module.exports = function (send, interval, max) {

  var queue = [], errors = 0, sending = false

  interval = interval || 1000
  max = max || 1000*60*60 //retry every hour

  return function (value) {
    queue.push(value)

    ;(function next () {
      if(sending || !queue.length) return
      var _queue = queue
      queue = []
      sending = true

      send(_queue, function (err) {

        sending = false
        //if push failed, restore data to push.
        if(err) {
          errors ++
          queue = _queue.concat(queue)
        }
        else
          errors = 0

        if(queue.length)
          setTimeout(next, delay(errors, interval, max))
      })

    })()
  }
}


