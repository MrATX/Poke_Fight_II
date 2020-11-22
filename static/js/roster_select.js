var nplayers = document.getElementById("nplayers").innerText
var npoke = document.getElementById("npoke").innerText
var weight_class = document.getElementById("weight_class").innerText
var gen = document.getElementById("gen").innerText

function poke_filter(pokedex){
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
    var data = match_roster
    d3.select("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .html(d => `<td><input type="checkbox" value="${d.tableindex}" name="roster_check" onchange="limit_checks(name,value)"></td>
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
        <td>${d.legendary}</td>`)
}

function roster_table(){
    var p1name = document.getElementById('p1name').value
    if(p1name!=""){
        d3.json("pokedex_data").then(pokedex=>  
            poke_filter(pokedex)
            )
        var p1table = document.getElementById('p1tablejumbo')
        p1table.style.display = "table"
        var p1header = document.getElementById('p1jumbo')
        p1header.style.display = "none"
    }
    else{
        alert("Please enter your name")
    }
}

function limit_checks(name,row_index){
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
    if(k > npoke){
        cur_row = parseInt(row_index) + 1
        checks[row_index].checked = false
        poke_row[cur_row].style.backgroundColor = "burlywood"
    }
}






