// menu
$(document).ready(function() {

	$( '#menu__btn' ).click(function() {
		if(!$('#menu').hasClass('openDone')) {
			$('#menu').addClass('openDone');
			$('#menu').css("left", "0px");

			$('#topMenuSpan').css("transform", 'rotate(45deg)');
			$('#midMenuSpan').css("display", 'none');
			$('#menu__btn span').css("margin", '-2px');
			$('#botMenuSpan').css("transform", 'rotate(-45deg)');
		}

		else{
			$('#menu').removeClass('openDone');
			$('#menu').css("left", "-290px");

			$('#topMenuSpan').css("transform", 'rotate(0deg)');
			$('#midMenuSpan').css("display", 'block');
			$('#menu__btn span').css("margin", '3px 0');
			$('#botMenuSpan').css("transform", 'rotate(0deg)');
		}
	});

});


// scroll to top
$(document).ready(function() {
	// Show or hide the sticky footer button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 500) {
			$('.go-top').fadeIn(500);
		} else {
			$('.go-top').fadeOut(500);
		}
	});
	
	// Animate the scroll to top
	$('.go-top').click(function(event) {
		event.preventDefault();
		
		$('html, body').animate({scrollTop: 0}, 500);
	})
});



// slow anchor scroll 
function slowScroll (id) {
	'use strict';
	var offset = 100;
	var newOffset = parseInt(offset, 10);
	$('html, body').animate ({
		scrollTop: $(id).offset ().top - newOffset
	}, 500);
	return false;
}



// swiper appscreen slider 

  $(document).ready(function() {

      'use strict';

      var swiper = new Swiper('.appScreen__swiperContainer', {
      effect: 'coverflow',
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

	});



//swiper team slider
$(document).ready(function() {
  'use strict';

 if(window.matchMedia('(max-width: 991px)').matches) {
    var swiper = new Swiper('.team__swiperContainer', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  else {
    var swiper = new Swiper('.team__swiperContainer', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

})

// swiper testimonials 

$(document).ready(function() {

	'use strict';

	var swiper = new Swiper('.testimonialsSliderContainer', {
		spaceBetween: 30,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});

});