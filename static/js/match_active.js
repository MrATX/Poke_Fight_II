// Remebering that the easier way is to create a function then just pass in the data to
// hopefully avoid some of the bs I'm dealing with here

function roster_table(pokedex,match_vars){
    var gen = "gen" + String(match_vars[0].gen)
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex[0][gen])
        .enter()
        .append("tr")
        .html(d => `<td><input type="radio" name="nplayers" value="1" id="One Player" onchange="radios_val('nplayers',value,id)"></td>
            <td style="font-weight:bold;">${d.name}</td>
            <td>${d.type1}</td>
            <td>${d.total}</td>
            <td>${d.hp}</td>
            <td>${d.attack}</td>
            <td>${d.defense}</td>
            <td>${d.spatk}</td>
            <td>${d.spdef}</td>
            <td>${d.speed}</td>
            <td>${d.generation}</td>`)
}

d3.json("pokedex").then(pokedex=>
    d3.json("match_vars").then(match_vars=>
        roster_table(pokedex,match_vars)
        )
    )


// d3.json("pokedex").then(pokemon=>
//     d3.json("match_vars").then(vars=>
//         a = vars[0].gen,
//         console.log(a),
//         poke = pokemon[0]["gen1"],
//         d3.select("tbody")
//             .selectAll("tr")
//             .data(poke)
//             .enter()
//             .append("tr")
//             .html(poke => `<td>${poke.name}</td>
//                 <td>${poke.type1}</td>
//                 <td>${poke.total}</td>
//                 <td>${poke.hp}<td>
//                 <td>${poke.attack}<td>
//                 <td>${poke.defense}<td>
//                 <td>${poke.spatk}<td>
//                 <td>${poke.spdef}<td>
//                 <td>${poke.speed}<td>
//                 <td>${poke.generation}<td>`),
//         )    
//     );

// d3.select("tbody")
//   .selectAll("tr")
//   .data(austinWeather)
//   .enter()
//   .append("tr");
//   .html(d => `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`);
