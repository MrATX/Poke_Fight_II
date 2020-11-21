// Remebering that the easier way is to create a function then just pass in the data to
// hopefully avoid some of the bs I'm dealing with here

function roster_table(pokedex,match_vars){
    var gen = "gen" + String(match_vars[0].gen)
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex[0][gen])
        .enter()
        .append("tr")
        .html(d => `<td><input type="checkbox" value="1" name="roster_check" onchange="limit_checks(name)"></td>
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

function limit_checks(name){
    d3.json("match_vars").then(match_vars=>
        inner_limit_checks(name,match_vars)
        )
}

function inner_limit_checks(name,match_vars){
    var checks = document.getElementsByName(name)
    var k = 0;
    var limit = match_vars[0].npoke;
    for(var i=0, length=checks.length; i<length; i++){
        var poke_row = document.getElementsByTagName("tr")[i+1]
        if(checks[i].checked === true){
            k = k + 1
            poke_row.style.backgroundColor = "aliceblue"
            if(k > limit){
                checks[i].checked = false
                poke_row.style.backgroundColor = "burlywood"
                break;
            }
        }
        else{
            poke_row.style.backgroundColor = "burlywood"
        }
    }
}

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
