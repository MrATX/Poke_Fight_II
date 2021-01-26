// Leave Match Check
function leave_match(){
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}

// WIPWIPWIP VARIABLES - Manual
var npoke = "6"
var p1name = "JDUB"
var p1roster = ["170","237","238","558","559","820"]
var p1active = "238"
var p2name = "iPwn"
var p2roster = ["182","183","184","296","297","843"]
var p2active = "843"
// WIPWIPWIP VARIABLES




// Pull in match setup variables and render player rosters
// grab hidden variables from HTML
// var npoke = document.getElementById("npoke").innerText
// var p1name = document.getElementById("p1name").innerText
// var p1roster_raw = document.getElementsByName("p1roster")
// var p1roster = []
// for(var i=0,length=parseInt(npoke);i<length;i++){
//     p1roster.push(p1roster_raw[i].textContent)
// }
// var p2name = document.getElementById("p2name").innerText
// var p2roster_raw = document.getElementsByName("p2roster")
// var p2roster = []
// for(var i=0,length=parseInt(npoke);i<length;i++){
//     p2roster.push(p2roster_raw[i].textContent)
// }

// Create dictionaries for Pokemon HP for each roster to save HP changes
function generate_rosterhparrays(data){
    for(i in p1roster){
        p1rosterHP[p1roster[i]] = data[0].pokedex[parseInt(p1roster[i])].hp
        p2rosterHP[p2roster[i]] = data[0].pokedex[parseInt(p2roster[i])].hp
    }
}

// Render Player Rosters with Pokeballs, Sprites, & Name/HP text
function render_player_roster(data,playerno){
    var roster_div = "#p"+playerno+"rosterdiv"
    var ballz_row_create = "p"+playerno+"pokeballz"
    var ballz_row_grab = "#"+ballz_row_create
    var sprites_row_create = "p"+playerno+"rostersprites"
    var sprites_row_grab = "#"+sprites_row_create
    var text_row_create = "p"+playerno+"rosterpoketext"
    var text_row_grab = "#"+sprites_row_create
    if(playerno===1){
        var roster_div = "#p1rosterdiv"
        var rosternametext = p1name+"'s Pokemon Roster"
    }
    if(playerno===2){
        var roster_div = "#p2rosterdiv"
        var rosternametext = p2name+"'s Pokemon Roster"
    }
    // Create rows for Player Name, Pokeballs, Sprites, & Text
    d3.select(roster_div)
        .append("div")
        .attr("class","row")
        .append("h1")
        .text(rosternametext)
    d3.select(roster_div)
        .append("div")
        .attr("class","row")
        .attr("id",ballz_row_create)
    d3.select(roster_div)
        .append("div")
        .attr("class","row")
        .attr("id",sprites_row_create)
    d3.select(roster_div)
        .append("div")
        .attr("class","row")
        .attr("id",text_row_create)
    // Add Pokeball images per npoke
    for(var i=0,length=parseInt(npoke);i<length;i++){
        d3.select(ballz_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("img")
            .attr("class","pokeball")
            .attr("src","static/images/pokeball.png")
    }
    // Add Pokemon sprites
    for(var i=0,length=parseInt(npoke);i<length;i++){
        if(playerno===1){
            var col_key = "p1col"+String(i)
            var col_grab = "#"+col_key
            var spriteurl = data[0].pokedex[parseInt(p1roster[i])].img_url
            var spriteclass = "p1rostersprite"
        }
        if(playerno===2){
            var col_key = "p2col"+String(i)
            var col_grab = "#"+col_key
            var spriteurl = data[0].pokedex[parseInt(p2roster[i])].img_url
            var spriteclass = "p2rostersprite"
        }
        d3.select(sprites_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .attr("id",col_key)
            .append("img")
            .attr("class",spriteclass)
            .attr("src",spriteurl)
        // d3.select(col_grab)
        //     .append("div")
        //     .html(`<img id='battletype' src='${data[0].pokedex[parseInt(p1active)].type1img}'>
        //     <img id='battletype' src='${data[0].pokedex[parseInt(p1active)].type2img}' alt=' - '>`)
    }
    // Add Pokemon names and HP
    for(var i=0,length=parseInt(npoke);i<length;i++){
        if(playerno===1){
            var rosterindex = p1roster[i]
            var rosterpokename = data[0].pokedex[parseInt(p1roster[i])].name
            var rosterpokeHP = "HP - "+data[0].pokedex[parseInt(p1roster[i])].hp+" / "+p1rosterHP[p1roster[i]]
        }
        if(playerno===2){
            var rosterindex = p2roster[i]
            var rosterpokename = data[0].pokedex[parseInt(p2roster[i])].name
            var rosterpokeHP = "HP - "+data[0].pokedex[parseInt(p2roster[i])].hp+" / "+p2rosterHP[p2roster[i]]
        }
        d3.select(text_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("p")
            .html(`${rosterpokename}<br>${rosterpokeHP}<br>
                <img id='battletype' src='${data[0].pokedex[parseInt(rosterindex)].type1img}'>
                <img id='battletype' src='${data[0].pokedex[parseInt(rosterindex)].type2img}' alt=' - '>`)
    }
}

// Create Battle Interface
function render_battle_interface(data,p1active,p2active){
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-1")
        .html(`<h2 id='p1battlename'>${p1name}</h2>`)
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-2")
        .attr("id","p1spritebox")
        .append("span")
        .attr("id","p1battlecard")
        .append("img")
        .attr("src",data[0].pokedex[parseInt(p1active)].img_url)
        .attr("id","p1battlesprite")
    var rosterpokeHP = "HP - "+data[0].pokedex[parseInt(p1active)].hp+" / "+p1rosterHP[p1active]
    d3.select("#p1battlecard")
        .append("div")
        .html(`${data[0].pokedex[parseInt(p1active)].name}
                <br>${rosterpokeHP}<br>
                <img id='battletype' src='${data[0].pokedex[parseInt(p1active)].type1img}'>
                <img id='battletype' src='${data[0].pokedex[parseInt(p1active)].type2img}' alt=' - '>`)
        .text(activepokeHP)
    d3.select("#p1battlecard")
        .append("span")
        .attr("id","p1buttons")
}

// Call function to create roster HP arrays
var p1rosterHP = {}
var p2rosterHP = {}
d3.json("/pokedex_data").then(data=>
    generate_rosterhparrays(data),
    )
// call functions to render rosters
d3.json("/pokedex_data").then(data=>
    render_player_roster(data,1)
    )
d3.json("/pokedex_data").then(data=>
    render_player_roster(data,2)
    )
// Call function to render Battle Interface
d3.json("/pokedex_data").then(data=>
    render_battle_interface(data,p1active,p2active)
    )
