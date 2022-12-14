const poke_container = document.getElementById('poke-container');
const addmorebtn = document.getElementById('addContent');
addmorebtn.addEventListener("click", loadMore);
let start = 1
let end = 20

function loadMore() {
  for (let i = start; i <= end; i++) {
    getPokemon(i);
  }
  start += 20
  end += 20
}

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
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
  addButton.style.background = "green";
  addButton.addEventListener('click', function () {
    localStorage.setItem(randomID(), JSON.stringify(pokemon));
    pokeCounter();
  })
  pokemonElement.querySelector('.info').append(addButton);
}

function randomID() {
  const id = Math.random().toString(36).substr(2, 9);
  return id;
}

function onLoadPokemonCount() {
  let pokeNumbers = sessionStorage.getItem('pokemonCounter')
  if (pokeNumbers) {
    document.querySelector('.collect-container span').textContent = pokeNumbers;
  }
}

function pokeCounter() {
  let pokeNumbers = sessionStorage.getItem('pokemonCounter')
  pokeNumbers = parseInt(pokeNumbers);

  if (pokeNumbers) {
    sessionStorage.setItem('pokemonCounter', pokeNumbers + 1);
    document.querySelector('.collect-container span').textContent = pokeNumbers + 1;
  } else {
    sessionStorage.setItem('pokemonCounter', 1);
    document.querySelector('.collect-container span').textContent = 1;
  }
}


onLoadPokemonCount();
loadMore();














