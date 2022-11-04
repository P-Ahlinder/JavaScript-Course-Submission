const poke_container = document.getElementById('poke-container');
const collection_container = document.getElementById('collection')
const addmorebtn = document.getElementById('addContent');
addmorebtn.addEventListener("click", loadMore);


async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
}

let start = 1
let end = 20

function loadMore() {
  for (let i = start; i <= end; i++) {
    getPokemon(i);
  }

  start += 20
  end += 20
}

const collection = [];

function createPokemonCard(pokemon) {
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add('pokemon');
  pokemonElement.innerHTML = `
                            <div class="img-container">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="picture showing a pokemon">
                            </div>
                            <div class="info">
                            <span class="number">#${pokemon.id}</span>
                            <h3 class="pokemon-name">${pokemon.name}</h3>
                            </div>
                            `;

  poke_container.appendChild(pokemonElement);


  const addButton = document.createElement('button')
  addButton.textContent = 'Add ➕';
  addButton.addEventListener('click', function () {
    collection.push(pokemon);
    localStorage.setItem('pokemon', JSON.stringify(pokemon))
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


function displayCollection() {
  let pokemonCard = localStorage.getItem('pokemon');
  pokemonCard = JSON.parse(pokemonCard);

  let pokemonCollection = document.querySelector(".collection-container");
  if (pokemonCard && pokemonCollection) {
    pokemonCollection.innerHTML = '';
    Object.values(pokemonCard).map(pokemon => {
      pokemonCollection.innerHTML += `
                            <div class="img-container">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="picture showing a pokemon">
                            </div>
                            <div class="info">
                            <span class="number">#${pokemon.id}</span>
                            <h3 class="pokemon-name">${pokemon.name}</h3>
                            </div>`
    })
  }
}
displayCollection();
onLoadPokemonCount();
loadMore();














