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