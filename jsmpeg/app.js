const express = require('express')
const app = require('express')()
const server = require('http').Server(app)

app.use(express.static('public'));

server.listen(8092, () => {
    console.log('server listening on 8092')
})

Stream = require('node-rtsp-stream')
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://admin:makesense2019@10.151.116.116:554',
  //streamUrl: 'rtsp://10.151.3.74:7777/vlc',
  wsPort: 9999,
  width: 1920,
  height: 1080,
  ffmpegOptions: { // options ffmpeg flags
    //'-rtsp_transport': 'tcp',
    //'-preset':'fast',
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 24, // options with required values specify the value after the key
    //'thread_queue_size': 512
    }
})

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
