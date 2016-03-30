
$(function() {
	var a=$('<a>',{
		href: 'http://platzi.com',
		target: '_blank',
		html: 'Ir a Platzi'
	})
	$('#app-body').append(a);

	a.attr({
		href: 'http://google.com',
		html: 'Ir a google',
		innerHTML: 'Ir a google',
		innerText: 'Ir a google'
	})

})
