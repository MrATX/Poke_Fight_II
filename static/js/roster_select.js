function test_connect(pokedex){
    var pokemon = pokedex[0]["pokedex"]
    pokemon.forEach(poke=>{
        var wip = poke.filter(poke_filter)
        console.log(wip)
    })
    console.log(pokemon)
}

function poke_filter(pokemon){
    return pokemon.name === "Charizard"
}

d3.json("pokedex_data").then(pokedex=>  
    test_connect(pokedex)
    )


// var nplayers = document.getElementById("nplayers").innerText
// var npoke = document.getElementById("npoke").innerText
// var weight_class = document.getElementById("weight_class").innerText
// var gen = document.getElementById("gen").innerText
// console.log(nplayers,npoke,weight_class,gen)