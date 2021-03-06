
$(function() {
	var tvshows = $('#app-body').find('.tv-shows')
	tvshows.on('click','button.like', function (ev){
		var $this=$(this);
		$this.closest('.tv-show').toggleClass('liked');
	})

	function renderShows(shows){
		tvshows.find('.loader').remove();
		shows.forEach(function(show){
			var article=template 
				.replace(':name:',show.name)
				.replace(':img:',show.image.medium)
				.replace(':summary:',show.summary)
				.replace(':img alt:',show.name + " Logo")
			var $article = $(article);
			//$article.hide();
			tvshows.append($article.fadeIn(1500));
			})
	}
	/*
	*	Submit search 
	*/

	$('#app-body')
		.find('form')
		.submit(function (ev){
			ev.preventDefault();
			var busqueda = $(this)
				.find('input[type="text"]')
				.val();
			tvshows.find('.tv-show').remove()
			var $loader=$('<div class="loader">');
			$loader.appendTo(tvshows);
			$.ajax({
				url: 'http://api.tvmaze.com/search/shows',
				data: { q: busqueda },
				success: function (res, textStatus, xhr){
					$loader.remove();
					var shows = res.map(function (el){
						return el.show
					})
					renderShows(shows);
				}
			})
		})
	var template='<article class="tv-show">' + 
	'<div class="left img-container">' + 
	'<img src=":img:" alt=":imgalt:" />'+
	'</div>'+
	'<div class="right info">'+
	'<h1> :name: </h1>'+
	'<p> :summary: </p>'+
	'<button class="like">✔</button>'+
	'</div>'+
	'</article>';

	if(!localStorage.shows){
	$.ajax('http://api.tvmaze.com/shows')
		.then(function (shows){
			tvshows.find('.loader').remove();
			localStorage.shows = JSON.stringify(shows);
			renderShows(shows);
		})
	}
	else
	{
		renderShows(JSON.parse(localStorage.shows));
	}
})
