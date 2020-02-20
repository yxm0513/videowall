const express = require('express')
const app = require('express')()
const server = require('http').Server(app)

app.use(express.static('public'));

server.listen(8092, () => {
    console.log('server listening on 8094')
})

var rtsp = null;
try {
    rtsp = require('rtsp-live555');
} catch (e) {
    rtsp = require('./lib/rtsp-live555.js');
}
var _url = 'rtsp://admin:makesense2019@10.151.116.114:554';//test address
var stream = new rtsp.Live555Client({ input: _url });
stream.on('start', () => {
    console.log(_url + ' started');
});
 
stream.on('stop', () => {
    console.log(_url + ' stopped');
});
var _hasrecv = false;
stream.on('data', (data) => {
    //you can write your method here
    //data is flv stream
    if (!_hasrecv) {
        console.log('recv stream:', data.length);
        stream.stop();
        console.log('close stream:', _url);
        _hasrecv = true;
    }
});

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
