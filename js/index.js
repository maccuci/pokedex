const pokemonName = document.querySelector('.pokemon-name'),
      pokemonNumber = document.querySelector('.pokemon-number'),
      pokemonImage = document.querySelector('.pokemon-image');

const Form = document.querySelector('.form'),
      Input = document.querySelector('.input-search'),
      PreviousButton = document.querySelector('.btn-prev'),
      NextButton = document.querySelector('.btn-next');

let fetchPokemonID = 1;

async function fetchPokemon(pokemon) {
  const PokeAPIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (PokeAPIResponse.status === 200)
    return await PokeAPIResponse.json();
}

async function renderFetchedPokemon(pokemon) {
  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    Input.value = '';
    fetchPokemonID = data.id;
  } else {
    alert('Não foi possível encontrar este pokemon!');
    renderFetchedPokemon(1);
  }
}

Form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderFetchedPokemon(Input.value.toLowerCase());
});

PreviousButton.addEventListener('click', () => {
  if (fetchPokemonID > 1) {
    fetchPokemonID -= 1;
    renderFetchedPokemon(fetchPokemonID);
  } else {
    alert('Não é possível ter uma página menor que 1.')
  }
});

NextButton.addEventListener('click', () => {
  fetchPokemonID += 1;
  renderFetchedPokemon(fetchPokemonID);
});

renderFetchedPokemon(fetchPokemonID);
