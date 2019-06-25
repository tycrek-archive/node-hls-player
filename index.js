var HLSServer = require('hls-server');
var httpAttach = require('http-attach');
var express = require('express');
var ffmpeg = require('fluent-ffmpeg');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();
var server = http.createServer(app);

new HLSServer(server, {
	path: '/streams',
	dir: 'public/videos'
});

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use('/public', express.static('public'));

app.get('/'      , (_, res) => res.status(200).sendFile(path.join(__dirname, '/index.html')));
app.get('/player', (_, res) => res.status(200).sendFile(path.join(__dirname, '/player.html')));
app.get('/create', (_, res) => {
	ffmpeg('./SampleVideo_1280x720_20mb.mp4', { timeout: 432000 }).addOptions([ //https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4
		'-profile:v baseline',
		'-level 3.0',
		//'-s 640x360', // uncomment to change the size on encoding
		'-start_number 0',
		'-hls_time 10',
		'-hls_list_size 0',
		'-f hls'
	]).output('./public/videos/test1_.m3u8').on('start', () => res.redirect('/player')).on('progress', prog => console.log(`${prog.percent}% done`)).run();
});
httpAttach(server, app);
server.listen(8001, () => console.log('Listening on 8001'));
