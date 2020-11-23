var weight_class = document.getElementById("weight_filter").innerText
var gen = document.getElementById("gen_filter").innerText


function pokedex_table(pokedex){
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex[0]["pokedex"])
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

d3.json("pokedex_data").then(pokedex=>
    pokedex_table(pokedex)
    )