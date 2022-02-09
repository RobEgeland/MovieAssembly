function request(){
}

fetch('http://www.omdbapi.com/?apikey=4f4fe272&r=json&t=Dune')
.then(res => res.json())
.then(res => console.log(res.Actors))



