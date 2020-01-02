// laxxx init
lax.setup() // init
const updateLax = () => {
	lax.update(window.scrollY)
	window.requestAnimationFrame(updateLax)
}
window.requestAnimationFrame(updateLax);
// laxxx end

// frame-3 start
(function frame_3() {

	var content = document.querySelector('.main__content');
	var header = document.querySelector('.main__fixedHeader');
	var headerHeight = header.scrollHeight;
	var halfHeaderHeight = headerHeight / 2;

	const footer = document.querySelector('.main__footer');

	let footerHeight = footer.clientHeight;
	footer.style.display= 'none';
	content.style.marginBottom = footerHeight + 'px';



	window.addEventListener('scroll', function() {

		if (pageYOffset < headerHeight) {
			header.style.display = 'block';
			footer.style.display= 'none';
		}
		else {
			header.style.display = 'none';
			footer.style.display= 'block';
		}
		
		if (window.matchMedia('(max-width: 991px)').matches) {

			content.style.marginBottom = 0 + 'px';

			let headerPos = -pageYOffset;
			header.style.top = headerPos + 'px';
			content.style.marginTop = headerHeight + 'px';

			if (pageYOffset >= halfHeaderHeight) {
				header.style.top = -halfHeaderHeight+'px';

				if(pageYOffset  >= headerHeight  ) {
					header.style.display = 'none';
				}else {
					header.style.display = 'block'
				}

			}

		}

	});
	
})();
// frame-3 end


function gradinet360() {

	'use strict';
	let doc = document;

	var header = doc.querySelectorAll('.gradient360');
	
	for( let i = 0; i<header.length; i++) {

		var hs = header[i].style;
		hs.width = '100%';
		hs.height = '100%';
		hs.position = 'absolute';
		hs.top = '0';
		hs.opacity = '0.9';
	
		// paste your color here
		var firstColor = '#ae3be3'; //$baseColor
		var secondColor = '#4747fe'; // pink
		var deg = 0;
	
		function move() {
				deg++; //rotate speed
				if (deg == 360) deg = 0;
				header[i].style.background = 
				`linear-gradient(${deg}deg, ${firstColor} 0%, ${secondColor} 100%)`;
				requestAnimationFrame(move)
		}
		move()
	}

	
	
}
gradinet360();
							



// faq accordion
$(function () {
	var Accordion = function (el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
	}

	Accordion.prototype.dropdown = function (e) {
		var $el = e.data.el;
		var $this = $(this);
		var $next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}

	var accordion = new Accordion($('.accordion'), false);
});
// faq accordion
						