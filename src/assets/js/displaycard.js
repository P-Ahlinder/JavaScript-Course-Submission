
const collection_container = document.getElementById("collector")

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
                            <h3 class="pokemon-name">${pokemonObject.name}</h3>
                            </div>
                            `;
    collection_container.appendChild(pokemonEl);
    const remButton = document.createElement('button')
    remButton.textContent = 'Remove 🗑️';
    remButton.addEventListener('click', function () {
      localStorage.removeItem(key)
      location.reload();
      console.log(remButton);
    })
    pokemonEl.querySelector('.info').append(remButton);

  })

}
getFromLocalStorage();

