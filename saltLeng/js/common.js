let doc = document;

// menu start
let openBtn = doc.getElementById('menu__btn');
let closeBtn = doc.getElementById('closeBtn');
let menu = doc.getElementById('menu');

openBtn.onclick = function() {
	menu.style.left = '0';
}

closeBtn.onclick = function() {
	menu.style.left = '-290px';
}
// menu end



// salt
let btn = doc.getElementById('btn');
let btn_del = doc.getElementById('btn__remove');
let translateOuter = doc.getElementById('translateOuter');


btn.onclick = translate;

function translate() {

	let yau = doc.getElementById('yau');
	yau.play();

	let text = doc.getElementById('textIn').value;
	newText = text.replace(/[ауоыиэяюёеAEIOU]/ig, (function (salt) {return salt + 'с' + salt;}) );
	translateOuter.value = newText;
	

}

btn_del.onclick = del;

function del() {

	doc.getElementById('textIn').value = '';
	doc.getElementById('translateOuter').value = '';

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
