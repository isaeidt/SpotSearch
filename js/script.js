const form = document.querySelector('form')
const inputBusca = document.querySelector('#inputBusca')
const list = document.getElementById("artistList")
let artists = []

dadosJson() 

function dadosJson(){
    fetch('../json/artist.json')
        .then(response => response.json())
        .then(data => {
            artists = data.artists
        })
        .catch(error => {
            console.error("Erro ao carregar JSON")
        })

}

inputBusca.addEventListener("input", function(event) {
    const search = event.target.value.trim().toLowerCase()
    if (search.length === 0) {
        list.innerHTML = "" 
        return
    }
    const filtered = artists.filter(artist =>
         artist.name
        .toLowerCase()
        .split(" ")
        .some(word => word.startsWith(search)) ||
        artist.name.toLowerCase().startsWith(search)
    )
    renderList(filtered)
})

function renderList(artistArray) {
  list.innerHTML = ""
  artistArray.map(artist => {
    const liNome = document.createElement("li")
    const liGenre = document.createElement("li")
    const div = document.createElement("div")
    div.className = 'artista'
    liNome.className = "nome"
    liGenre.className = "tipo"
    liNome.textContent = `${artist.name}`
    liGenre.textContent = `${artist.genre}`
    const imageClose = document.createElement("img")
    imageClose.src = '../img/X.png'
    imageClose.alt = 'close'
    imageClose.className = "imgClose"
    div.appendChild(imageClose)
    const imageArtist = document.createElement("img")
    imageArtist.src = `${artist.image}`
    imageArtist.alt = 'img artista'
    imageArtist.className = "imgArtist"
    list.appendChild(div)
    div.appendChild(imageArtist)
    div.appendChild(liNome)
    div.appendChild(liGenre)
  })

  if (artistArray.length === 0) {
    const li = document.createElement("li")
    li.textContent = "Nenhum artista encontrado."
    li.className = "nenhumArtista"
    list.appendChild(li)
  }
}



