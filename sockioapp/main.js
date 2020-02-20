const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const eapp = require('express')()
const server = require('http').Server(eapp)
const io = require('socket.io')(server)
const rtsp = require('rtsp-ffmpeg')

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  //win.loadFile('index.html')
  win.loadURL('http://localhost:8090/');
  win.focus();
  win.webContents.openDevTools()
}

server.listen(8090, () => {
    console.log('server listening on 8090')
})


// uri 以海康摄像机的 rtsp 协议为例
let uri1 = 'rtsp://10.151.3.74:7777/vlc'
let stream1 = new rtsp.FFMpeg({
    input: uri1,
    resolution: '1090x1080',
    quality: 3
})

let uri2 = 'rtsp://admin:makesense2019@10.151.116.112:554'
let stream2 = new rtsp.FFMpeg({
    input: uri2,
    resolution: '1090x1080',
    quality: 3
})

let uri3 = 'rtsp://admin:makesense2019@10.151.116.116:554'
let stream3 = new rtsp.FFMpeg({
    input: uri3,
    resolution: '1090x1080',
    quality: 3
})

let uri4 = 'rtsp://10.151.3.74:7777/subway'
let stream4 = new rtsp.FFMpeg({
    input: uri4,
    resolution: '1090x1080',
    quality: 3
})


stream1.on('start', function () {
    console.log('stream1 start')
})

stream1.on('stop', function () {
    console.log('stream1 stop')
})

stream2.on('start', function () {
    console.log('stream2 start')
})

stream2.on('stop', function () {
    console.log('stream2 stop')
})
stream3.on('start', function () {
    console.log('stream3 start')
})

stream3.on('stop', function () {
    console.log('stream3 stop')
})
stream4.on('start', function () {
    console.log('stream4 start')
})

stream4.on('stop', function () {
    console.log('stream4 stop')
})


io.on('connection', socket => {
    const pipeStream1 = data => {
        // 页面转base64
        //socket.emit('data', data.buffer)
        socket.emit('data1', data.toString('base64'))
        //console.log(data)
    }
    const pipeStream2 = data => {
        // 页面转base64
        //socket.emit('data', data.buffer)
        socket.emit('data2', data.toString('base64'))
        //console.log(data)
    }
    const pipeStream3 = data => {
        // 页面转base64
        //socket.emit('data', data.buffer)
        socket.emit('data3', data.toString('base64'))
        //console.log(data)
    }
    const pipeStream4 = data => {
        // 页面转base64
        //socket.emit('data', data.buffer)
        socket.emit('data4', data.toString('base64'))
        //console.log(data)
    }
    stream1.on('data', pipeStream1)
    stream2.on('data', pipeStream2)
    stream3.on('data', pipeStream3)
    stream4.on('data', pipeStream4)

    // 切换摄像机
    socket.on('URI', data => {
        console.log(data)
        uri = `rtsp://admin:makesense2019@10.151.116.112:554`
        stream.input = uri
        // 重启
        stream.restart()
    })

    socket.on('disconnect', () => {
        stream1.removeListener('data', pipeStream1)
        stream2.removeListener('data', pipeStream2)
        stream3.removeListener('data', pipeStream3)
        stream4.removeListener('data', pipeStream4)
    })
})
eapp.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.whenReady().then(
	createWindow
)
