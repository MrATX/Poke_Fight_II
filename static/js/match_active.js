// // WIPWIPWIP VARIABLES - Manual
// var npoke = "6"
// var p1name = "JDUB"
// var p1roster_raw = ["170","237","238","558","559","843"]
// var p1roster = {}
// // // 820
// var p1active = "559"
// // var p1rosterHP = []
// // var wip_p1rosterHP = {}
// // var p1rosterATKS = []
// var p2name = "Ahsoka"
// var p2roster_raw = ["182","183","184","296","297","820"]
// var p2roster = {}
// // // 843
// var p2active = "296"
// // var p2rosterHP = []
// // var wip_p2rosterHP = {}
// // var p2rosterATKS = []
// // WIPWIPWIP VARIABLES


//*******************************************************************************************\\

// For adding single player
// - New AI swap function which chooses the next Pokemon with HP > 0; need to make sure the game over health check is correctly triggered
// - Likely new functions for AI attacks that target the highest coeffecient
// - AI for swapping if matchup is unfavorable? Could turn into a loop... Maybe keep it simpler for meow
// - I think all the checks and such should work as long as AI is p2, but them being p2 might prompt them for actions
//   -- Might need to make a subset of options in the core functions for AI, or just AI functions
//   -- Will likely also need to ensure all the current functions work without a live p2

//*******************************************************************************************\\

// ******************************************************
// *********************** VARIABLES ********************
// ******************************************************
// Pull in match setup variables from POST
// grab hidden variables from HTML
var nplayers = document.getElementById("nplayers").innerText
var npoke = document.getElementById("npoke").innerText
var p1name = document.getElementById("p1name").innerText
var p1roster_raw = document.getElementsByName("p1roster")
var wiprosterpull = []
// P1 stuffs
var p1roster = {}
for(var i=0,length=parseInt(npoke);i<length;i++){
    wiprosterpull.push(p1roster_raw[i].textContent)
}
p1roster_raw = wiprosterpull
var p1active = p1roster_raw[0]
// P2 stuffs
var p2name = document.getElementById("p2name").innerText
var p2roster_raw = document.getElementsByName("p2roster")
wiprosterpull = []
var p2roster = {}
for(var i=0,length=parseInt(npoke);i<length;i++){
    wiprosterpull.push(p2roster_raw[i].textContent)
}
p2roster_raw = wiprosterpull
var p2active = p2roster_raw[0]
console.log("player1",p1roster,p1active)
console.log("player2",p2roster,p2active)
// *****************************************************************
// *********************** UTILITY FUNCTIONS ***********************
// *****************************************************************
// Game over screen
function match_victory(loser){
    console.log("match_victory FIRING")
    console.log("loser",loser)
    d3.select("#battleinterface").html("")
    var winner = 2
    if(loser===2){
        winner = 1
    }
    var gameovertext = "GAME OVER"
    d3.select("#endgame")
        .append("div")
        .attr("class","container-fluid")
        .append("div")
        .attr("class","jumbotron")
        .append("h1")
        .attr("class","jumbotitle")
        .text(gameovertext)
        .append("hr")
    render_player_roster(winner,"end")
}
// Compare active Pokemons' speeds to see who goes first
function speedcheck(){
    console.log("speedcheck FIRING")
    var nextplayer = 1
    if(p1roster[p1active].speed<p2roster[p2active].speed){
        nextplayer = 2
    }
    if(nextplayer===1){
        d3.select("#p1buttons")
            .attr("style","visibility:visible;")
        d3.select("#p2buttons")
            .attr("style","visibility:hidden;")
    }
    if(nextplayer===2){
        d3.select("#p2buttons")
            .attr("style","visibility:visible;")
        d3.select("#p1buttons")
            .attr("style","visibility:hidden;")
    }
}
// Leave Match Check
function leave_match(){
    console.log("leave_match FIRING")
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}
// Generate players' rosters as dicts of dicts and assign hp and attack counts to Pokemon
function generate_rosters(data,wiprawroster,wipgenroster){
    console.log("generate_rosters FIRING")
    for(i in wiprawroster){
        wipgenroster[wiprawroster[i]] = data[0].pokedex[parseInt(wiprawroster[i])]
        wipgenroster[wiprawroster[i]].hpcount = wipgenroster[wiprawroster[i]].hp
        if(wipgenroster[wiprawroster[i]].type2===" - "){
            wipgenroster[wiprawroster[i]].atktotal = 30
            wipgenroster[wiprawroster[i]].atkcount1 = 30
            wipgenroster[wiprawroster[i]].spatktotal = 10
            wipgenroster[wiprawroster[i]].spatkcount1 = 10
            // TESTERZ ATTACK VALUE TO TEST KO FROM EXHAUSTION
            // wipgenroster[wiprawroster[i]].atktotal = 2
            // wipgenroster[wiprawroster[i]].atkcount1 = 2
            // wipgenroster[wiprawroster[i]].spatktotal = 1
            // wipgenroster[wiprawroster[i]].spatkcount1 = 1
        }
        if(wipgenroster[wiprawroster[i]].type2!=" - "){
            wipgenroster[wiprawroster[i]].atktotal = 15
            wipgenroster[wiprawroster[i]].atkcount1 = 15
            wipgenroster[wiprawroster[i]].atkcount2 = 15
            wipgenroster[wiprawroster[i]].spatktotal = 5
            wipgenroster[wiprawroster[i]].spatkcount1 = 5
            wipgenroster[wiprawroster[i]].spatkcount2 = 5
            // TESTERZ ATTACK VALUE TO TEST KO FROM EXHAUSTION
            // wipgenroster[wiprawroster[i]].atktotal = 1
            // wipgenroster[wiprawroster[i]].atkcount1 = 1
            // wipgenroster[wiprawroster[i]].atkcount2 = 1
            // wipgenroster[wiprawroster[i]].spatktotal = 1
            // wipgenroster[wiprawroster[i]].spatkcount1 = 1
            // wipgenroster[wiprawroster[i]].spatkcount2 = 1
        }
    }
}
// Generate Type Matchups array to sort coeffecients for damage calculation
var typematchups_object = []
function generate_typematchups(combat_vars){
    console.log("generate_typematchups FIRING")
    typematchups_object = combat_vars[0].type_matchups
}
// KO'd Text function for roster ballfuns
function KOd_text(name){
    console.log("KOd_text FIRING")
    var text = name+" is KO'd. Select a different pokemon"
    alert(text)
}
// ****************************************************************
// *********************** BUTTON FUNCTIONS ***********************
// ****************************************************************
// ****************************************************************
// ************************* SWAP POKEMON *************************
// ****************************************************************
// swap button function
function swap_button(playerno){
    console.log("swap_button FIRING")
    if(nplayers==="1" && playerno===2){
        console.log(p2roster)
        console.log("w000000000000000000000t!!!!!!!!!!!!!!!!")
        console.log(p2active)
        // swap_pokemon_text(2,p2active)
        // swap_pokemon(2,1032)
        // render_battlecard(2)
        window.scrollTo(0,58)
        for(i in p2roster){
            var AI_HP_var = 0
            console.log(i)
            console.log(p2roster[i].hpcount)
            AI_HP_var = AI_HP_var + p2roster[i].hpcount
            console.log("AI HP VAR"+" "+AI_HP_var)
            if(p2roster[i].hpcount!=0){
                swap_pokemon(2,i)
                break
            }
        }
        if(AI_HP_var===0){
            console.log("AI done son")
            match_victory(2)
        }
        // Got the AI roster to show and victory screen works for both P1 and AI but sometimes the Xs are out of order; need to troubleshoot
    }
    // if(nplayers===1 && playerno===2){
    //     clear_player_rosters(2,p1active)
    // }
    // else{
    //     render_player_roster(playerno,"combat"),
    //     window.scrollTo(0,0),
    //     d3.select("#battleinterface")
    //         .attr("style","visibility:hidden")
    //     d3.select("#p1buttons")
    //         .attr("style","visibility:hidden")
    //     d3.select("#p2buttons")
    //         .attr("style","visibility:hidden")
    // }
    if(nplayers==="2" ||(nplayers==="1" && playerno===1)){
        render_player_roster(playerno,"combat"),
        window.scrollTo(0,0),
        d3.select("#battleinterface")
            .attr("style","visibility:hidden")
        d3.select("#p1buttons")
            .attr("style","visibility:hidden")
        d3.select("#p2buttons")
            .attr("style","visibility:hidden")
    }
    // render_player_roster(playerno,"combat"),
    // window.scrollTo(0,0),
    // d3.select("#battleinterface")
    //     .attr("style","visibility:hidden")
    // d3.select("#p1buttons")
    //     .attr("style","visibility:hidden")
    // d3.select("#p2buttons")
    //     .attr("style","visibility:hidden")
}
// text gen for pokeball/sprite swap function
function swap_pokemon_text(playerno,prevpokno){
    console.log("swap_pokemon_text FIRING")
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
    console.log("swap_pokemon FIRING")
    pokeno = parseInt(pokeno)
    // Assign variables for correct player and check for KO'd or turn swap
    if(playerno===1){
        var prevpokno = p1active
        p1active = pokeno
        var swaprosterdiv = "#p1rosterdiv"
        var nextplayer = 2
        console.log(pokeno)
        console.log(prevpokno)
        if(p1roster[prevpokno].hpcount===0 || pokeno===prevpokno){
            nextplayer = 1
        }
    }
    if(playerno===2){
        var prevpokno = p2active
        p2active = pokeno
        var swaprosterdiv = "#p2rosterdiv"
        var nextplayer = 1
        console.log(pokeno)
        console.log(prevpokno)
        if(p2roster[prevpokno].hpcount===0 || pokeno===prevpokno){
            nextplayer = 2
        }
    }
    // Render interface again, post text, and align
    render_battlecard(playerno)
    if(pokeno!=prevpokno){
        swap_pokemon_text(playerno,prevpokno)
    }
    d3.select(swaprosterdiv).html("")
    d3.select("#battleinterface")
        .attr("style","visibility:visible")
    window.scrollTo(0,58)
    // Assign next up player
    if(nextplayer===1){
        d3.select("#p1buttons")
            .attr("style","visibility:visible;")
        d3.select("#p2buttons")
            .attr("style","visibility:hidden;")
    }
    if(nextplayer===2){
        d3.select("#p2buttons")
            .attr("style","visibility:visible;")
        d3.select("#p1buttons")
            .attr("style","visibility:hidden;")
    }
}
// ******************************************************
// *********************** ATTACK ***********************
// ******************************************************
// Text gen for attacks
function attack_text(attacker_no,attacktext,attacker_type){
    console.log("attack_text FIRING")
    var typeimg = "static/images/type_imgs/"+attacker_type+".png"
    if(attacker_no===1){
        var textclass = "p1battletext"
    }
    if(attacker_no===2){
        var textclass = "p2battletext"
    }
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("id",textclass)
        .attr("class","battletext")
        .text(attacktext)
        .append("img")
        .attr("src",typeimg)
        .attr("class","battletext_img")
    var scrolldown = document.getElementById("battlelogtextbox")
    scrolldown.scrollTop = scrolldown.scrollHeight
    window.scrollTo(0,58)
}
// Attack function
// atkno and defno are 1 or 2 to denote which player is which for the attack
// typeno is 1 or 2 to denote which attack type (element)
// atktype reg or sp to denote regular or special attack
function attack(attacker_no,atktype_no,atktype){
    console.log("attack FIRING")
    if(attacker_no===1){
        var ATKroster = p1roster
        var ATKactive = p1roster[p1active]
        var DEFroster = p2roster
        var DEFactive = p2roster[p2active]
    }
    if(attacker_no===2){
        var ATKroster = p2roster
        var ATKactive = p2roster[p2active]
        var DEFroster = p1roster
        var DEFactive = p1roster[p1active]
    }
    var damagetexthold = DEFactive.hpcount
    // KO from exhaustion check; out of all attacks check
    if(ATKactive.type2===" - "){
        var attacks_sum = ATKactive.atkcount1 + ATKactive.spatkcount1
    }
    if(ATKactive.type2!=" - "){
        var attacks_sum = ATKactive.atkcount1 + ATKactive.atkcount2 + ATKactive.spatkcount1 + ATKactive.spatkcount2
    }
    if(attacks_sum===0){
        var noattackstext = ATKactive.name + " is all out of attacks. They collapsed from exhaustion."
        d3.select("#battlelogtextbox")
            .append("div")
            .attr("id","sysbattletext")
            .attr("class","battletext")
            .text(noattackstext)
        var scrolldown = document.getElementById("battlelogtextbox")
        scrolldown.scrollTop = scrolldown.scrollHeight
        if(attacker_no===1){
            p1roster[p1active].hpcount = 0
            swap_button(1)
        }
        if(attacker_no===2){
            p2roster[p2active].hpcount = 0
            swap_button(2)
        }
        return
    }
    // Out of individual moves check
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
    // Select regular or special stats, attacker type, grab coeffecient for attack
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
    if(DEFactive.type2===" - "){
       var coeff = typematchups_object[attacker_type][DEFactive.type1].coeff
    }
    if(DEFactive.type2!=" - "){
        var coeff = (typematchups_object[attacker_type][DEFactive.type1].coeff)*(typematchups_object[attacker_type][DEFactive.type2].coeff)
    }
    // Miss Check
    var miss_attack = "false"
    var base_miss = 0.07
    var miss_chance_array = []
    // var magic_spdno = 292 (max at 60%)
    // 350 = max at 50%
    var magic_spdno = 350 
    var spddiff = DEFactive.speed - ATKactive.speed
    // matched speeds
    if(spddiff===0){
        var miss_chance = base_miss * 100
        for (var i = 1; i <= miss_chance; i++) {
            miss_chance_array.push(i);
        }
    }
    // defender is faster
    if(spddiff>0){
        var miss_integer = ((spddiff/magic_spdno) + base_miss) * 100
        var miss_chance = Math.round(miss_integer)
        for (var i = 1; i <= miss_chance; i++) {
            miss_chance_array.push(i);
        }
    }
    // defender is slower
    if(spddiff<0){
        var miss_integer = (spddiff * -1)/magic_spdno
        miss_chance = Math.round((1 - (miss_integer * 1.98)) * base_miss * 100)
        for (var i = 1; i <= miss_chance; i++) {
            miss_chance_array.push(i);
        }
    }
    var testerzRNG = Math.round(Math.random() * (99 - 0) + 0)
    if(miss_chance_array.includes(testerzRNG)){
        miss_attack = "true"
    }
    // Damage Calculation
    if(coeff===0){
        var damage = 1
    }
    if(coeff>0){
        var damage = Math.round((atkstat*coeff*0.33)*(1-(defstat/250)))
    }
    if(miss_attack==="true"){
        damage = 0
    }
    // Create variables impact; reduce HP and ATK counts accordingly
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
    // Assign variables impact to player rosters
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
    var damagetext = damage
    if(DEFactive.hpcount===0){
        var damagetext = damagetexthold
    }
    if(miss_attack==="true"){
        var attacktext = ATKactive.name+" attacked "+DEFactive.name+" and missed!"
    }
    if(miss_attack==="false"){
        if(atktype==="reg"){
            var attacktext = ATKactive.name+" attacked "+DEFactive.name+" for "+damagetext+" damage. It was "+coefftext
        }
        if(atktype==="sp"){
            var attacktext = ATKactive.name+" used a special attack on "+DEFactive.name+" for "+damagetext+" damage. It was "+coefftext
        }
    }
    attack_text(attacker_no,attacktext,attacker_type)
    // KO Check
    if(DEFactive.hpcount===0){
        var KOd_battletext = DEFactive.name+" was KO'd"
        d3.select("#battlelogtextbox")
            .append("div")
            .attr("id","sysbattletext")
            .attr("class","battletext")
            .text(KOd_battletext)
        var scrolldown = document.getElementById("battlelogtextbox")
        scrolldown.scrollTop = scrolldown.scrollHeight
        if(attacker_no===1){
            swap_button(2)
        }
        if(attacker_no===2){
            swap_button(1)
        }
    }
    // Buttons swap if defender not KO'd
    if(DEFactive.hpcount>0){
        if(attacker_no===1){
            d3.select("#p1buttons")
                .attr("style","visibility:hidden;")
            d3.select("#p2buttons")
                .attr("style","visibility:visible")
        }
        if(attacker_no===2){
            d3.select("#p2buttons")
                .attr("style","visibility:hidden;")
            d3.select("#p1buttons")
                .attr("style","visibility:visible")
        }
    }
}
// HTML Rendering Functions -----------------------------------------------------------------
// Render Player Rosters with Pokeballs, Sprites, & Name/HP text
// Phase is start, combat, or end;start is for picking rosters up front, combat for swapping during combat, end for victory screen
// ----------------------??????????????-------------------------------------------------- \\
// If both players have the same pokemon it breaks the match_victory for some reason so 
// that it loops indefinitely :/
// ----------------------??????????????-------------------------------------------------- \\
function render_player_roster(playerno,phase){
    console.log("render_player_roster FIRING")
    console.log("playerno",playerno,"phase",phase)
    var roster_div = "#p"+playerno+"rosterdiv"
    var ballz_row_create = "p"+playerno+"pokeballz"
    var ballz_row_grab = "#"+ballz_row_create
    var sprites_row_create = "p"+playerno+"rostersprites"
    var sprites_row_grab = "#"+sprites_row_create
    var text_row_create = "p"+playerno+"rosterpoketext"
    var text_row_grab = "#"+text_row_create
    if(phase==="end"){
        var rosternametextbackhalf = " wins"
    }
    if(phase!="end"){
        var rosternametextbackhalf = ", choose a Pokemon"
    }
    if(playerno===1){
        var rosternametext = p1name+rosternametextbackhalf
        var wipraw = p1roster_raw
        var wiproster = p1roster
        if(phase==="start"){
            d3.select("#p2rosterdiv")
                .attr("style","visibility:hidden")
        }
    }
    if(playerno===2){
        var rosternametext = p2name+rosternametextbackhalf
        var wipraw = p2roster_raw
        var wiproster = p2roster
    }
    var healthcheck = 0
    for(i in wipraw){
        healthcheck = healthcheck + wiproster[wipraw[i]].hpcount
    }
    if(healthcheck===0){
        match_victory(playerno)
    }
    if(healthcheck>0 && (nplayers==="2" || (nplayers==="1" && playerno===1))){
        console.log("ipwn_testerz")
    }
    // if(healthcheck>0 && (nplayers==="2" || (nplayers==="1" && playerno===1))){
        if(healthcheck>0){
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
                if(phase==="start"){
                    var ballfun = "clear_player_rosters("+playerno+","+wipraw[i]+")"
                    var imglink = "static/images/pokeball.png"
                }
                if(phase==="combat"){
                    var ballfun = "swap_pokemon("+playerno+",'"+wipraw[i]+"',p"+playerno+"active)"
                    var imglink = "static/images/pokeball.png"                
                }
                if(phase==="end"){
                    var ballfun = "hold"
                    var imglink = "static/images/pokeball.png"
                }
            }
            if(wiproster[wipraw[i]].type2===" - "){
                var attacks_sum = wiproster[wipraw[i]].atkcount1 + wiproster[wipraw[i]].spatkcount1
            }
            if(wiproster[wipraw[i]].type2!=" - "){
                var attacks_sum = wiproster[wipraw[i]].atkcount1 + wiproster[wipraw[i]].atkcount2 + wiproster[wipraw[i]].spatkcount1 + wiproster[wipraw[i]].spatkcount2
            }
            if(wiproster[wipraw[i]].hpcount===0 || attacks_sum===0){
                var imglink = "static/images/kod.png"
                if(phase!="end"){
                    var ballfun = "KOd_text('"+wiproster[wipraw[i]].name+"')"
                }
                if(phase==="end"){
                    var ballfun = "hold"
                }
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
                if(phase==="start"){
                    var ballfun = "clear_player_rosters("+playerno+","+wipraw[j]+")"
                }
                if(phase==="combat"){
                    var ballfun = "swap_pokemon("+playerno+",'"+wipraw[j]+"',p"+playerno+"active)"    
                }
                if(phase==="end"){
                    var ballfun = "hold"
                }
            }
            if(wiproster[i].hpcount===0){
                if(phase!="end"){
                    var ballfun = "KOd_text('"+wiproster[i].name+"')"    
                }
                if(phase==="end"){
                    var ballfun = "hold"
                }
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
    if(nplayers==="1" && playerno===2 && phase==="end"){
        d3.select("#p2rosterdiv")
            .attr("style","visibility:visible")
            .append("p")
            .text("TESTERZZZZZZZZZZZZZ")
    }
    // console.log(playerno)

    // SMOKING GUN RIGHT HERE

    // if(healthcheck>0 && playerno===2 && phase==="combat"){
    //     clear_player_rosters(2,p2active),
    //     console.log("it's working")
    // }
}
// Function to clear rosters for initial active Pokemon selection
function clear_player_rosters(playerno,pokeno){
    console.log("clear_player_rosters FIRING")
    if(nplayers==="2"){
        if(playerno===1){
            d3.select("#p1rosterdiv").html("")
            d3.select("#p2rosterdiv")
                .attr("style","visibility:visible")
            p1active = pokeno
        }
        if(playerno===2){
            d3.select("#p2rosterdiv").html("")
            p2active = pokeno
            render_battle_interface(),
            render_battlecard(1),
            render_battlecard(2),
            speedcheck()
        }
        window.scrollTo(0,58)
    }
    if(nplayers==="1"){
        d3.select("#p1rosterdiv").html("")
        d3.select("#p2rosterdiv").html("")
        p1active = pokeno
        render_battle_interface(),
        render_battlecard(1),
        render_battlecard(2),
        speedcheck()
        window.scrollTo(0,58)
    }
    // if(playerno===1){
    //     d3.select("#p1rosterdiv").html("")
    //     d3.select("#p2rosterdiv")
    //         .attr("style","visibility:visible")
    //     p1active = pokeno
    // }
    // if(playerno===2 || (nplayers===1 && playerno===1)){
    //     d3.select("#p2rosterdiv").html("")
    //     p2active = pokeno
    //     render_battle_interface(),
    //     render_battlecard(1),
    //     render_battlecard(2),
    //     speedcheck()
    // }
    // window.scrollTo(0,58)
}
// Create Battle Interface
function render_battle_interface(){
    console.log("render_battle_interface FIRING")
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
    console.log("render_battlecard FIRING")
    // Define variables for appropriate player
    console.log("nplayer",nplayers)
    if(playerno===2 && nplayers==="1"){
        console.log("1st condition")
    }
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
    d3.select(battlecardselect)
        .append("img")
        .attr("id","minitypeimgs")
        .attr("src",bcroster[bcactive].type1img)
    d3.select(battlecardselect)
        .append("img")
        .attr("id","minitypeimgs")
        .attr("alt"," - ")
        .attr("src",bcroster[bcactive].type2img)
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
        var regatkfun1 = "attack("+playerno+",1,'reg')"
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcatktype1ID)
            .attr("onclick",regatkfun1)
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcatktype1sel)
            .append("p")
            .text(bcatktype1text)
        // Regular Attack Type 2
        var regatkfun2 = "attack("+playerno+",2,'reg')"
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcatktype2ID)
            .attr("onclick",regatkfun2)
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type2img)
        d3.select(bcatktype2sel)
            .append("p")
            .text(bcatktype2text)    
        // Special Attack Type 1
        var spatkfun1 = "attack("+playerno+",1,'sp')"
        d3.select(bcbuttonssel)
            .append("hr")
        d3.select(bcbuttonssel)
            .append("h2")
            .text("SPECIAL ATTACK")
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcspatktype1ID)
            .attr("onclick",spatkfun1)
            .append("img")
            .attr("id","buttonimg")
            .attr("src",bcroster[bcactive].type1img)
        d3.select(bcspatktype1sel)
            .append("p")
            .text(bcspatktype1text)
        // Special Attack Type 2
        var spatkfun2 = "attack("+playerno+",2,'sp')"
        d3.select(bcbuttonssel)
            .append("button")
            .attr("id",bcspatktype2ID)
            .attr("onclick",spatkfun2)
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
        .text("Swap Pokemon")    
}
// Aggregate function to ensure array generation first
function sigma_battle_interface(data){
    console.log("sigma_battle_interface FIRING")
    generate_rosters(data,p1roster_raw,p1roster),
    generate_rosters(data,p2roster_raw,p2roster),
    render_player_roster(1,"start"),
    render_player_roster(2,"start"),
    window.scrollTo(0,58)
}
// Call Aggregate Function to render Rosters & Battle interface
d3.json("/combat_vars").then(combat_vars=>
    generate_typematchups(combat_vars)
    )
d3.json("/pokedex_data").then(data=>
    sigma_battle_interface(data)
    )