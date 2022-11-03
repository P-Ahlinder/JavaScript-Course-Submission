const poke_container = document.getElementById('poke-container');
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
    localStorage.setItem("pokemon", JSON.stringify(pokemon));

    document.getElementById("collection").innerHTML = localStorage.getItem(pokemon);


  })

  pokemonElement.querySelector('.info').append(addButton);





}


loadMore();














