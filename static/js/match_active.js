// Leave Match Check
function leave_match(){
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}


//TESTERZ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// function ipwntesterz(param){
//     if(param==="a"){
//         // var test2 = document.getElementById("p2buttons")
//         // test2.html("")
//         alert("iPwn")
//     }
// }
//TESTERZ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// WIPWIPWIP VARIABLES - Manual
var npoke = "6"
var p1name = "JDUB"
var p1roster = ["170","237","238","558","559","820"]
// // 820
var p1active = "820"
var p1rosterHP = []
var wip_p1rosterHP = {}
var p1rosterATKS = []
var p2name = "iPwn"
var p2roster = ["182","183","184","296","297","843"]
// // 843
var p2active = "843"
var p2rosterHP = []
var wip_p2rosterHP = {}
var p2rosterATKS = []
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
// var p1active = p1roster[2]
// var p2name = document.getElementById("p2name").innerText
// var p2roster_raw = document.getElementsByName("p2roster")
// var p2roster = []
// for(var i=0,length=parseInt(npoke);i<length;i++){
//     p2roster.push(p2roster_raw[i].textContent)
// }
// var p2active = p2roster[1]

// Create dictionaries for Pokemon HP for each roster to save HP changes
function generate_rosterhparrays(data,p1rosterHP,p2rosterHP){
    for(i in p1roster){
        p1rosterHP[p1roster[i]] = data[0].pokedex[parseInt(p1roster[i])].hp
        p2rosterHP[p2roster[i]] = data[0].pokedex[parseInt(p2roster[i])].hp
    }
}
// Create dictionaries for Pokemon Attack Counts to save uses
function generate_atkcountarrays(data,playerno,roster){
    var wiprosteratks = {}
    for(i in roster){
        if(data[0].pokedex[parseInt(roster[i])].type2===" - "){
            wiprosteratks[roster[i]] = [30,"NA",10,"NA"]
        }
        else{
            wiprosteratks[roster[i]] = [15,15,5,5]
        }
    }
    if(playerno===1){
        for(i in wiprosteratks){
            p1rosterATKS[i] = wiprosteratks[i]
        }
    }
    if(playerno===2){
        for(i in wiprosteratks){
            p2rosterATKS[i] = wiprosteratks[i]
        }
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
    var text_row_grab = "#"+text_row_create
    if(playerno===1){
        var roster_div = "#p1rosterdiv"
        var rosternametext = p1name+"'s Pokemon Roster"
    }
    if(playerno===2){
        var roster_div = "#p2rosterdiv"
        var rosternametext = p2name+"'s Pokemon Roster"
    }
    // Clear Roster div
    d3.select(roster_div).html("")
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
            var spriteurl = data[0].pokedex[parseInt(p1roster[i])].img_url
            var spriteclass = "p1rostersprite"
        }
        if(playerno===2){
            var col_key = "p2col"+String(i)
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
    }
    // Add Pokemon names and HP
    for(var i=0,length=parseInt(npoke);i<length;i++){
        if(playerno===1){
            var rosterindex = p1roster[i]
            var rosterpokename = data[0].pokedex[parseInt(p1roster[i])].name
            var rosterpokeHP = "HP - "+p1rosterHP[p1roster[i]]+" / "+data[0].pokedex[parseInt(p1roster[i])].hp
        }
        if(playerno===2){
            var rosterindex = p2roster[i]
            var rosterpokename = data[0].pokedex[parseInt(p2roster[i])].name
            var rosterpokeHP = "HP - "+p2rosterHP[p2roster[i]]+" / "+data[0].pokedex[parseInt(p2roster[i])].hp
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
function render_battle_interface(data){
    // P1 Name column
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-1")
        .html(`<h2 id='p1battlename'>${p1name}</h2>`)
    // Main P1 Battle Interface
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-2")
        .attr("id","p1battlemain")
    // Battle Log
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-6")
        .attr("id","battlelog")
        .append("h3")
        .attr("id","battlelogtitle")
        .text("BATTLE LOG")
    // Battle Log Text Box
    d3.select("#battlelog")
        .append("span")
        .attr("id","battlelogtextspan")
        .append("div")
        .attr("id","battlelogtextbox")
    // TESTERZ PLACEHOLDERS TEXT FOR BATTLE LOG TEXT BOX //////////////////////////////////////////
    for(var i=0,length=50;i<length;i++){
        d3.select("#battlelogtextbox")
            .append("div")
            .attr("class","battletext")
            .text("iPwn")
    }
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("class","battletext")
        .text("I am all that is dev and now lets test the x wise scroll and see how it does with length or maybe plan to make sure the text size fits well enoguh; but what about the mobiles?")
    // TESTERZ PLACEHOLDERS TEXT FOR BATTLE LOG TEXT BOX //////////////////////////////////////////
    
    // Main P2 Battle Interface
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-2")
        .attr("id","p2battlemain")
    // P1 Name column
    d3.select("#battleinterface")
        .append("div")
        .attr("class","col-md-1")
        .html(`<h2 id='p2battlename'>${p2name}</h2>`)
}
// Populate P1 Battle Card
function render_p1battlecard(data){
    d3.select("#p1battlemain")
        .append("span")
        .attr("id","p1battlecard")
        .append("img")
        .attr("src",data[0].pokedex[parseInt(p1active)].img_url)
        .attr("id","p1battlesprite")
    var rosterpokeHP = "HP - "+p1rosterHP[p1active]+" / "+data[0].pokedex[parseInt(p1active)].hp
    d3.select("#p1battlecard")
        .append("div")
        .attr("id","p1battlecardHP")
        .html(`${data[0].pokedex[parseInt(p1active)].name}<br>${rosterpokeHP}`)
    // P1 Buttons; Attack(s), SP Attack(s), Swap Pokemon
    d3.select("#p1battlecard")
        .append("hr")
    d3.select("#p1battlecard")
        .append("span")
        .attr("id","p1buttons")
        .append("h2")
        .text("ATTACK")
    // Single Type Pokemon --------------------------
    if(data[0].pokedex[parseInt(p1active)].type2===" - "){
        var p1active_type1img = data[0].pokedex[parseInt(p1active)].type1img
        var p1active_type1ATKcount = p1rosterATKS[p1active][0] + " / 30"
        var p1active_type1SPATKcount = p1rosterATKS[p1active][2] + " / 10"
        // Regular Attack
        d3.select("#p1buttons")
            .append("button")
            .attr("id","p1active_ATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p1active_type1img)
        d3.select("#p1active_ATKtype1")
            .append("p")
            .text(p1active_type1ATKcount)
        // Special Attack
        d3.select("#p1buttons")
            .append("hr")
        d3.select("#p1buttons")
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select("#p1buttons")
            .append("button")
            .attr("id","p1active_SPATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p1active_type1img)
        d3.select("#p1active_SPATKtype1")
            .append("p")
            .text(p1active_type1SPATKcount)
    }
    // Dual Type Pokemon --------------------------
    if(data[0].pokedex[parseInt(p1active)].type2!==" - "){
        var p1active_type1img = data[0].pokedex[parseInt(p1active)].type1img
        var p1active_type2img = data[0].pokedex[parseInt(p1active)].type2img
        var p1active_type1ATKcount = p1rosterATKS[p1active][0] + " / 15"
        var p1active_type2ATKcount = p1rosterATKS[p1active][1] + " / 15"
        var p1active_type1SPATKcount = p1rosterATKS[p1active][2] + " / 5"
        var p1active_type2SPATKcount = p1rosterATKS[p1active][3] + " / 5"
        // Regular Attacks
        d3.select("#p1buttons")
            .append("button")
            .attr("id","p1active_ATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p1active_type1img)
        d3.select("#p1active_ATKtype1")
            .append("p")
            .text(p1active_type1ATKcount)
        d3.select("#p1buttons")
            .append("button")
            .attr("id","p1active_ATKtype2")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p1active_type2img)
        d3.select("#p1active_ATKtype2")
            .append("p")
            .text(p1active_type2ATKcount)
        // Special Attacks
        d3.select("#p1buttons")
            .append("hr")
        d3.select("#p1buttons")
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select("#p1buttons")
            .append("button")
            .attr("id","p1active_SPATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p1active_type1img)
        d3.select("#p1active_SPATKtype1")
            .append("p")
            .text(p1active_type1SPATKcount)
        d3.select("#p1buttons")
            .append("button")
            .attr("id","p1active_SPATKtype2")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p1active_type2img)
        d3.select("#p1active_SPATKtype2")
            .append("p")
            .text(p1active_type2SPATKcount)
    }
    // Add Swap Pokemon button at end
    d3.select("#p1buttons")
        .append("hr")
    d3.select("#p1buttons")
        .append("button")
        .attr("id","p1pokeswap")
        .text("Swap Pokemon")
}
// Populate P2 Battle Card
function render_p2battlecard(data){
    d3.select("#p2battlemain")
        .append("span")
        .attr("id","p2battlecard")
        .append("img")
        .attr("src",data[0].pokedex[parseInt(p2active)].img_url)
        .attr("id","p2battlesprite")
    var rosterpokeHP = "HP - "+p2rosterHP[p2active]+" / "+data[0].pokedex[parseInt(p2active)].hp
    d3.select("#p2battlecard")
        .append("div")
        .attr("id","p2battlecardHP")
        .html(`${data[0].pokedex[parseInt(p2active)].name}<br>${rosterpokeHP}`)
    // p2 Buttons; Attack(s), SP Attack(s), Swap Pokemon
    d3.select("#p2battlecard")
        .append("hr")
    d3.select("#p2battlecard")
        .append("span")
        .attr("id","p2buttons")
        .append("h2")
        .text("ATTACK")
    // Single Type Pokemon --------------------------
    if(data[0].pokedex[parseInt(p2active)].type2===" - "){
        var p2active_type1img = data[0].pokedex[parseInt(p2active)].type1img
        var p2active_type1ATKcount = p2rosterATKS[p2active][0] + " / 30"
        var p2active_type1SPATKcount = p2rosterATKS[p2active][2] + " / 10"
        // Regular Attack
        d3.select("#p2buttons")
            .append("button")
            .attr("id","p2active_ATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p2active_type1img)
        d3.select("#p2active_ATKtype1")
            .append("p")
            .text(p2active_type1ATKcount)
        // Special Attack
        d3.select("#p2buttons")
            .append("hr")
        d3.select("#p2buttons")
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select("#p2buttons")
            .append("button")
            .attr("id","p2active_SPATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p2active_type1img)
        d3.select("#p2active_SPATKtype1")
            .append("p")
            .text(p2active_type1SPATKcount)
    }
    // Dual Type Pokemon --------------------------
    if(data[0].pokedex[parseInt(p2active)].type2!==" - "){
        var p2active_type1img = data[0].pokedex[parseInt(p2active)].type1img
        var p2active_type2img = data[0].pokedex[parseInt(p2active)].type2img
        var p2active_type1ATKcount = p2rosterATKS[p2active][0] + " / 15"
        var p2active_type2ATKcount = p2rosterATKS[p2active][1] + " / 15"
        var p2active_type1SPATKcount = p2rosterATKS[p2active][2] + " / 5"
        var p2active_type2SPATKcount = p2rosterATKS[p2active][3] + " / 5"
        // Regular Attacks
        // TEST FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var test2fer = "regatk()"
        var test3fer = "spatk()"
        // TEST FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        d3.select("#p2buttons")
            .append("button")
            .attr("id","p2active_ATKtype1")
            // TEST FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            .attr("onclick",test2fer)
            // TEST FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
        d3.select("#p2active_ATKtype1")
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p2active_type1img)
        d3.select("#p2active_ATKtype1")
            .append("p")
            .text(p2active_type1ATKcount)
        d3.select("#p2buttons")
            .append("button")
            .attr("id","p2active_ATKtype2")
            // TEST FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            .attr("onclick",test3fer)
            // TEST FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
        d3.select("#p2active_ATKtype2")
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p2active_type2img)
        d3.select("#p2active_ATKtype2")
            .append("p")
            .text(p2active_type2ATKcount)
        // Special Attacks
        d3.select("#p2buttons")
            .append("hr")
        d3.select("#p2buttons")
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select("#p2buttons")
            .append("button")
            .attr("id","p2active_SPATKtype1")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p2active_type1img)
        d3.select("#p2active_SPATKtype1")
            .append("p")
            .text(p2active_type1SPATKcount)
        d3.select("#p2buttons")
            .append("button")
            .attr("id","p2active_SPATKtype2")
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",p2active_type2img)
        d3.select("#p2active_SPATKtype2")
            .append("p")
            .text(p2active_type2SPATKcount)
    }
    // Add Swap Pokemon button at end
    d3.select("#p2buttons")
        .append("hr")
    d3.select("#p2buttons")
        .append("button")
        .attr("id","p2pokeswap")
        .text("Swap Pokemon")
}
// Aggregate function to ensure array generation first
function sigma_battle_interface(data){
    generate_rosterhparrays(data,p1rosterHP,p2rosterHP),
    p1rosterHP["238"] = 85,
    p2rosterHP["843"] = 100,
    generate_atkcountarrays(data,1,p1roster),
    generate_atkcountarrays(data,2,p2roster),
    render_player_roster(data,1),
    render_player_roster(data,2),
    render_battle_interface(data),
    render_p1battlecard(data),
    render_p2battlecard(data)
}
// Call Aggregate Function to render Rosters & Battle interface
d3.json("/pokedex_data").then(data=>
    sigma_battle_interface(data)
    )