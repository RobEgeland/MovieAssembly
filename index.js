fetch('http://www.omdbapi.com/?apikey=4f4fe272&r=json&t=Dune')
.then(res => res.json())
.then(res => console.log(res))

const movieTitle = document.createElement('h2')
const director = document.createElement('h3')
const genre = document.createElement('h4')
const plot = document.createElement('p')
const addMovie = document.createElement('button')

const search = document.querySelector('form')
const movieDetails = document.querySelector('div#movieDetails')


search.addEventListener('submit', getMovieInfo)

function getMovieInfo(e) {
    e.preventDefault()
    //console.log(e.path[0][0].value)
    fetch(`http://www.omdbapi.com/?apikey=4f4fe272&r=json&t=${e.path[0][0].value}`)
    .then(res => res.json())
    .then(data => attachMovieInfo(data))
}

function attachMovieInfo(data) {
    movieTitle.innerText = data.Title
    director.innerText = data.Director
    genre.innerText = data.Genre
    plot.innerText = data.Plot

    movieDetails.appendChild(movieTitle)
    movieDetails.appendChild(director)
    movieDetails.appendChild(genre)
    movieDetails.appendChild(plot)

}






