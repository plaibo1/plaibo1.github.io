let doc = document;

// menu start
let openBtn = doc.getElementById('menu__btn');
let closeBtn = doc.getElementById('closeBtn');
let menu = doc.getElementById('menu');

let menu__instruction = doc.getElementById('menu__instruction');
let contentCloseBtn = doc.getElementById('contentCloseBtn');
let content = doc.getElementById('content');

openBtn.onclick = function() {
	menu.style.left = '0';
}

closeBtn.onclick = function() {
	menu.style.left = '-290px';
}

menu__instruction.onclick = function() {
	content.style.right = '0';
}

contentCloseBtn.onclick = function() {
	content.style.right = '-100%';
}
// menu end



// salt
let btn = doc.getElementById('btn');
let btn_del = doc.getElementById('btn__remove');
let translateOuter = doc.getElementById('translateOuter');


btn.onclick = translate;

function translate() {

	let urLang = doc.getElementById('urLang');
	let languageChange = doc.getElementById('languageChange');
	let word;

	if (urLang.value == '') {
		 word = languageChange.value; 
	} 

	else {
		word = urLang.value;
	}

	let text = doc.getElementById('textIn').value;
	newText = text.replace(/[ауоыиэяюёеAEIOU]/ig, (function (salt) {return salt + `${word}` + salt;}) );
	translateOuter.value = newText;

	if (text == 'честь ебаная' || text == 'Честь ебаная' || text == 'Честь ебаная ' || text == 'честь ебаная ' ) {
		let fight = doc.getElementById('fight');
		fight.play();
	}

	else if (text == 'dachamode' || text == 'Dachamode' || text == 'dachaMode' || text == 'Dacha mode' || text == 'Dacha Mode' || text == 'Дача модик') {
		menu.style.left = '0';
		let dachaActivation = doc.getElementById('dachaActivation');
		dachaActivation.style.display = 'flex';

		let dachaActivationSound = new Audio;
		dachaActivationSound.src = 'audio/activation.mp3';
		dachaActivationSound.play();
	}

	else if (text == 'dachamodeoff' || text == 'DachamodeOff' || text == 'dachaModeOff' || text == 'Dacha mode off' || text == 'Dacha Mode Off' || text == 'Дача модик офик') {
		let dachaActivation = doc.getElementById('dachaActivation');
		dachaActivation.style.display = 'none';
		menu.style.left = '-290px';
	}

	else {
		let yau = doc.getElementById('yau');
		yau.play();
	}
	
	if (translateOuter.value == 'этэмитилитиятя' && text == 'эмилия') {
		$('.emil').css('display', 'block');
		let scary = doc.getElementById('scary');
		scary.play();
	}

}


// speech 
const speechRecordBtn = doc.getElementById('speechRecordBtn');
const speechOutterBtn = doc.getElementById('speechOutterBtn');
let textIn = doc.getElementById('textIn');

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
	console.log('micro on')
}

recognition.onresult = function(event) {
	const current = event.resultIndex;
	const transcript = event.results[current][0].transcript;
	textIn.value = transcript;
}

speechRecordBtn.addEventListener('click', () => recognition.start())


function readOutLoud(message) {
	const speech = new SpeechSynthesisUtterance();
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;

	window.speechSynthesis.speak(speech);
}

speechOutterBtn.addEventListener('click', () => {
	readOutLoud(translateOuter.value)
})





// delete text

btn_del.onclick = del;

function del() {

	doc.getElementById('textIn').value = '';
	doc.getElementById('translateOuter').value = '';

}

let delUrLang = doc.getElementById('delUrLang');
delUrLang.onclick = delLang; 

function delLang() {
	let urLang = doc.getElementById('urLang');
	urLang.value = '';
}



///////////////
var clipboard = new ClipboardJS('.copyText');



// dark theme

$(document).ready(function() {

	$( '#themeChanger' ).click(function() {
		if(!$('body').hasClass('darkMode')) {
			$('body').addClass('darkMode');
			$('.textareaDark').addClass('darkModeGrey');
			$('.stickyTopMenu').addClass('darkModeGrey');
			$('#menu').addClass('darkModeGrey');
			$('#dronJokeHide').hide();
			$('#dronJokeShow').show();
			$('#dronJokeShow').css('line-height', '75px');

			$('footer').addClass('darkMode');
		}

		else{
			$('body').removeClass('darkMode');
			$('.textareaDark').removeClass('darkModeGrey');
			$('.stickyTopMenu').removeClass('darkModeGrey');
			$('#menu').removeClass('darkModeGrey');
			$('#dronJokeHide').show();
			$('#dronJokeShow').hide();

			$('footer').removeClass('darkMode');
		}
	});


	// dachaMode

	let dachaMusic = doc.getElementById('dachaMusic');

	$( '#dachaModeTheme' ).click(function() {
		if(!$('body').hasClass('dachaMode')) {
			$('body').addClass('dachaMode');
			
			dachaMusic.play();

			$('.faces').show();
			$('#dachaModeOff').hide();
			$('#dachaModeOn').show();
			$('.textareaDark').addClass('colorBlindTextarea');

			$('.stickyTopMenu').addClass('darkModeGrey');
			$('footer').addClass('darkMode');
		}

		else{
			$('body').removeClass('dachaMode');

			dachaMusic.pause();

			$('.faces').hide();
			$('#dachaModeOff').show();
			$('#dachaModeOn').hide();
			$('.textareaDark').removeClass('colorBlindTextarea');

			$('.stickyTopMenu').removeClass('darkModeGrey');
			$('footer').removeClass('darkMode');
		}
	});

});


// testing 
// let testResult = doc.getElementById('testResult');
// let testingBg = doc.getElementById('testingBg');
// let testBtn = doc.getElementById('testBtn');
// testBtn.onclick = successResult;

// function successResult() {
// 	let testWord = doc.getElementById('testWord').value;
	
// 	if (testWord == 'песересевосодчисик' || testWord == 'песересевосодчисик ' || testWord == 'Песересевосодчисик' || testWord == 'Песересевосодчисик ') {
// 		testingBg.style.background = '#00e587';
// 		testResult.innerHTML = 'Правильно!';
// 	}

// 	else {
// 		testBtn.style.background = '#ff5441';
// 		testingBg.style.background = '#ff5441';
// 		testResult.innerHTML = 'Попробуй еще раз';
// 	}

// }