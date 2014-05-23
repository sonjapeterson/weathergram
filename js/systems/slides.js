var slides;
$(function(){
	slides = $('.slide[data-href]');
	slides.click(function(){
		$("html, body").scrollTop($($(this).data('href')).offset().top);
	});
});