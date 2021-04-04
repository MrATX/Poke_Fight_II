// Leave Match Check
function leave_match(){
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}
function swap_button(playerno){
    render_player_roster(playerno),
    window.scrollTo(0,0),
    d3.select("#battleinterface")
        .attr("style","visibility:hidden")
    
}
function swap_pokemon(playerno,pokeno){
    if(playerno===1){
        p1active = pokeno
        var swaprosterdiv = "#p1rosterdiv"
    }
    if(playerno===2){
        p2active = pokeno
        var swaprosterdiv = "#p2rosterdiv"
    }
    render_battlecard(playerno)
    console.log(p1active)
    d3.select(swaprosterdiv).html("")
    d3.select("#battleinterface")
        .attr("style","visibility:visible")
    window.scrollTo(0,1000)
}

// WIPWIPWIP VARIABLES - Manual
var npoke = "6"
var p1name = "JDUB"
var p1roster_raw = ["170","237","238","558","559","843"]
var p1roster = {}
// // 820
var p1active = "170"
// var p1rosterHP = []
// var wip_p1rosterHP = {}
// var p1rosterATKS = []
var p2name = "iPwn"
var p2roster_raw = ["182","183","184","296","297","843"]
var p2roster = {}
// // 843
var p2active = "843"
// var p2rosterHP = []
// var wip_p2rosterHP = {}
// var p2rosterATKS = []
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


// Create dictionaries for each player's Pokemon roster to avoid extra API calls
function generate_rosters(data,wiprawroster,wipgenroster){
    for(i in wiprawroster){
        wipgenroster[wiprawroster[i]] = data[0].pokedex[parseInt(wiprawroster[i])]
        wipgenroster[wiprawroster[i]].hpcount = wipgenroster[wiprawroster[i]].hp
        if(wipgenroster[wiprawroster[i]].type2===" - "){
            wipgenroster[wiprawroster[i]].atktotal = 30
            wipgenroster[wiprawroster[i]].atkcount1 = 30
            wipgenroster[wiprawroster[i]].spatktotal = 10
            wipgenroster[wiprawroster[i]].spatkcount1 = 10
        }
        if(wipgenroster[wiprawroster[i]].type2!=" - "){
            wipgenroster[wiprawroster[i]].atktotal = 15
            wipgenroster[wiprawroster[i]].atkcount1 = 15
            wipgenroster[wiprawroster[i]].atkcount2 = 15
            wipgenroster[wiprawroster[i]].spatktotal = 5
            wipgenroster[wiprawroster[i]].spatkcount1 = 5
            wipgenroster[wiprawroster[i]].spatkcount2 = 5
        }
    }
    console.log(wipgenroster)
}
// Render Player Rosters with Pokeballs, Sprites, & Name/HP text
function render_player_roster(playerno){
    var roster_div = "#p"+playerno+"rosterdiv"
    var ballz_row_create = "p"+playerno+"pokeballz"
    var ballz_row_grab = "#"+ballz_row_create
    var sprites_row_create = "p"+playerno+"rostersprites"
    var sprites_row_grab = "#"+sprites_row_create
    var text_row_create = "p"+playerno+"rosterpoketext"
    var text_row_grab = "#"+text_row_create
    if(playerno===1){
        // var roster_div = "#p1rosterdiv"
        var rosternametext = p1name+"'s Pokemon Roster"
        var wipraw = p1roster_raw
        var wiproster = p1roster
    }
    if(playerno===2){
        // var roster_div = "#p2rosterdiv"
        var rosternametext = p2name+"'s Pokemon Roster"
        var wipraw = p2roster_raw
        var wiproster = p2roster
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
    for(i in wipraw){
        if(playerno===1){
            var ballfun = "swap_pokemon("+playerno+",'"+wipraw[i]+"',p1active)"
        }
        if(playerno===2){
            var ballfun = "swap_pokemon("+playerno+",'"+wipraw[i]+"',p2active)"
        }
        d3.select(ballz_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("img")
            .attr("onclick",ballfun)
            .attr("class","pokeball")
            .attr("src","static/images/pokeball.png")
    }
    // for(var i=0,length=parseInt(npoke);i<length;i++){
    //     d3.select(ballz_row_grab)
    //         .append("div")
    //         .attr("class","col-md-2")
    //         .append("img")
    //         .attr("class","pokeball")
    //         .attr("src","static/images/pokeball.png")
    // }
    // Add Pokemon sprites
    for(i in wiproster){
        var spriteurl = wiproster[i].img_url
        if(playerno===1){
            var col_key = "p1col"+String(i)
            var spriteclass = "p1rostersprite"
        }
        if(playerno===2){
            var col_key = "p2col"+String(i)
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
    for(i in wiproster){
        var rosterindex = i
        var rosterpokename = wiproster[i].name
        var rosterpokeHP = "HP - "+wiproster[i].hpcount+" / "+wiproster[i].hp
        d3.select(text_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("p")
            .html(`${rosterpokename}<br>${rosterpokeHP}<br>
                <img id='battletype' src='${wiproster[i].type1img}'>
                <img id='battletype' src='${wiproster[i].type2img}' alt=' - '>`)

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
// Populate Battle Card
function render_battlecard(playerno){
    // Define variables for appropriate player
    if(playerno===1){
        d3.select("#p1battlemain").html("")
        var rosterpokeHP = "HP - "+p1roster[p1active].hpcount+" / "+p1roster[p1active].hp
        var bcroster = p1roster
        var bcactive = p1active
    }
    if(playerno===2){
        d3.select("#p2battlemain").html("")
        var rosterpokeHP = "HP - "+p2roster[p2active].hpcount+" / "+p2roster[p2active].hp
        var bcroster = p2roster
        var bcactive = p2active
    }
    // Main BC variables
    var battlemain = "#p"+playerno+"battlemain"
    var battlecardID = "p"+playerno+"battlecard"
    var battlecardselect = "#p"+playerno+"battlecard"
    var battlesprite = "p"+playerno+"battlesprite"
    var battlecardHP = "p"+playerno+"battlecardHP"
    var bcbuttonsID = "p"+playerno+"buttons"
    var bcbuttonssel = "#"+bcbuttonsID
    // Button variables
    var bcatktype1ID = "p"+playerno+"active_ATKtype1" 
    var bcatktype1sel = "#"+bcatktype1ID
    var bcatktype1text = bcroster[bcactive].atkcount1+" / "+bcroster[bcactive].atktotal
    var bcatktype2ID = "p"+playerno+"active_ATKtype2"
    var bcatktype2sel = "#"+bcatktype2ID
    var bcatktype2text = bcroster[bcactive].atkcount2+" / "+bcroster[bcactive].atktotal
    var bcspatktype1ID = "p"+playerno+"active_SPATKtype1"
    var bcspatktype1sel = "#"+bcspatktype1ID
    var bcspatktype1text = bcroster[bcactive].spatkcount1+" / "+bcroster[bcactive].spatktotal
    var bcspatktype2ID = "p"+playerno+"active_SPATKtype2"
    var bcspatktype2sel = "#"+bcspatktype2ID
    var bcspatktype2text = bcroster[bcactive].spatkcount2+" / "+bcroster[bcactive].spatktotal
    var bcswapbuttonID = "p"+playerno+"pokeswap"
    // Populate main battle card
    d3.select(battlemain)
        .append("span")
        .attr("id",battlecardID)
        .append("img")
        .attr("src",bcroster[bcactive].img_url)
        .attr("id",battlesprite)
    d3.select(battlecardselect)
        .append("div")
        .attr("id",battlecardHP)
        .html(`${bcroster[bcactive].name}<br>${rosterpokeHP}`)
    // P1 Buttons; Attack(s), SP Attack(s), Swap Pokemon
    d3.select(battlecardselect)
        .append("hr")
    d3.select(battlecardselect)
        .append("span")
        .attr("id",bcbuttonsID)
        .append("h2")
        .text("ATTACK")
    // Single Type Pokemon --------------------------
    if(bcroster[bcactive].type2===" - "){
        // Regular Attack
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcatktype1ID)
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcatktype1sel)
            .append("p")
            .text(bcatktype1text)
        // Special Attack
        d3.select(bcbuttonssel)
            .append("hr")
        d3.select(bcbuttonssel)
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcspatktype1ID)
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcspatktype1sel)
            .append("p")
            .text(bcspatktype1text)
    }
    // Dual Type Pokemon --------------------------
    if(bcroster[bcactive].type2!=" - "){
        // Regular Attack Type 1
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcatktype1ID)
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcatktype1sel)
            .append("p")
            .text(bcatktype1text)
        // Regular Attack Type 2
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcatktype2ID)
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type2img)
        d3.select(bcatktype2sel)
            .append("p")
            .text(bcatktype2text)    
        // Special Attack Type 1
        d3.select(bcbuttonssel)
            .append("hr")
        d3.select(bcbuttonssel)
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcspatktype1ID)
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcspatktype1sel)
            .append("p")
            .text(bcspatktype1text)
        // Special Attack Type 2
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcspatktype2ID)
            // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type2img)
        d3.select(bcspatktype2sel)
            .append("p")
            .text(bcspatktype2text)
    }
    // Add Swap Pokemon button at 
    var swapfun = "swap_button("+playerno+")"
    d3.select(bcbuttonssel)
        .append("hr")
    d3.select(bcbuttonssel)
        .append("button")
        .attr("id",bcswapbuttonID)
        .attr("onclick",swapfun)
        // FUNCTION FOR BUTTON !!!!!!!!!!!!!!!!
        .text("Swap Pokemon")    
}
// Aggregate function to ensure array generation first
function sigma_battle_interface(data){
    generate_rosters(data,p1roster_raw,p1roster),
    generate_rosters(data,p2roster_raw,p2roster),
    // render_player_roster(1),
    // render_player_roster(2),
    render_battle_interface(data),
    render_battlecard(1),
    render_battlecard(2)
}
// Call Aggregate Function to render Rosters & Battle interface
d3.json("/pokedex_data").then(data=>
    sigma_battle_interface(data)
    )