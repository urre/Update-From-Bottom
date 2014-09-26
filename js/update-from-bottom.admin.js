(function ($) {
	"use strict";

	$(window).load( function() {

		// Button markup depending on post/page status
		if($('#publish').val() == updatefrombottomParams.publish) {
			$('<div id="updatefrombottom"><a class="button button-totop">'+updatefrombottomParams.totop+'</a><a class="button button-primary button-large">'+updatefrombottomParams.publish+'</a></div>').appendTo("#wpbody-content");
		} else {
			$('<div id="updatefrombottom"><a class="button button-totop">'+updatefrombottomParams.totop+'</a><a class="button button-primary button-large">'+updatefrombottomParams.update+'</a></div>').appendTo("#wpbody-content");
		}

		// DOM Caching
		var elements =  {
			box    : $('#updatefrombottom'),
			heart  : $('#jsc-heart'),
			update  : $('#updatefrombottom .button-primary'),
			publish: $('#publish'),
			totop : $('#updatefrombottom .button-totop')
		}

		// Publish/Update content
		elements.update.on('click', function(e){

			if($(this).text() == updatefrombottomParams.publish) {
				$(this).text(updatefrombottomParams.publishing);
				setTimeout(function() {
					$(this).text(updatefrombottomParams.publish);
				}, 2000);
			} else {
				$(this).text(updatefrombottomParams.updating);
				setTimeout(function() {
					$(this).text(updatefrombottomParams.update);
				}, 2000);
			}

			elements.publish.trigger('click');

			e.preventDefault();

		});

		// Scroll to top
		elements.totop.on('click', function(event){
			event.preventDefault();
			$('html, body').animate({scrollTop : 0}, 600);
		});

		// Check if we are near bottom, show box
		$(window).scroll(function(){
			if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
				elements.box.show();

			} else {
				elements.box.hide();
			}
		});

		// Show box on wide screens
		$(window).on('resize', function() {

			if($(window).width() > 900 && $(window).height() > 1000) {
				elements.box.show();
			} else {
				elements.box.hide();
			}

		});

	});

}(jQuery));