// Grab Match Setup variables from HTML
var nplayers = document.getElementById("nplayers").innerText
var npoke = document.getElementById("npoke").innerText
var weight_class = document.getElementById("weight_class").innerText
var gen = document.getElementById("gen").innerText
// Populate P1 name prompt text
document.getElementsByClassName("playernameprompt")[0].textContent = "Player 1, please input your name!"
// Populate P1 proceed button text based on number of players
if(nplayers==="1"){
    document.getElementById("p1continue").innerText = "Begin Match"
    document.getElementsByClassName("p1rosterprompt").innerText = "iPwn"
}
else{
    document.getElementById("p1continue").innerText = "Continue"
    document.getElementsByClassName("p1rosterprompt").innerText = "CONTINUE"
}
// Function for when Player 1 clicks the proceed button after inputting name
function p1_name_proceed(){
    var p1name = document.getElementById("p1name_input").value
    console.log(p1name)
    document.getElementById("p1name").innerText =  p1name
}
// Function for when Player 1 clicks the proceed button after selecting roster
function p1_roster_proceed(){
    var p1roster_selections = document.querySelector('.messageCheckbox:checked').value;
    console.log(p1roster_selections)
}
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
        var gen_var = [1,2,3,4,5,6,7,8]
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
    .html(d => `<td id="poketablerow"><input type="checkbox" value="${d.tableindex}" name="roster_check" onchange="limit_checks(name,value)"></td>
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






