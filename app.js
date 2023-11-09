// HTML'den gerekli elementleri seç
const poke_container = document.querySelector('.poke-container') // Pokémon kartlarının yer alacağı konteyner
const search = document.querySelector('.search') // Arama bölümü
const searchInput = document.querySelector('.searchInput') // Arama kutusu
const searchBtn = document.querySelector('.searchBtn') // Arama düğmesi

// Toplam Pokémon sayısı
const pokemon_count = 151

// Pokémon türlerine göre arka plan renkleri
const bg_color = {
  grass: '#8BD369',
  fire: '#FF603F',
  water: '#3399FF',
  bug: '#AABB22',
  normal: '#AAAA99',
  flying: '#9AA8FA',
  poison: '#B76EA4',
  electric: '#FFD34E',
  ground: '#E2C56A',
  fairy: '#F1A8EC',
  psychic: '#FF6EA4',
  fighting: '#C56E5C',
  rock: '#C5B679',
  dragon: '#7766EE',
  ice: '#66CCFF',
}

// Arama düğmesine tıklanınca arama bölümünü aç veya kapat
searchBtn.addEventListener('click', () => {
  search.classList.toggle('active')
})

// Arama kutusuna metin girildiğinde filtreleme yap
searchInput.addEventListener('input', (e) => {
  const searchValue = searchInput.value.toLowerCase()
  const pokemonNames = document.querySelectorAll('.poke-name')

  // Her Pokémon kartını başlangıçta görünür yap
  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = 'block'

    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      // Arama metni Pokémon adında bulunmuyorsa kartı gizle
      pokemonName.parentElement.parentElement.style.display = 'none'
    }
  })
})

// Pokémon verilerini çekme işlevi
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i)
  }
}

// Belirli bir Pokémon verisini çekme işlevi
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data)
}

// Pokémon kartı oluşturma işlevi
const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement('div')
  pokemonDiv.classList.add('pokemon')

  const pokemonId = pokemon.id.toString().padStart(3, '0') // Pokémon kimlik numarasını 3 haneli formata getir
  const pokemonType = pokemon.types[0].type.name // Pokémon türünü al
  const pokemonBg = bg_color[pokemonType] // Pokémon türüne göre arka plan rengi

  pokemonDiv.style.backgroundColor = `${pokemonBg}`

  const pokemonInnerHTML = `
    <div class="image-container">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
        alt="Pokemon 1 image"
      />
    </div>
    <div class="poke-info">
      <span class="poke-id">#${pokemonId}</span>
      <h3 class "poke-name">${pokemon.name}</h3>
      <div class="small">
        <small class="poke-exp">
          <i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span>
        </small>
        <small class="poke-weight">
          <i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span>
        </small>
      </div>
      <div class="poke-type">
        <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
      </div>
    </div>
  `

  pokemonDiv.innerHTML = pokemonInnerHTML

  poke_container.appendChild(pokemonDiv) // Oluşturulan Pokémon kartını konteynere ekle
}

// Pokémon verilerini çek ve kartları oluştur
fetchPokemons()