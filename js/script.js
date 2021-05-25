const baseURL = 'https://pokeapi.co/api/v2';
const container = document.querySelector('.poke_container');
const single_container = document.querySelector('.single_poke_container');
const home = document.querySelector('.search_block i');
const search = document.querySelector('.search_input');
let previous = document.querySelector('.previous');
let next = document.querySelector('.next')
const allPokemonsCount = 1118;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    poison: "#98D7A5",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "EAEDA1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5"
}
const main_types = Object.keys(colors);

const getRequest = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${url}`);
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    });

    xhr.addEventListener('error', err => {
        console.log(err);
    });

    xhr.send()
}

getRequest(`${baseURL}/pokemon`, res => {
    previous = res.previous;
    next = res.next;

    res.results.map(item => {
        getRequest(item.url, res => {
            creatPokemonCards(res);
        })

        function creatPokemonCards(pokemon){
            const pokemonEl = document.createElement('div');
            pokemonEl.classList.add('pokemon');
        
            const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
            const poke_types = pokemon.types.map(item => item.type.name);
            const type = main_types.find(el => poke_types.indexOf(el) > -1);
            const color = colors[type];
        
            pokemonEl.style.backgroundColor = color;
        
            let pokemonInner = `
                <div class="img-container">
                    <img src="${pokemon.sprites.other.dream_world.front_default}">
                </div>
                <div class="info">
                    <h3 class="name" style="background: rgba(250, 250, 250, .5)">${name}</h3>
                    <p class="type" style="background: rgba(225, 225, 225, .5)">${type}</p>
                    <button class="more" onclick="singlePokemon('${item.url}')">More</button>
                </div>
            `
        
            pokemonEl.innerHTML = pokemonInner;
            container.append(pokemonEl);
        }
    })
})

home.addEventListener('click', e => {
    e.preventDefault();

    window.location.reload();
})

previous.addEventListener('click', () => {
    if(previous == null){
        alert('Error');
        return;
    }else {
        container.innerHTML = '';
        getRequest(previous, res => {
            previous = res.previous;
            next = res.next;
        
            console.log(res);
        
            res.results.map(item => {
                getRequest(item.url, res => {
                    creatPokemonCards(res);
                })

                function creatPokemonCards(pokemon){
                    const pokemonEl = document.createElement('div');
                    pokemonEl.classList.add('pokemon');
                
                    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
                    const poke_types = pokemon.types.map(item => item.type.name);
                    const type = main_types.find(el => poke_types.indexOf(el) > -1);
                    const color = colors[type];
                
                    pokemonEl.style.backgroundColor = color;
                
                    let pokemonInner = `
                        <div class="img-container">
                            <img src="${pokemon.sprites.other.dream_world.front_default}">
                        </div>
                        <div class="info">
                            <h3 class="name" style="background: rgba(250, 250, 250, .5)">${name}</h3>
                            <p class="type" style="background: rgba(225, 225, 225, .5)">${type}</p>
                            <button class="more" onclick="singlePokemon('${item.url}')">More</button>
                        </div>
                    `
                
                    pokemonEl.innerHTML = pokemonInner;
                    container.append(pokemonEl);
                }
            })
        })
    }
})

next.addEventListener('click', () => {
    if(next == null){
        alert('Error');
        return;
    }else {
        container.innerHTML = '';
        getRequest(next, res => {
            previous = res.previous;
            next = res.next;
        
            console.log(res);
        
            res.results.map(item => {
                getRequest(item.url, res => {
                    creatPokemonCards(res);
                })

                function creatPokemonCards(pokemon){
                    const pokemonEl = document.createElement('div');
                    pokemonEl.classList.add('pokemon');
                
                    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
                    const poke_types = pokemon.types.map(item => item.type.name);
                    const type = main_types.find(el => poke_types.indexOf(el) > -1);
                    const color = colors[type];
                
                    pokemonEl.style.backgroundColor = color;
                
                    let pokemonInner = `
                        <div class="img-container">
                            <img src="${pokemon.sprites.other.dream_world.front_default}">
                        </div>
                        <div class="info">
                            <h3 class="name" style="background: rgba(250, 250, 250, .5)">${name}</h3>
                            <p class="type" style="background: rgba(225, 225, 225, .5)">${type}</p>
                            <button class="more" onclick="singlePokemon('${item.url}')">More</button>
                        </div>
                    `
                
                    pokemonEl.innerHTML = pokemonInner;
                    container.append(pokemonEl);
                }
            })
        })
    }
})

function singlePokemon(pokemon){
    getRequest(pokemon, res => {
        const {name, sprites, height, types, weight, abilities} = res;

        container.innerHTML = '';
        single_container.innerHTML = singlePokemonCard(name, sprites, height, types, weight, abilities);
    })
}

function singlePokemonCard(namel, sprites, height, types, weight, abilities){
    
    const name = namel[0].toUpperCase() + namel.slice(1);

    return `
        <div class="pokemon_single">
            <div class="card_header">
                <h3>${name}</h3>
            </div>
            <div class="card_body">
                <img src="${sprites.other.dream_world.front_default}">
                <img src="${sprites.back_default}">
                <img src="${sprites.back_shiny}">
                <img src="${sprites.front_default}">
                <img src="${sprites.front_shiny}">
                <div class="pokemon_info">
                    <b>Height: </b>
                    <span>${height}</span>
                </div>
                <div class="pokemon_info">
                    <b>Types: </b>
                    <span>${types[0].type.name}</span>
                </div>
                <div class="pokemon_info">
                    <b>Weight: </b>
                    <span>${weight}</span>
                </div>
                <div class="pokemon_info">
                    <b>Abilities: </b>
                    <span>${abilities[0].ability.name}</span>
                </div>
            </div>
        </div>
    `
}