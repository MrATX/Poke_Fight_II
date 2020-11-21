function pokedex_table(pokedex){
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex[0]["pokedex"])
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

d3.json("pokedex_data").then(pokedex=>
    pokedex_table(pokedex)
    )