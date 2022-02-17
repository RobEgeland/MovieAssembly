const movieTitle = document.createElement('h2')
const director = document.createElement('h3')
const genre = document.createElement('h4')
const plot = document.createElement('p')
const addMovie = document.createElement('button')
addMovie.setAttribute('style', 'height: 40px; width: 100px; background-color: #a8d5baff')
addMovie.innerText = 'Add Movie'

const search = document.querySelector('form')
const movieDetails = document.querySelector('div#movieDetails')
const watchList = document.querySelector('div#watchList')
const watchedList = document.querySelector('div#watchedList')

const emptyHeart = String.fromCodePoint(0x1F90D)
const fullHeart = String.fromCodePoint(0x2764)
let noRating = `<div>${emptyHeart} ${emptyHeart} ${emptyHeart} ${emptyHeart} ${emptyHeart}</div>`

search.addEventListener('submit', getMovieInfo)

function getMovieInfo(e) {
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=4f4fe272&r=json&t=${e.path[0][0].value}`)
    .then(res => res.json())
    .then(data => checkMovie(data))
    .catch(err => {alert('movie not found', err)})
}

function checkMovie(data) {
    if(data.Title === undefined) {
        window.error('movie not found')
    }else {
        attachMovieInfo(data)
    }
}

function attachMovieInfo(data) {
    movieTitle.innerText = data.Title
    director.innerText = data.Director
    genre.innerText = data.Genre
    plot.innerText = data.Plot
    let info = [movieTitle, director, genre, plot, addMovie]
    appendMovieDetails(info)
}

function appendMovieDetails(arr) {
    arr.forEach(info => movieDetails.appendChild(info))
}

addMovie.addEventListener('click', addToWatch)

function addToWatch(e) {
    let watchItem = document.createElement('h2')
    
    const movieDiv = document.createElement('div')
    const finnished = document.createElement('button')
    finnished.setAttribute('style', 'height: 20px; width: 75px; background-color: #f0979f')
    finnished.innerText = 'Watched'

    watchItem.innerText = e.path[1].childNodes[1].innerText

    movieDiv.appendChild(watchItem)
    movieDiv.appendChild(finnished)
    watchList.appendChild(movieDiv)

    finnished.addEventListener('click', moveToWatched)
}


function moveToWatched(e) {
    const watchedItem = document.createElement('h2')
    let rating = document.createElement('div')
    rating.innerHTML = `<span id='1'>${emptyHeart}</span> <span id='2'>${emptyHeart}</span> <span id='3'>${emptyHeart}</span> <span id='4'>${emptyHeart}</span> <span id='5'>${emptyHeart}</span>`

    watchedItem.innerText = e.path[1].childNodes[0].innerText
    e.path[1].remove()

    watchedList.appendChild(watchedItem)
    watchedList.appendChild(rating)

    rating.addEventListener('click', changeRating)
}

function changeRating(e) {
    heartArray = Array.from(e.path[1].children)
    heartArray.forEach(span => {
        if(span.id <= e.target.id) {
            span.innerText = fullHeart
        }
    })

}








