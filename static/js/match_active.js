// Remebering that the easier way is to create a function then just pass in the data to
// hopefully avoid some of the bs I'm dealing with here

function roster_table(pokedex,match_vars){
    // var gen = "gen" + match_vars[0].gen
    // var gen_names = gen + "_names"
    // var roster = pokedex[0][gen].Charizard
    // var roster_names = pokedex[0].gen_name_lists[gen_names]
    // console.log(roster.name)
    console.log(pokedex[0].gen1)
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex[0].gen1)
        .enter()
        .append("tr")
        .html(d => `<td>${d.name}</td>
            <td>${d.type1}</td>`);
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
