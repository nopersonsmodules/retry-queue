# retry-queue

write batches that may fail.

## example

``` js
var RetryQueue = require('retry-queue')

var write = RetryQueue(function (batch, cb) {
  // write log data to the server,
  // but if we are disconnected,
  // retry after a delay.
  sendBatchToServer(batch, cb)
})

write({ts: Date.now(), value: 'blah blah blah'})

```

Writes will be applied in order.
Only one write will be attempted at a time.
If more data has been written while a write is in progress
It will be attempted immediately if the current write succeeds.
If the current write fails, it will be reattempted after
an exponentially increasing delay.

If there is no write in progress when a new write is made,
then the write will be attempted immediatly, including any
outstanding data from a previously failed write.


## License

MIT
