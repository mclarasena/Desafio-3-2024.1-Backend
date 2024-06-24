const baseUrl = 'https://pokeapi.co/api/v2';
let pokemonList = [];
let currentPokemonIndex = 0;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

const fetchPokemonList = async () => {
  const url = `${baseUrl}/pokemon/?offset=0&limit=151`; // Limitado aos primeiros 151 Pokémons (Geração 1)
  const data = await fetchData(url);
  pokemonList = data.results;
  console.log('Lista de Pokémons carregada:', pokemonList);
  showCurrentPokemon();
};

const fetchPokemonDetails = async (pokemonName) => {
  const url = `${baseUrl}/pokemon/${pokemonName}`;
  const data = await fetchData(url);
  return data;
};

const showCurrentPokemon = async () => {
  const pokemonData = await fetchPokemonDetails(pokemonList[currentPokemonIndex].name);
  
  const pokemonName = pokemonData.name;
  const pokemonImage = pokemonData.sprites.front_default;
  const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
  const gameVersions = pokemonData.game_indices.map(game => game.version.name).join(', ');
  
  document.getElementById('pokemon-name').textContent = pokemonName;
  document.getElementById('pokemon-image').src = pokemonImage;
  document.getElementById('pokemon-abilities').textContent = `Habilidades: ${abilities}`;
  document.getElementById('pokemon-versions').textContent = `Versões dos jogos: ${gameVersions}`;
};

const nextPokemon = () => {
  currentPokemonIndex = (currentPokemonIndex + 1) % pokemonList.length;
  showCurrentPokemon();
};

const previousPokemon = () => {
  currentPokemonIndex = (currentPokemonIndex - 1 + pokemonList.length) % pokemonList.length;
  showCurrentPokemon();
};

// Iniciar a Pokedex ao carregar a página
fetchPokemonList();
