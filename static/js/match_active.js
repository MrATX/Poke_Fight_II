// Remebering that the easier way is to create a function then just pass in the data to
// hopefully avoid some of the bs I'm dealing with here


d3.json("pokedex").then(pokemon=>
    d3.json("match_vars").then(vars=>
        a = vars[0].gen,
        console.log(a),
        poke = pokemon[0]["gen1"],
        d3.select("tbody")
            .selectAll("tr")
            .data(poke)
            .enter()
            .append("tr")
            .html(poke => `<td>${poke.name}</td>
                <td>${poke.type1}</td>
                <td>${poke.total}</td>
                <td>${poke.hp}<td>
                <td>${poke.attack}<td>
                <td>${poke.defense}<td>
                <td>${poke.spatk}<td>
                <td>${poke.spdef}<td>
                <td>${poke.speed}<td>
                <td>${poke.generation}<td>`),
        )    
    );

// d3.select("tbody")
//   .selectAll("tr")
//   .data(austinWeather)
//   .enter()
//   .append("tr");
//   .html(d => `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`);
