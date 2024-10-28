const pokemonList = document.getElementById("pokemon-list");
const pokemonDetail = document.getElementById("pokemon-detail");
const pokemonInfo = document.getElementById("pokemon-info");
const backButton = document.getElementById("back-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentPage = 1
const itemPerPage = 50
const totalPokemons = 1025

async function fetchPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await response.json();
    return pokemon;
}

function displayPokemon(pokemon) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p>ID: ${pokemon.id}</p>
    `
    
    pokemonCard.addEventListener("click", ()=>showPokemonDetail(pokemon))    
    pokemonList.appendChild(pokemonCard)
    return
}

backButton.addEventListener("click",() =>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "grid";

})
function showPokemonDetail(pokemon) {
    pokemonList.style.display = "none";
    pokemonDetail.style.display = "block";
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Tipos: ${pokemon.types.map(p=>p.type.name).join(", ")}</p>

    `; return
}


async function loadPokedex() {
    pokemonList.innerHTML=""
    const start = (page -1)*itemPerPage + 1;
    const end = page*itemsPerpage
    for (let i = 1; i<=end; i++) {
        const pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon);
    }

    updatePaginationButtons(page)
    return
}

async function searchPokemon(){
    const query = searchInput.ariaValueMax.toLowerCase().trim()
    if (query){
        try {
            const pokemon = await fetchPokemonData(query)
            pokemonList.style.display = 'none'
            showPokemonDetails(pokemon)
        } catch (err) {
            alert('Pokemon no encontrado, intentalo nuevamente')
        }
    } else{
        alert('Por favor ingresa un nombre o un id de pokemon')

    }
}
searchButton.addEventListener("click", searchPokemon)

function updatePaginationButtons(){
    prevButton.disabled = page ===1;
    nextButton.disabled = page === Math.floor(totalPokemons/itemPerPage)
}

nextButton.addEventListener("click", () => {
    currentPage++
    loadPokedex(currentPage);
})

prevButton.addEventListener("click", () => {
    if(currentPage > 1){
        currentPage--
        loadPokedex(currentPage);
    }
})

loadPokedex();
