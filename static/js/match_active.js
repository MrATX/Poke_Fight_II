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
var p1roster = ["172","237","238","558","559","820"]
var p2name = "iPwn"
var p2roster = ["182","183","184","296","297","843"]
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
// render player rosters with pokeballz
function render_player_roster(data,playerno){
    var roster_div = "#p"+playerno+"rosterdiv"
    var ballz_row_create = "p"+playerno+"pokeballz"
    var ballz_row_grab = "#"+ballz_row_create
    var sprites_row_create = "p"+playerno+"rostersprites"
    var sprites_row_grab = "#"+sprites_row_create
    if(playerno===1){
        var roster_div = "#p1rosterdiv"
        var rosternametext = p1name+"'s Pokemon Roster"
    }
    if(playerno===2){
        var roster_div = "#p2rosterdiv"
        var rosternametext = p2name+"'s Pokemon Roster"
    }
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
    for(var i=0,length=parseInt(npoke);i<length;i++){
        d3.select(ballz_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("img")
            .attr("class","pokeball")
            .attr("src","static/images/pokeball.png")
    }
    for(var i=0,length=parseInt(npoke);i<length;i++){
        console.log(p1roster[i])
        console.log(p2roster[i])
        if(playerno===1){
            var spriteurl = data[0].pokedex[parseInt(p1roster[i])].img_url
        }
        if(playerno===2){
            var spriteurl = data[0].pokedex[parseInt(p2roster[i])].img_url
        }
        d3.select(sprites_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("img")
            .attr("class","activesprite")
            .attr("src",spriteurl)
    }
}

// Create Battle Interface
// d3.select("#battleinterface")

// call functions to render rosters
d3.json("/pokedex_data").then(data=>
    render_player_roster(data,1)
    )
d3.json("/pokedex_data").then(data=>
    render_player_roster(data,2)
    )
