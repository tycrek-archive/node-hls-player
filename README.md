# node-hls-player
Server/Client demo for HLS streaming from Node.js


### Uses:

- [hls.js](https://github.com/video-dev/hls.js) for the browser
- [hls-server](https://github.com/t-mullen/hls-server) for the server
- [Fluent ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- *FFmpeg must be installed*


### To-do:

- [ ] Stream from local files
- [ ] Change video quality (transcoding)
- [ ] Stream from URL
- [ ] Twitch/YouTube integration


#### random notes

- https://ffmpeg.org/ffmpeg-formats.html#hls-2
- A custom video player is probably going to be required since the HLS stream won't be the full runtime of the file, preventing seeking.
