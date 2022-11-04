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
