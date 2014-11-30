'use strict';

$(document).ready(function() {
	
	
	$("section.project main.content img").on('click touchstart', function() {
		
		$(this).removeClass("visible");
		
		$(this).nextOrFirst().addClass("visible");
		
		console.log( $(this).nextOrFirst().attr("src") );
	});
	
});

$.fn.nextOrFirst = function(selector){
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}
