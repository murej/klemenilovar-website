'use strict';

function navigate(id) {
	
	$('header nav a').show();
	$('header nav a#'+id).hide();
	
	$('section').hide();
	$('section.'+id).show();
	
	fixImageHeights()
}


$(document).ready(function() {
	
	$('header nav a').on('click touchstart', function() {
		
		navigate( $(this).attr('href').substr(1) );

	});

	// project navigation
	$('section.project main.content img').on('click touchstart', function() {
		
		var index = $(this).index()+2;
		
		if( index > $(this).parent().children('img').length ) {
			index = 1;
		}
		
		// change navigation number
		$(this).parent().parent().children('aside').children('p.pos').children('span').html( index );
		
		// change image
		$(this).removeClass('visible').nextOrFirst().addClass('visible');
	});
	
	
	// keypress
	$(window).keypress(function(e) {
		
		if(e.keyCode === 107) {

			var randomPhotoNum = Math.floor(1 + Math.random() * $('div#photo img').attr('data-available') );
			$('div#photo img').attr('src','images/camera/'+randomPhotoNum+'.svg');

			$('audio.flash')[0].volume = 0.5;
			$('audio.flash')[0].play();

			setTimeout(function() {
				$('body').children(':not(img.flash)').css('opacity', 0.2);
				$('img.flash').show();
			}, 350);
			
			setTimeout(function() {
				$('body').children(':not(img.flash)').css('opacity', 1);
				$('img.flash').hide();
			}, 500);
			
			setTimeout(function() {
				$('div#camera').show();
								
				$('div#photo').animate({
					marginTop: -5
				}, 3000);
			}, 1500);
		}
	});
	
});

$(window).load(function() {
	
	fixImageHeights();
});

$(window).resize(function() {
	
	fixImageHeights();
});

$.fn.nextOrFirst = function(selector){
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
};

function fixImageHeights() {
	
	$('section.project main.content').each(function() {
		
		var maxHeight = 0;
		
		$(this).children('img').css('max-height', 'none');
		
		$(this).children('img').each(function(i) {
			var img = $(this);
			
			img.addClass('visible');
			
			var w = img[0].clientWidth;
			var h = img[0].clientHeight;
				console.log('img '+w+'/'+h);

			if( w > h && h > maxHeight) {
				
				maxHeight = h;
			}
			
			if(i !== 0) { img.removeClass('visible'); }
		});
		
		$(this).children('img').css('max-height', maxHeight);
		
		console.log(maxHeight);
	});
}