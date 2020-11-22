var nplayers = document.getElementById("nplayers").innerText
var npoke = document.getElementById("npoke").innerText
var weight_class = document.getElementById("weight_class").innerText
var gen = document.getElementById("gen").innerText

function poke_filter(data){
    var pokedex = data[0]["pokedex"]
    console.log(pokedex)
    var match_roster = []
    pokedex.forEach(pokemon=>{
        if(pokemon.total >= 420 && pokemon.type1 == "Water"){
            match_roster.push(pokemon)
        }
    })
    var data = match_roster
    d3.select("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .html(d => `<td>${d.num}</td>
        <td><img src='${d.img_url}' width="150px"></td>
        <td style="font-weight:bold;">${d.name}</td>
        <td>${d.type1}</td>
        <td>${d.type2}</td>
        <td>${d.total}</td>
        <td>${d.hp}</td>
        <td>${d.attack}</td>
        <td>${d.defense}</td>
        <td>${d.spatk}</td>
        <td>${d.spdef}</td>
        <td>${d.speed}</td>
        <td>${d.generation}</td>
        <td>${d.legendary}`)
}

function roster_table(){
    d3.json("pokedex_data").then(pokedex=>  
        poke_filter(pokedex)

        )    
}




