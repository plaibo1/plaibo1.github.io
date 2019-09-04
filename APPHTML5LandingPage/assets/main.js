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

// menu
$(document).ready(function(){
  'use strict';
   $("#MenuIcon").on('click', function(){
        $("#MainMenu").css("left","0px");
        function showMenu(){
            $("#MainMenu").css("-webkit-clip-path","polygon(0 0,100% 0,100% 100%,0% 100%)");
            $("#MenuIcon").css({"right":"-100px"});
        }
        setTimeout(showMenu,100);
   });
    
    $("#close").on('click', function(){
            $("#MainMenu").css("-webkit-clip-path","polygon(0 0,0% 0,100% 100%,0% 100%)");

            function hideMenu() {
                    $("#MainMenu").css("left","-300px");
                    $("#MenuIcon").css({"right":"20px"});   
            }
        setTimeout(hideMenu,300);
        
        function originalLayout(){
            $("#MainMenu").css("-webkit-clip-path","polygon(0 0,100% 0,0% 100%,0% 100%)");

        }
        setTimeout(originalLayout,600);
    });

});


// iphone slider
$(document).ready(function(){
  'use strict';

  $(".iphoneSlider").owlCarousel({
    
    items:1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 1850,
    autoplayHoverPause: true

  });
});

// appScreen sldier owlCarousel 
$(document).ready(function(){
  'use strict';
  $(".appScreenSlider").owlCarousel({
    items: 1,
    responsiveClass:true,
    responsive:{
       995:{
            stagePadding: 30,
            nav: true,
            loop: true,
            center: true,
            items: 3
       }
    }

  });
});

// testimonials sldier owlCarousel 
$(document).ready(function(){
  'use strict';
  $(".testimonialsSlider").owlCarousel({

    items: 1,
    loop: true,
    dots: true

  });
});



// accordion 
$(document).ready(function() {
  'use strict';
  
 $('.faqAccordion__content').not(':first').hide();
 
  
  $('.faqAccordion__heading').on('click', function() {
    var findArticle = $(this).next('.faqAccordion__content');
    var findWrapper = $(this).closest('.faqAccordion');
    
    if (findArticle.is(':visible')) {
      findArticle.slideUp(200);
    }
    else {
      findWrapper.find('.faqAccordion__content').slideUp(200);
      findArticle.slideDown(200);
    }
  });
  
});




