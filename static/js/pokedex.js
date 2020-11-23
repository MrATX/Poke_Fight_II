function pokedex_table(pokedex){
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex)
        .enter()
        .append("tr")
        .html(d => `<td id="poketablerow">${d.num}</td>
            <td id="poketablerow"><img src='${d.img_url}' id="pokeimg"></td>
            <td id="poketablerow">${d.name}</td>
            <td id="poketablerow" style="font-weight:normal;"><img src="${d.type1img}" id="typeimg_pokedex"><br>${d.type1}</td>
            <td id="poketablerow" style="font-weight:normal;"><img src="${d.type2img}" alt="" id="typeimg_pokedex"><br>${d.type2}</td>
            <td id="poketablerow"><u>${d.total}</u></td>
            <td id="poketablerow">${d.hp}</td>
            <td id="poketablerow">${d.attack}</td>
            <td id="poketablerow">${d.defense}</td>
            <td id="poketablerow">${d.spatk}</td>
            <td id="poketablerow">${d.spdef}</td>
            <td id="poketablerow">${d.speed}</td>
            <td id="poketablerow">${d.generation}</td>
            <td id="poketablerow">${d.legendary}`)
}

function pokedex_filter(){
    d3.json("pokedex_data").then(pokedex=>
        pokedex_table_filtered(pokedex)
        )
}

function pokedex_table_filtered(pokedex){
    tbody = d3.select("tbody");
    tbody.html("")
    var weight_class = document.getElementById("weight_filter").value
    var gen = document.getElementById("gen_filter").value
    var pokedex = pokedex[0]["pokedex"]
    let weight_class_vars = {
        "feather":[0,250],
        "light":[250,350],
        "middle":[350,500],
        "heavy":[500,1000],
        "legendary":[0,1000],
        "all":[0,1000]
    }
    var str_min = weight_class_vars[weight_class][0]
    var str_max = weight_class_vars[weight_class][1]
    if(gen==="all"){
        var gen_var = [1,2,3,4,5,6]
    }
    if(gen!="all"){
        var gen_var = gen
    }
    var legend_var = [" - "]
    if(weight_class==="all"){
        legend_var = ["Legendary"," - "]
    }
    if(weight_class==="legendary"){
        legend_var = ["Legendary"]
    }
    var match_roster = []
    var k = 0
    pokedex.forEach(pokemon=>{
        if(
            pokemon.total >= str_min &&
            pokemon.total < str_max &&
            gen_var.includes(pokemon.generation) &&
            legend_var.includes(pokemon.legendary)
        ){
            pokemon.tableindex = k
            k = k + 1
            match_roster.push(pokemon)
        }
    })
    pokedex_table(match_roster)
}

d3.json("pokedex_data").then(pokedex=>
    pokedex_table(pokedex[0]["pokedex"])
    )