(function ($) {

    'use strict';

    var UpdateFromBottom = {

    	// Settings
    	settings :  {
    		box    : null,
    		heart  : null,
    		update  : null,
    		publish: null,
    		totop : null,
    	},

        publish: function() {

        	// Publish/Update content
        	UpdateFromBottom.settings.update.on('click', function(e){

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

        		UpdateFromBottom.settings.publish.trigger('click');

        		e.preventDefault();

        	});
        },

        scrollToTop: function() {

        	// Scroll to top
        	UpdateFromBottom.settings.totop.on('click', function(event){
        		event.preventDefault();
        		$('html, body').animate({scrollTop : 0}, 600);
        	});

        },

        showBox: function() {

        	// Show box if near bottom
        	if(($(window).scrollTop() + $(window).height()) > ($(document).height() - 40)) {
        		UpdateFromBottom.settings.box.show();
        	} else {
        		UpdateFromBottom.settings.box.hide();
        	}
        },

        showBoxOnWide: function() {

        	// Show box if neccessary
        	if($(window).width() > 900 && $(window).height() > 1000) {
        		UpdateFromBottom.settings.box.show();
        	} else {
        		UpdateFromBottom.settings.box.hide();
        	}

        },

        AlternateMarkup: function() {
        	// Button markup depending on post/page status
        	if($('#updatefrombottom .button-primary').val() == updatefrombottomParams.publish) {
        		$('<div id="updatefrombottom"><a class="button button-totop">'+updatefrombottomParams.totop+'</a><a class="button button-primary button-large">'+updatefrombottomParams.publish+'</a></div>').appendTo("#wpbody-content");
        	} else {
        		$('<div id="updatefrombottom"><a class="button button-totop">'+updatefrombottomParams.totop+'</a><a class="button button-primary button-large">'+updatefrombottomParams.update+'</a></div>').appendTo("#wpbody-content");
        	}

        	// Store selectors to settings
        	UpdateFromBottom.settings.box = $('#updatefrombottom');
        	UpdateFromBottom.settings.heart = $('#jsc-heart');
        	UpdateFromBottom.settings.update =  $('#updatefrombottom .button-primary');
        	UpdateFromBottom.settings.publish = $('#publish');
        	UpdateFromBottom.settings.totop = $('#updatefrombottom .button-totop');


        }

    }

    $(window).load(function() {

    	// Alternate markup
    	UpdateFromBottom.AlternateMarkup();

	   	setTimeout(function() {

		   	// Scroll to top
	    	UpdateFromBottom.scrollToTop();
	    	 	    
	    	 // Publish/Update
	    	 UpdateFromBottom.publish();

	   	}, 1000);

    });

    $(window).scroll(function() {

    	// Check if we are near bottom, show box	
    	UpdateFromBottom.showBox();

    });

    $(window).on('resize', function() {
    	
    	// Show box on wide screens
    	UpdateFromBottom.showBoxOnWide();

    });

}(jQuery));