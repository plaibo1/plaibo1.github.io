let personBlock = document.getElementsByClassName('person');
const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
let msgData = ['just','for','length', 'with', 'love <3'];
let i = 0;


let story_1 = document.getElementById('story1');
let story_2 = document.getElementById('story2');
let story_3 = document.getElementById('story3');


window.onload = function() {


	// preloader
	setTimeout(function() {
		let p = document.getElementById('preloader');
		if (!p.classList.contains('preloaderDone')) {
			p.classList.add('preloaderDone')
		}
	}, 1000)

}


story_1.addEventListener('click', function() {
	$('.header').fadeOut();
	msgData = story1;
});

story_2.addEventListener('click', function() {
	$('.header').fadeOut();
	msgData = story2;
});

story_3.addEventListener('click', function() {
	$('.header').fadeOut();
	msgData = story3;
});


if(window.matchMedia('(max-width: 475px)').matches) {
	document.addEventListener('touchstart',() => addMsg());
}
else {
	window.onclick = addMsg;
}


function addMsg(){

	let header = document.querySelector('.header');
	let haederStyle = window.getComputedStyle(header, null)
	let displayOfHeader =  haederStyle.getPropertyValue('display'); // get display value 

	if( i < msgData.length && displayOfHeader == 'none') {
		hideFinger();
		sentMsgSound();
		createMsg(); 
	}
	else if (i >= msgData.length) alert('end of story') // блочим отрисовку сообщений, когда массив закончился

}


function createMsgElem() {
	
	let wrapper = document.getElementById('wrapper');
	wrapper.style.minHeight = '100vh';

	let newMsg = document.createElement('div');
	newMsg.classList.add('person');

	let newMsg__card = document.createElement('div');
	newMsg__card.classList.add('person__card');
	newMsg.append(newMsg__card);

	let newMsg__card__name = document.createElement('div');
	newMsg__card__name.classList.add('person__card__name');
	newMsg__card.append(newMsg__card__name)

	let newMsg__card__name__h5 = document.createElement('h5');
	newMsg__card__name.append(newMsg__card__name__h5);

	let newMsg__card__msg = document.createElement('div');
	newMsg__card__msg.classList.add('person__card__msg');
	newMsg__card.append(newMsg__card__msg)


	let newMsg__card__msg__p = document.createElement('p');
	newMsg__card__msg.append(newMsg__card__msg__p)

	if (msgData[i].img) { // if object has img

		let img = document.createElement('img');
		img.src = `${msgData[i].img}`;

		let newMsgCardImg = document.createElement('div');
		newMsgCardImg.classList.add('person__card__img');

		newMsgCardImg.append(img);
		newMsg__card.append(newMsgCardImg)
		
	}

	let name = newMsg__card__name__h5; // name inner
	let msg = newMsg__card__msg__p; // message inner

	wrapper.appendChild(newMsg); // all in


	if (msgData[i].name == person_1) {   //head person to right
		newMsg__card.classList.add('rightMsg');
		name.innerHTML = msgData[i].name;
		msg.innerHTML = msgData[i].message;
	}

	else {
		newMsg__card.classList.add('leftMsg');
		name.innerHTML = msgData[i].name;
		msg.innerHTML = msgData[i].message;
	}
}


function createMsg() {
	
	createMsgElem();

	unfade(personBlock[i])

	function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 0.01);
	}

	const toBottom = () => scrollTo(0,document.body.scrollHeight)
	toBottom();

	i++;

}

function hideFinger() {
	$('#finger').fadeOut();
}

function sentMsgSound() {
	let msgSound = new Audio;
	msgSound.src = 'audio/SentMessage.mp3';
	msgSound.play()
}





function modes(mode, color, image, music) {

	let sound = new Audio;
	sound.src = `audio/${music}`;

	for(let i=0; i < mode.length; i++) {

		mode[i].addEventListener('mouseenter', function() {			
			
			mode[i].classList.add('active');

			if ( mode[i].classList.contains('active') ) {

				document.body.style.background = color;
				image[i].style.left = -45 + 'px';
				sound.play();
				sound.currentTime = 3;

			}

		});

		mode[i].addEventListener('mouseleave', function() {

			mode[i].classList.remove('active');
			document.body.style.background = 'white';
			image[i].style.left = '-200px';
			sound.pause();
			sound.currentTime = 0;

		});

	}

}

const scary = document.querySelectorAll('.scary');
const scaryImg = document.querySelectorAll('.scaryImg');
const scaryColor = '#181818';
const scaryMusic = 'scaryTheme.mp3';

modes(scary, scaryColor, scaryImg, scaryMusic); //scary mode init


const love = document.querySelectorAll('.love');
const loveImg = document.querySelectorAll('.loveImg');
const loveColor = '#ff6ca2';
const loveMusic = 'loveTheme.mp3';

modes(love, loveColor, loveImg, loveMusic); // love mode init


const comedy = document.querySelectorAll('.comedy');
const comedyImg = document.querySelectorAll('.comedyImg');
const comedyColor = 'orange';
const comedyMusic = 'comedyTheme.mp3';

modes(comedy, comedyColor, comedyImg, comedyMusic); // comedy mode init
