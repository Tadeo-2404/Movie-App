//VARIABLES
const API_KEY = "api_key=2066d5dcd52d698c19d8494abc8e4c33";
const BASE_URL = "http://api.themoviedb.org/3";
const MOST_POPULAR = BASE_URL +  "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const BEST_RATE = BASE_URL + "/movie/top_rated?" + API_KEY;
const BEST_2022 = BASE_URL + "/discover/movie?with_genres=18&primary_release_year=2022&" + API_KEY;
const NEW_MOVIES = BASE_URL + "/movie/upcoming?&" + API_KEY;
const MOST_POPULAR_TV_SHOWS = BASE_URL + "/tv/popular?&" + API_KEY;
const POPULAR_TODAY = BASE_URL + "/trending/all/day?&" + API_KEY;
let SEARCH = BASE_URL + "/search/multi?&" + API_KEY
const NewestMovie = BASE_URL + "/trending/movie/day?&" + API_KEY;
const KIDS_MOVIES = BASE_URL + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&" + API_KEY

const container = document.querySelectorAll('.movies_container ');
const containerMostPopular = document.querySelector('.movies_container_mostPopular');
const containerBestRated = document.querySelector('.movies_container_topRated');
const containerBest2022 = document.querySelector('.movies_container_best2022');
const containerNewMovies = document.querySelector('.movies_container_newMovies');
const containerMostPopularTVShows = document.querySelector('.movies_container_mostPopularTVShows');
const containerPopularToday = document.querySelector('.movies_container_popularToday');
const carouselSearch = document.querySelector('.carousel_search');
const containerSearch = document.querySelector('.movies_container_search');
const containerKidsMovies = document.querySelector('.movies_container_kidsMovies');
const hero = document.querySelector('.hero_container');
const link = document.querySelector('.nav-link');

const leftArrow = document.querySelectorAll('.switchLeft');
const rightArrow = document.querySelectorAll('.switchRigth');
const searchBox = document.querySelector('#input');
const searchIcon = document.querySelector('#btn-search');

//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    carouselSearch.classList.add('d-none')
    getMovieMostPopular(MOST_POPULAR);
    getMoviesBestRate(BEST_RATE);
    getMoviesBest2022(BEST_2022);
    getMoviesNew(NEW_MOVIES);
    getMovieMostPopularTVShows(MOST_POPULAR_TV_SHOWS);
    getMoviePopularToday(POPULAR_TODAY);
    getNewiestMovie(NewestMovie);
    getKidsMovies(KIDS_MOVIES)
});

leftArrow.forEach((leftArrow, i) => {
    leftArrow.addEventListener('click', () => {
        container[i].scrollLeft -= 150;
    });
});

rightArrow.forEach((rightArrow, i) => {
    rightArrow.addEventListener('click', () => {
        container[i].scrollLeft += 150;
    });
});

link.addEventListener('click', () => {
    alert('This App uses the TMDB Api, for more information visit their page at...https://www.themoviedb.org/')
})

searchIcon.addEventListener('click', buscar);

//FUNCIONES

function buscar() {
   if(searchBox.value == "") {
       alert('Error: Campo Vacio');
       return;
   }

   let input = searchBox.value;
   input = input.replace(/\s/g, '%20')
   SEARCH = SEARCH + `&query=${input}`
   carouselSearch.classList.remove('d-none');
   getSearch(SEARCH);
}

function getKidsMovies(url) {
    fetch(url)
        .then(datos => datos.json())
        .then(resultado => {
            showKidsMovies(resultado.results);
        })
}

function getNewiestMovie(url) {
    fetch(url)
        .then(datos => datos.json())
        .then(resultado => {
            showNewiest(resultado.results);
        })
}

function getMovieMostPopular(url) {
    fetch(url)
        .then(datos => datos.json())
        .then(resultado => {
            showMostPopular(resultado.results);
        })
}

function getMoviesBestRate(url) {
    fetch(url)
        .then(datos => datos.json())
        .then(resultado => {
            showBestRated(resultado.results);
        })
}

function getMoviesBest2022(url) {
    fetch(url)
        .then(datos => datos.json())
        .then(resultado => {
            showBest2022(resultado.results);
        })
}

function getMoviesNew(url) {
    fetch(url)
        .then(datos => datos.json())
        .then(resultado => {
            showMoviesNew(resultado.results);
        })
}

function getMovieMostPopularTVShows(url) {
    fetch(url)
    .then(datos => datos.json())
    .then(resultado => {
        showMovieMostTVShows(resultado.results);
    })
}

function getMoviePopularToday(url) {
    fetch(url)
    .then(datos => datos.json())
    .then(resultado => {
        showPopularToday(resultado.results);
    })
}

function getSearch(url) {
    fetch(url)
    .then(datos => datos.json())
    .then(resultado => {
        showSearch(resultado.results);
    })
}

function showMostPopular(resultado) {
    resultado.forEach((element) => {
        const {original_title, overview, vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_title}</h2>
        </a>
        `;

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerMostPopular.appendChild(DIV);
    });
}

function showKidsMovies(resultado) {
    resultado.forEach((element) => {
        const {original_title, overview, vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_title}</h2>
        </a>
        `;

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerKidsMovies.appendChild(DIV);
    });
}

function showBestRated(resultado) {
    resultado.forEach((element) => {
        let {original_title,  overview ,vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_title}</h2>
        </a>
        `;
         
        console.log(DIV.childNodes[1].childNodes[1].src)
        if(DIV.childNodes[1].childNodes[1].src == "https://image.tmdb.org/t/p/w500/null") {
            DIV.childNodes[1].childNodes[1].src= "./src/assets/notFound.jpg"
        }

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerBestRated.appendChild(DIV);
    });
}

function showNewiest(resultado) {
        resultado.forEach((element) => {
            let {original_title,  overview ,vote_average, backdrop_path, id, release_date} = element;
            const carousel = document.querySelector('#carousel-inner_movie');
            const div = document.createElement('DIV');
            div.classList.add('carousel-item');
            div.innerHTML = `
        <div class="row">
            <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" class="movie_details-img col-sm-6">
            <div class="movie_details_body col-sm-6">
              <h2 class="movie_details_body-title">${original_title}</h2>
              <p class="movie_details_body-date">${release_date} <span class="movie_details_body-rating">${vote_average}</span></p>
              <p class="movie_details_body-description">${overview}</p>
            </div>
        </div>
            `;
            carousel.appendChild(div)
        });

        const firstChild = document.querySelector('#carousel-inner_movie').firstElementChild;
        firstChild.classList.add('active')
}

function showBest2022(resultado) {
    resultado.forEach((element) => {
        let {original_title, overview ,vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_title}</h2>
        </a>
        `;

        if(DIV.childNodes[1].src == "https://image.tmdb.org/t/p/w500/null") {
            DIV.childNodes[1].src = "./src/assets/notFound.jpg"
        }

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerBest2022.appendChild(DIV);
    });
}

function showMoviesNew(resultado) {
    resultado.forEach((element) => {
        let {original_title, overview ,vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_title}</h2>
        </a>
        `
        // cargarDetalles(id)
        if(DIV.childNodes[1].src == "https://image.tmdb.org/t/p/w500/null") {
            DIV.childNodes[1].src = "./src/assets/notFound.jpg"
        }

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerNewMovies.appendChild(DIV);
    });
}

function showMovieMostTVShows(resultado) {
    resultado.forEach((element) => {
        let {original_name, overview, vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_name}</h2>
        </a>
        `
        // cargarDetalles(id)
        if(DIV.childNodes[1].src == "https://image.tmdb.org/t/p/w500/null") {
            DIV.childNodes[1].src = "./src/assets/notFound.jpg"
        }

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerMostPopularTVShows.appendChild(DIV);
    });
}

function showPopularToday(resultado) {
    resultado.forEach((element) => {
        let {original_title, overview, vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_title}</h2>
        </a>
        `

        if(DIV.childNodes[1].src == "https://image.tmdb.org/t/p/w500/null") {
            DIV.childNodes[1].src = "./src/assets/notFound.jpg"
        }

        DIV.addEventListener('click', () => {
            cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

        containerPopularToday.appendChild(DIV);
    });
}

function showSearch(resultado) {
    while(containerSearch.firstChild) {
        containerSearch.removeChild(containerSearch.firstChild)
    }

    resultado.forEach((element) => {
        let {original_name, overview, vote_average, poster_path, id, release_date} = element;
        const DIV = document.createElement('DIV');
        DIV.classList.add('movie_container');
        DIV.innerHTML = `
        <a href="#hero">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_img">
            <h2 class="text-center movie_title">${original_name}</h2>
        </a>
        `;

        if(DIV.childNodes[1].src == "https://image.tmdb.org/t/p/w500/null") {
            DIV.childNodes[1].src = "./src/assets/notFound.jpg"
        }

        if(DIV.childNodes[3].innerText === "undefined") {
            DIV.childNodes[3].innerText = `${original_title}`
        }

        DIV.addEventListener('click', () => {
             cargarDetalles(original_title, overview, vote_average, poster_path, release_date)
        })

          containerSearch.appendChild(DIV);
    });
}

function cargarDetalles(original_title, overview, vote_average, poster_path, release_date) {

    while(hero.firstChild) {
        hero.removeChild(hero.firstChild)
    }
        const div = document.createElement('DIV');
        div.classList.add('row')
        div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie_details-img col-sm-4">
        <div class="movie_details_body col-sm-8">
          <h2 class="movie_details_body-title">${original_title}</h2>
          <p class="movie_details_body-date">${release_date} <span class="movie_details_body-rating">${vote_average}</span></p>
          <p class="movie_details_body-description">${overview}</p>
        </div>
        `;
        hero.classList.add('bg_div')
        hero.appendChild(div)
}
