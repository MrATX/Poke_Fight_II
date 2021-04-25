// WIPWIPWIP VARIABLES - Manual
var npoke = "6"
var p1name = "JDUB"
var p1roster_raw = ["170","237","238","558","559","843"]
var p1roster = {}
// // 820
var p1active = "559"
// var p1rosterHP = []
// var wip_p1rosterHP = {}
// var p1rosterATKS = []
var p2name = "iPwn"
var p2roster_raw = ["182","183","184","296","297","820"]
var p2roster = {}
// // 843
var p2active = "296"
// var p2rosterHP = []
// var wip_p2rosterHP = {}
// var p2rosterATKS = []
// WIPWIPWIP VARIABLES




// Pull in match setup variables from POST
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
// Utility Functions -----------------------------------------------------------------------
// Leave Match Check
function leave_match(){
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}
// Generate players' rosters as dicts of dicts ----------------------------------------------
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
}
// Generate Type Matchups Object ----------------------------------------------
var typematchups_object = []
// function generate_typematchups(){
//     d3.json("/combat_vars").then(combat_vars=>
//         typematchups_object = combat_vars[0].type_matchups,
//         console.log(combat_vars[0].type_matchups)
//         )
//     console.log(typematchups_object)   
// }
function generate_typematchups(combat_vars){
    typematchups_object = combat_vars[0].type_matchups
    console.log(combat_vars[0].type_matchups)
    console.log(typematchups_object)
}
// KO'd Text function
function KOd_text(name){
    console.log(name)
    var text = name+" is KO'd. Select a different pokemon"
    alert(text)
}



// Button Functions -------------------------------------------------------------------------
// *********************** Swap Pokemon ***********************
// swap button function
function swap_button(playerno){
    render_player_roster(playerno),
    window.scrollTo(0,0),
    d3.select("#battleinterface")
        .attr("style","visibility:hidden")
}
// text gen for pokeball/sprite swap function
function swap_pokemon_text(playerno,prevpokno){
    if(playerno===1){
        var pokeballfunctiontext = p1name+" withdrew "+p1roster[prevpokno].name+" and sent out "+p1roster[p1active].name
        var textclass = "p1battletext"
    }
    if(playerno===2){
        var pokeballfunctiontext = p2name+" withdrew "+p2roster[prevpokno].name+" and sent out "+p2roster[p2active].name
        var textclass = "p2battletext"
    }
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("id",textclass)
        .attr("class","battletext")
        .text(pokeballfunctiontext)
    var scrolldown = document.getElementById("battlelogtextbox")
    scrolldown.scrollTop = scrolldown.scrollHeight
}
// pokeball/sprite swap function
function swap_pokemon(playerno,pokeno){
    if(playerno===1){
        prevpokno = p1active
        p1active = pokeno
        var swaprosterdiv = "#p1rosterdiv"
    }
    if(playerno===2){
        prevpokno = p2active
        p2active = pokeno
        var swaprosterdiv = "#p2rosterdiv"
    }
    render_battlecard(playerno)
    swap_pokemon_text(playerno,prevpokno)
    d3.select(swaprosterdiv).html("")
    d3.select("#battleinterface")
        .attr("style","visibility:visible")
    window.scrollTo(0,58)
}
// *********************** Attack ***********************
function test_attack(){
    var DEFroster = p2roster
    var DEFactive = p2active
    p2roster[p2active].hpcount = p2roster[p2active].hpcount - 10
    var DEFpokehp = "HP - "+DEFroster[DEFactive].hpcount+" / "+DEFroster[DEFactive].hp
    console.log(p2roster)
    d3.select("#p2battlecardHP")
        .html(`${DEFroster[DEFactive].name}<br>${DEFpokehp}`)
}
// text gen for attacks
function attack_text(attacker_no,attacktext){
    if(attacker_no===1){
        // var pokeballfunctiontext = p1name+" withdrew "+p1roster[prevpokno].name+" and sent out "+p1roster[p1active].name
        var textclass = "p1battletext"
    }
    if(attacker_no===2){
        // var pokeballfunctiontext = p2name+" withdrew "+p2roster[prevpokno].name+" and sent out "+p2roster[p2active].name
        var textclass = "p2battletext"
    }
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("id",textclass)
        .attr("class","battletext")
        .text(attacktext)
    var scrolldown = document.getElementById("battlelogtextbox")
    scrolldown.scrollTop = scrolldown.scrollHeight
}
// Attack
// atkno and defno are 1 or 2 to denote which player is which for the attack
// typeno is 1 or 2 to denote which element
// atktype reg or sp to denote regular or special attack
function attack(attacker_no,atktype_no,atktype){
    if(attacker_no===1){
        var ATKroster = p1roster
        var ATKactive = p1roster[p1active]
        var DEFroster = p2roster
        var DEFactive = p2roster[p2active]
        console.log("P1 attacking")
    }
    if(attacker_no===2){
        var ATKroster = p2roster
        var ATKactive = p2roster[p2active]
        var DEFroster = p1roster
        var DEFactive = p1roster[p1active]
        console.log("P2 attacking")
    }
    var damagetexthold = DEFactive.hpcount
    if(atktype==="reg"){
        if(atktype_no===1){
            if(ATKactive.atkcount1===0){
                alert("No more moves for this attack")
                return
            }
        }
        if(atktype_no===2){
            if(ATKactive.atkcount2===0){
                alert("No more moves for this attack")
                return
            }
        }
    }
    if(atktype==="sp"){
        if(atktype_no===1){
            if(ATKactive.spatkcount1===0){
                alert("No more moves for this attack")
                return
            }
        }
        if(atktype_no===2){
            if(ATKactive.spatkcount2===0){
                alert("No more moves for this attack")
                return
            }
        }
    }
    if(atktype==="reg"){
        var atkstat = ATKactive.attack
        var defstat = DEFactive.defense
    }
    if(atktype==="sp"){
        var atkstat = ATKactive.spatk
        var defstat = DEFactive.spdef
    }
    if(atktype_no===1){
        var attacker_type = ATKactive.type1 
    }
    if(atktype_no===2){
        var attacker_type = ATKactive.type2
    }
    if(ATKactive.type2===" - "){
       var coeff = typematchups_object[attacker_type][DEFactive.type1].coeff
    }
    if(ATKactive.type2!=" - "){
        var coeff = (typematchups_object[attacker_type][DEFactive.type1].coeff)*(typematchups_object[attacker_type][DEFactive.type2].coeff)
    }
    // Damage Calculation
    var damage = Math.round((atkstat*coeff)*(1-(defstat/230)))
    console.log(damage)
    // Create variables impact
    if((DEFactive.hpcount - damage) > 0){
        DEFactive.hpcount = DEFactive.hpcount - damage
    }
    else{
        DEFactive.hpcount = 0
    }
    if(atktype==="reg"){
        if(atktype_no===1){
            ATKactive.atkcount1 = ATKactive.atkcount1 - 1
        }
        if(atktype_no===2){
            ATKactive.atkcount2 = ATKactive.atkcount2 - 1
        }
    }
    if(atktype==="sp"){
        if(atktype_no===1){
            ATKactive.spatkcount1 = ATKactive.spatkcount1 -1
        }
        if(atktype_no===2){
            ATKactive.spatkcount2 = ATKactive.spatkcount2 -1
        }
    }
    // Assign variables impact
    if(attacker_no===1){
        p1roster[p1active] = ATKactive
        p2roster[p2active] = DEFactive
    }
    if(attacker_no===2){
        p1roster[p1active] = DEFactive
        p2roster[p2active] = ATKactive
    }
    // Apply variables impact
    render_battlecard(1)
    render_battlecard(2)
    // Generate and post attack text
    var coefftext = "Ineffective"
    if(coeff===0.25){
        var coefftext = "Berely Effective"
    }
    if(coeff===0.5){
        var coefftext = "Mildly Effective"
    }
    if(coeff===1){
        var coefftext = "Effective"
    }
    if(coeff===2){
        var coefftext = "Very Effective"
    }
    if(coeff===4){
        var coefftext = "Super Effective"
    }
    console.log(coefftext)
    var damagetext = damage
    if(DEFactive.hpcount===0){
        var damagetext = damagetexthold
    }
    if(atktype==="reg"){
        var attacktext = ATKactive.name+" attacked "+DEFactive.name+" for "+damagetext+" damage. It was "+coefftext
    }
    if(atktype==="sp"){
        var attacktext = ATKactive.name+" used a special attack on "+DEFactive.name+" for "+damagetext+" damage. It was "+coefftext
    }
    attack_text(attacker_no,attacktext)
}
// HTML Rendering Functions -----------------------------------------------------------------
// Render Player Rosters with Pokeballs, Sprites, & Name/HP text
function render_player_roster(playerno){
    var roster_div = "#p"+playerno+"rosterdiv"
    var ballz_row_create = "p"+playerno+"pokeballz"
    var ballz_row_grab = "#"+ballz_row_create
    var sprites_row_create = "p"+playerno+"rostersprites"
    var sprites_row_grab = "#"+sprites_row_create
    var text_row_create = "p"+playerno+"rosterpoketext"
    var text_row_grab = "#"+text_row_create
    var rosternametextbackhalf = ", choose a Pokemon"
    if(playerno===1){
        var rosternametext = p1name+rosternametextbackhalf
        var wipraw = p1roster_raw
        var wiproster = p1roster
    }
    if(playerno===2){
        var rosternametext = p2name+rosternametextbackhalf
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
        if(wiproster[wipraw[i]].hpcount>0){
            var ballfun = "swap_pokemon("+playerno+",'"+wipraw[i]+"',p"+playerno+"active)"
            var imglink = "static/images/pokeball.png"
        }
        if(wiproster[wipraw[i]].hpcount===0){
            var ballfun = "KOd_text('"+wiproster[wipraw[i]].name+"')"
            var imglink = "static/images/kod.png"
        }
        d3.select(ballz_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("img")
            .attr("onclick",ballfun)
            .attr("class","pokeball")
            .attr("src",imglink)
    }
    // Add Pokemon sprites
    var j = 0
    for(i in wiproster){
        var spriteurl = wiproster[i].img_url
        if(wiproster[i].hpcount>0){
            var ballfun = "swap_pokemon("+playerno+",'"+wipraw[j]+"',p"+playerno+"active)"    
        }
        if(wiproster[i].hpcount===0){
            var ballfun = "KOd_text('"+wiproster[i].name+"')"
        }
        var spriteclass = "p"+playerno+"rostersprite"
        d3.select(sprites_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("img")
            .attr("onclick",ballfun)
            .attr("class",spriteclass)
            .attr("src",spriteurl)
        j = j + 1
    }
    // Add Pokemon names and HP
    for(i in wiproster){
        var textid = "hold"
        if(wiproster[i].hpcount===0){
            var textid = "KOd"
        }
        var rosterindex = i
        var rosterpokename = wiproster[i].name
        var rosterpokeHP = "HP - "+wiproster[i].hpcount+" / "+wiproster[i].hp
        d3.select(text_row_grab)
            .append("div")
            .attr("class","col-md-2")
            .append("p")
            .attr("id",textid)
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
    // Start match text
    var matchstarttext = p1name+" vs "+p2name
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("class","battletext")
        .attr("id","sysbattletext")
        .html(`${matchstarttext}<br>BEGIN!`)
    // TESTERZ PLACEHOLDERS TEXT FOR BATTLE LOG TEXT BOX //////////////////////////////////////////
    // for(var i=0,length=50;i<length;i++){
    //     d3.select("#battlelogtextbox")
    //         .append("div")
    //         .attr("class","battletext")
    //         .text("iPwn")
    // }
    // d3.select("#battlelogtextbox")
    //     .append("div")
    //     .attr("class","battletext")
    //     .text("I am all that is dev and now lets test the x wise scroll and see how it does with length or maybe plan to make sure the text size fits well enoguh; but what about the mobiles?")
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
        var regatkfun = "attack("+playerno+",1,'reg')"
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcatktype1ID)
            .attr("onclick",regatkfun)
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcatktype1sel)
            .append("p")
            .text(bcatktype1text)
        // Special Attack
        var spatkfun = "attack("+playerno+",1,'sp')"
        d3.select(bcbuttonssel)
            .append("hr")
        d3.select(bcbuttonssel)
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcspatktype1ID)
            .attr("onclick",spatkfun)
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
        // var regatkfun1 = "attack("+playerno+",1)"
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
        // var regatkfun2 = "attack("+playerno+",2)"
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
    render_battlecard(2),
    window.scrollTo(0,58)
}
// Call Aggregate Function to render Rosters & Battle interface
d3.json("/combat_vars").then(combat_vars=>
    generate_typematchups(combat_vars)
    )
d3.json("/pokedex_data").then(data=>
    sigma_battle_interface(data)
    )