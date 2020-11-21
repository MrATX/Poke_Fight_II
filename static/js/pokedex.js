function roster_table(pokedex,match_vars){
    var gen = "gen" + String(match_vars[0].gen)
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex[0]["master"])
        .enter()
        .append("tr")
        .html(d => `<td>${d.num}</td>
            <td><img src='${d.img_url}' width="150px"></td>
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

d3.json("roster_master").then(pokedex=>
    d3.json("match_vars").then(match_vars=>
        roster_table(pokedex,match_vars)
        )
    )

d3.json("match_vars").then(match_vars=>
    window.poke_limit = match_vars[0].npoke
    )

function limit_checks(name,gen_index){
    var checks = document.getElementsByName(name)
    var k = 0;
    for(var i=0, length=checks.length; i<length; i++){
        var poke_row = document.getElementsByTagName("tr")
        if(checks[i].checked === true){
            k = k + 1
            poke_row[i + 1].style.backgroundColor = "lightsalmon"
        }
        else{
            poke_row[i + 1].style.backgroundColor = "burlywood"
        }
    }
    if(k > poke_limit){
        cur_row = parseInt(gen_index) + 1
        checks[gen_index].checked = false
        poke_row[cur_row].style.backgroundColor = "burlywood"
    }
}

function show_roster(){
    var roster_table = document.getElementById('roster_table')
    roster_table.style.display = "table"
    var roster_title = document.getElementById("roster_head")
    roster_title.style.display = "block"
}