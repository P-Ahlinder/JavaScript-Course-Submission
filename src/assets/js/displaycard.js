const collection_container = document.getElementById("collector");
function getFromLocalStorage() {
  let pokemonID;
  let pokemonObject;
  Object.keys(localStorage).forEach(function (key) {
    pokemonID = localStorage.getItem(key);
    pokemonObject = JSON.parse(pokemonID);

    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add('pokemon');
    pokemonEl.innerHTML = `
                            <div class="img-container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonObject.id}.png">
                            </div>
                            <div class="info">
                            <span class="number">#${pokemonObject.id}</span>
                            <h4 class="pokemon-name">${pokemonObject.name}</h4>
                            <h5 class="pokemon-name">Height: ${pokemonObject.height} ft</h5>
                            <h5 class="pokemon-name">Weight: ${pokemonObject.weight} lb</h5>
                            </div>
                            `;
    collection_container.appendChild(pokemonEl);

    const remButton = document.createElement('button')
    remButton.style.background = "red";
    remButton.textContent = 'Remove 🗑️';
    remButton.addEventListener('click', function () {
      localStorage.removeItem(key)
      alert("The card has been removed from your collection");
      location.reload();

      let pokeNumbers = sessionStorage.getItem('pokemonCounter')
      pokeNumbers = parseInt(pokeNumbers);

      if (pokeNumbers) {
        sessionStorage.setItem('pokemonCounter', pokeNumbers - 1);
        document.querySelector('.collect-container span').textContent = pokeNumbers - 1;
      } else {
        sessionStorage.setItem('pokemonCounter', 1);
        document.querySelector('.collect-container span').textContent = 1;
      }
    })

    pokemonEl.querySelector('.info').append(remButton);
  })
}

function onLoadPokemonCount() {
  let pokeNumbers = sessionStorage.getItem('pokemonCounter')
  if (pokeNumbers) {
    document.querySelector('.collect-container span').textContent = pokeNumbers;
  }
}
getFromLocalStorage();
onLoadPokemonCount();


