const poke_container = document.getElementById('poke-container');
const addmorebtn = document.getElementById('addContent');
addmorebtn.addEventListener("click", loadMore);
let start = 1
let end = 20

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
}

function loadMore() {
  for (let i = start; i <= end; i++) {
    getPokemon(i);
  }
  start += 20
  end += 20
}

function createPokemonCard(pokemon) {
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add('pokemon');
  pokemonElement.innerHTML = `
                            <div class="img-container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
                            </div>
                            <div class="info">
                            <span class="number">#${pokemon.id}</span>
                            <h4 class="pokemon-name">${pokemon.name}</h4>
                            <h5 class="pokemon-name">Height: ${pokemon.height} ft</h5>
                            <h5 class="pokemon-name">Weight: ${pokemon.weight} lb</h5>
                            </div>
                            `;
  poke_container.appendChild(pokemonElement);

  const addButton = document.createElement('button')
  addButton.textContent = 'Add ➕';
  addButton.addEventListener('click', function () {
    localStorage.setItem(pokemon.id, JSON.stringify(pokemon));
    pokeCounter();
  })
  pokemonElement.querySelector('.info').append(addButton);
}

function onLoadPokemonCount() {
  let pokeNumbers = localStorage.getItem('pokemonCounter')
  if (pokeNumbers) {
    document.querySelector('.collect-container span').textContent = pokeNumbers;
  }
}

function pokeCounter() {
  let pokeNumbers = localStorage.getItem('pokemonCounter')
  pokeNumbers = parseInt(pokeNumbers);

  if (pokeNumbers) {
    localStorage.setItem('pokemonCounter', pokeNumbers + 1);
    document.querySelector('.collect-container span').textContent = pokeNumbers + 1;
  } else {
    localStorage.setItem('pokemonCounter', 1);
    document.querySelector('.collect-container span').textContent = 1;
  }
}
onLoadPokemonCount();
loadMore();














