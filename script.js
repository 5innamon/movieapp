const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6824144e82063dd0d85c6c8d79c59079&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=0bf7f37bc339bf474d312f3aea42cb17&query="';

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url){
	const res = await fetch(url);
	const data = await res.json();
	
	showMovies(data.results);
}

function showMovies(movies){
	main.innerHTML = '';
	
	movies.forEach((movie) =>{
		const {title, poster_path, vote_average,
			   overview} = movie;
		
		const movieEl = document.createElement
		('div');
		movieEl.classList.add('movie')
		
		movieEl.innerHTML = `<div class="movie">
				<img src="${IMG_PATH + poster_path}" alt="${title}">
				<div class="movie-info">
					<h3>${title}</h3>
					<span class="${getClassByRate(vote_average)}">${vote_average}</span>
				</div>
				<div class="overview">
					<h3>Overview</h3>
					${overview}
				</div>
			</div>`
		
		main.appendChild(movieEl)
	})
}

function getClassByRate(vote){
	if(vote >=8) {
		return 'green'
	} else if(vote >= 5) {
		return 'orange'
	} else {
		return 'red'
	}
}

form.addEventListener('submit', (e) =>{
	e.preventDefault()
	
	const searchTerm = search.value
	
	if(searchTerm && serachTerm !==''){
		getMovies(SEARCH_API + searchTerm)
		
		search.value =''
	} else {
		window.location.reload()
	}
})