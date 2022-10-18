$(document).ready(function () {
	// CAMBIAR EL COLOR DE NAVBAR
	// https://www.youtube.com/watch?v=1gzCKACvgf4
	$(window).scroll(function () {
		$('nav').toggleClass('scrolled', $(this).scrollTop() > 200);
	});
	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
});
