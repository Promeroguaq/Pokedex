const pokemonList = document.getElementById("pokemon-list");

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
    `;
    
    pokemonList.appendChild(pokemonCard);
}

async function loadPokedex() {
    for (let i = 1; i <= 50; i++) {
        const pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon);
    }
    return
}

loadPokedex();
