
var video = document.querySelector('video');

navigator.getUserMedia({
    video: true,
    audio: false
}, function(localMediaStream) {
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function(e) {
        // Ready to go. Do some stuff.
        console.log('gg bj');
    };
}, function() {
	console.log('getUserMedia rejected', e);
});


var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(video);

function positionLoop() {
    //requestAnimationFrame(positionLoop);
    var positions = ctracker.getCurrentPosition();
    // positions = [[x_0, y_0], [x_1,y_1], ... ]

    // do something with the positions ...
    console.log('ha', positions)
}
//positionLoop();

var canvasInput = document.querySelector('canvas');
var cc = canvasInput.getContext('2d');

var framerate = document.querySelector('a');
var lastCall = new Date();

var calls = [];

function drawLoop() {
    requestAnimationFrame(drawLoop);
    cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
    ctracker.draw(canvasInput);

    var now = new Date();
    calls.push(now - lastCall);
    if (calls.length > 10) {
        calls.shift();
    }
    framerate.innerHTML = calls[calls.length - 1];
    lastCall = now;
}
drawLoop();