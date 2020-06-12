'use strict'

var pokedex = document.querySelector('#pokedex');
var header = document.querySelector('#busqueda');
var search = document.querySelector('#search');
var regionhtml = document.querySelector('.region');

// console.log(pokedex);
var box = [];
var pokeCache = [];
var url = '';
var contador;


var buscarPokemon = async ()=>{
    try{
        var url = `https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}/`;
    // console.log(url);
        var res =  await fetch(url);
        var data = await res.json();
        // console.log(data);
        display(data);

    }catch(error){
        alert('Hubo un error, escribe el pokemon de nuevo');
    }
    
        
}




var comprobarRegion =(region) => {


    if (region == 'Kanto') {

        url = `https://pokeapi.co/api/v2/pokemon?limit=151`;

        contador = 1;

    } else if (region == 'Johto') {
        url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=151`;

        contador = 152;

    } else if (region == 'Hoenn') {
        url = `https://pokeapi.co/api/v2/pokemon?limit=135&offset=251`;
        // console.log(url);
        contador = 252;

    } else if (region == 'Sinnoh') {
        url = `https://pokeapi.co/api/v2/pokemon?limit=106&offset=386`;
        contador = 387;
    }
    else {
        return false;
    }
 
    // console.log(url);
    fetchPokemon(url, contador);
}


var fetchPokemon = async (conexion, index) => {
   try{
    var url = conexion;
    // console.log(url);
    var res = await fetch(url);
    var data = await res.json();
    box.push(data);
    console.log(box);

    const pokemon = data.results.map((data, i) => ({
        name: data.name,
        id: index + i,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + i}.png`,
    }));
    // console.log(pokemon);
    
    displayPokemon(pokemon);
   }catch(error){
       return false;
       alert('Hubo un error, escribe el pokemon de nuevo');
   }
};


const displayPokemon = (pokemon) => {
    // console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onclick="newFetch(${pokeman.id})">
            <img class ="card-image" src="${pokeman.image}"/>
            <h2 class="card-title" >${pokeman.id}. ${pokeman.name}</h2>
           
        </li>`
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const newFetch = async (i) => {
    if (!pokeCache[i]) {
        var url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        var data = await fetch(url);
        var poke = await data.json();
        pokeCache[i] = poke;
        console.log(pokeCache);
        display(poke);
    } else {
        display(pokeCache[i]);
    }


}

function display(pokeman) {
    const type = pokeman.types.map(type => type.type.name).join(", ");
    const pokemonHTMLString = `

        <div class= "popup">
            <button id= "closebtn" onclick= closePopup()>Cerrar</button>
            <div class = "card">
                <img class = "card-image" src = "${pokeman.sprites.front_default}"  />
                <h2 class = "card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p class = "card-subititle"><small>Type: ${type} | Height: ${pokeman.height} |  Weight: ${pokeman.weight}</small></p>
                <a  href= "https://pokemon.fandom.com/es/wiki/${pokeman.name}" id="link">Conoceme!</a>
            </div>
        </div>
    `;

    pokedex.innerHTML = pokemonHTMLString + pokedex.innerHTML;


}

const closePopup = () => {
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}

// fetchPokemon();