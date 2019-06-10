let doc = document;

// laxxx init

// window.onload = function() {
// 	lax.setup() // init

// 	const updateLax = () => {
// 		lax.update(window.scrollY)
// 		window.requestAnimationFrame(updateLax)
// 	}

// 	window.requestAnimationFrame(updateLax)
// }


let tonyVideo = doc.getElementById('tonyVideo');
let playVideoBtn = doc.getElementById('playVideoBtn');
let pauseVideoBtn = doc.getElementById('pauseVideoBtn');
let stopVideoBtn = doc.getElementById('stopVideoBtn');
let videoVolumeRanger = doc.getElementById('videoVolumeRanger');
let videoProgressBar = doc.getElementById('videoProgressBar');


const playVideo = video => video.play();

const pauseVideo = video => video.pause();

const stopVideo = video => { 
	video.pause(); 
	video.currentTime = 0 
}

const videoVolume = (video) => {
	let v = videoVolumeRanger.value;
	video.volume = v / 100;
}

const updateProgress = (video) => {
	let curTime = video.currentTime;
	let videoDuration = video.duration;
	videoProgressBar.value = ( curTime / videoDuration ) * 100;
}

function videoRewind () {
	let currentClickWidth = this.offsetWidth;
	let allWidth = event.offsetX;
	this.value = allWidth / currentClickWidth * 100;
	tonyVideo.pause();
	tonyVideo.currentTime = tonyVideo.duration * (allWidth / currentClickWidth);
	tonyVideo.play();
}

// buttons 
playVideoBtn.onclick = () => playVideo(tonyVideo);
pauseVideoBtn.onclick = () => pauseVideo(tonyVideo);
stopVideoBtn.onclick = () => stopVideo(tonyVideo);
videoVolumeRanger.oninput = () => videoVolume(tonyVideo);


// progress 
tonyVideo.ontimeupdate = () => updateProgress(tonyVideo);
videoProgressBar.onclick  = videoRewind;