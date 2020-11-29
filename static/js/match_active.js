// Leave Match Check
function leave_match(){
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}
// RADIOS ---------------------------------------------------------
// Base Function
// Create and Display Radios for Selection Match Parameters
function render_radios(radio_vars){
    var radios_div = String(radio_vars.name)+"_radiosdiv"
    d3.select(radios_div)        
        .append("div")
        .attr("class","jumbotron")
        .append("h1")
        .attr("class","radio_prompt")
        .text(radio_vars.prompt)
    d3.select(radios_div)
        .select(".jumbotron")
        .append("row")
    if(radios_div==="generation"){
        for(var i=0,length=radio_vars.values.length;i<length;i++){
            d3.select(radios_div)
                .select(".jumbotron")
                .select("row")
                .append("div")
                .attr("class","row")
                .append("span")
                .attr("class","radio")
                .html(`<input type="radio"
                        name="${radio_vars.name}"
                        value="${radio_vars.values[i]}"
                        id="${radio_vars.ids[i]}" onchange="radios_val('${radio_vars.name}',value,id)">${radio_vars.text[i]}`)
        }
    }
    else{
        for(var i=0,length=radio_vars.values.length;i<length;i++){
            d3.select(radios_div)
                .select(".jumbotron")
                .select("row")
                .append("radio")
                .attr("class","radio")
                .html(`<input class="radio" type="radio"
                        name="${radio_vars.name}"
                        value="${radio_vars.values[i]}"
                        id="${radio_vars.ids[i]}" onchange="radios_val('${radio_vars.name}',value,id)">${radio_vars.text[i]}`)
        }
    }

}
// Middle Function
// Pass through each parameter to create set of radios
function match_params_radios(match_vars){
    render_radios(match_vars[0].radios["nplayers"])
    render_radios(match_vars[0].radios["npoke"])
    render_radios(match_vars[0].radios["weight_class"])
    render_radios(match_vars[0].radios["generation"])
}
// Outer Function with Data call to display radios on page load
d3.json("match_vars").then(match_vars=>
    match_params_radios(match_vars)
    )
// Capture radios values
// Function ran with each clicking of a Radio input
// Assigns selections to global variables for use in next function
function radios_val(name,value,id){
    var radios = document.getElementById(id);
    if(radios.checked){
        if(name==="nplayers"){
            window.nplayers = value;
            if(value === "1"){
                window.nplayers_text = "One Player"
            }
            else{
                window.nplayers_text = "Two Player"
            }
        }
        if(name==="npoke"){
            window.npoke = value;
            window.npoke_text = id;
        }
        if(name==="weight_class"){
            window.weight_class = value;
            if(value==="all"){
                window.weight_class_text = "Pokemon"
            }
            else{
                window.weight_class_text = id+" Pokemon";
            }
        }
        if(name==="generation"){
            window.generation = value;
            window.gen_text = id;
        }
    }
}
// XFER Match Vars to Name Input
// Post variables to hidden divs and clear HTML
function xfer_matchvars2nameinput(){
    if(typeof nplayers !=='undefined' &&
    typeof npoke !=='undefined' &&
    typeof weight_class !== 'undefined' &&
    typeof generation !=='undefined'){
        var matchconfirm_text = "Begin a " + nplayers_text + " match with " +
        npoke_text +" "+ weight_class_text + " from " + gen_text + " generation?"
        if(confirm(matchconfirm_text)){
            d3.select("#nplayers_div").text(nplayers)
            d3.select("#npoke_div").text(npoke)
            d3.select("#weight_class_div").text(weight_class)
            d3.select("#generation_div").text(generation)
            d3.select("#radios_container").html("")
            nameinputbox(1)
        }
    }
    else{
        alert("Choose Number of Players, Number of Pokemon, a Weight Class, and a Generation before continuing")
    }
}
// END RADIOS ---------------------------------------------------------


// NAME INPUT ---------------------------------------------------------
// Generate name input box
function nameinputbox(player_no){
    var nameprompttext = "Player "+player_no+", please input your name"
    var xfer_function = "xfer_name2roster("+player_no+")"
    d3.select("nameinput")
        .append("div")
        .attr("class","jumbotron")
        .append("h1")
        .attr("class","radio_prompt")
        .text(nameprompttext)
    d3.select("nameinput")
        .select(".jumbotron")
        .append("input")
        .attr("class","nameinput")
    d3.select("nameinput")
        .select(".jumbotron")
        .append("div").attr("class","row")
        .append("button")
        .attr("onclick",xfer_function)
        .text("Continue")

}
// XFER Name Input to Roster Select
function xfer_name2roster(player_no){
    name = d3.select(".nameinput")["_groups"][0][0].value
    if(name!==""){
        var player_div = "#p"+player_no+"_name_div"
        if(player_no===1){
            d3.select(player_div).text(name)
        }
        if(player_no===2){
            d3.select(player_div).text(name)
        }
        d3.select("#rosterselect_container")["_groups"][0][0].style.display = "block"
        d3.select("nameinput").html("")
        render_pokedex()
    }
    else{
        alert("Please input a name before continuing")
    }
}
// END NAME INPUT ---------------------------------------------------------

// WIPWIPWIP
// nameinputbox(1)
// WIPWIPWIP

// ROSTER SELECT ---------------------------------------------------------
// Base function rendering table with given list of Pokemon
function pokedex_table(pokedex,headers){
    for(var i=0,length=headers.length;i<length;i++){
        d3.select("thead")
            .append("th")
            .text(headers[i])
    }
    d3.select("tbody")
        .selectAll("tr")
        .data(pokedex)
        .enter()
        .append("tr")
        .attr("class","pokedex_row")
        .html(d => `<td id="poketablerow"><input type="checkbox" value="${d.tableindex}" name="roster_check" onchange="limit_checks(name,value)"></td>
            <td><img src='${d.img_url}' class="pokedex_sprite"></td>
            <td class="pokedex_name">${d.name}</td>
            <td class="pokedex_type"><img src="${d.type1img}" class="pokedex_typeimg"><br>${d.type1}</td>
            <td class="pokedex_type"><img src="${d.type2img}" alt="" class="pokedex_typeimg"><br>${d.type2}</td>
            <td class="pokedex_stat"><u>${d.total}</u></td>
            <td class="pokedex_stat">${d.hp}</td>
            <td class="pokedex_stat">${d.attack}</td>
            <td class="pokedex_stat">${d.defense}</td>
            <td class="pokedex_stat">${d.spatk}</td>
            <td class="pokedex_stat">${d.spdef}</td>
            <td class="pokedex_stat">${d.speed}</td>
            <td class="pokedex_stat">${d.generation}</td>
            <td class="pokedex_stat">${d.legendary}`)
}
// Middle Function generating list of Pokemon based on chosen filters
function pokedex_filter(pokedex,headers,combat_vars,t1filter,t2filter,classfilter,genfilter){
    // Grab table body & header, and clear rows
    theader = d3.select("thead");
    theader.html("")
    tbody = d3.select("tbody");
    tbody.html("")
    // Grab Types Array
    types = combat_vars[0].types
    // Check Filter Variables
    if(t1filter[0] === undefined){
        var t1filter = types
    }
    if(t2filter[0] === undefined){
        var t2filter = types
        t2filter.push(" - ")
    }
    if(classfilter[0] === undefined || classfilter.includes("all")){
        var classfilter = ["light","middle","cruiser","heavy","legendary"]
    }
    if(genfilter[0] === undefined || genfilter.includes("all")){
        var genfilter = [1,2,3,4,5,6,7,8]
    }
    // Route into data dictionary
    var pokedex = pokedex[0]["pokedex"]
    // Create Array for Filtered Pokemon
    var pokedex_filtered = []
    // Create dummy variable to generate row indexes
    var k = 0
    // Loop through Pokedex, get Pokemon meeting filter criteria and push to array
    pokedex.forEach(pokemon=>{
        if(
            t1filter.includes(pokemon.type1) &&
            t2filter.includes(pokemon.type2) &&
            classfilter.includes(pokemon.weight_class) &&
            genfilter.includes(pokemon.generation)
        ){
            pokemon.tableindex = k
            k = k + 1
            pokedex_filtered.push(pokemon)
        }
    })
    // Grab Headers Array
    headers = headers[0].pokedex_headers
    // Grab Types Array
    types = combat_vars[0].types
    // Pass filtered array of Pokemon to base function to render table
    pokedex_table(pokedex_filtered,headers)
}
// Top function calling data to pass through middle and base functions
// Attached to filter button on HTML page
function render_pokedex(){
    var t1filter = []
    var t2filter = []
    var classfilter = []
    // classfilter.push(document.getElementById("weight_class_div").innerText)
    classfilter.push(weight_class)
    var genfilter = []
    // genfilter.push(document.getElementById("generation_div").innerText)
    genfilter.push(parseInt(generation))
    console.log(classfilter,genfilter)
    d3.json("pokedex_data").then(pokedex=>
        d3.json("match_vars").then(match_vars=>
            d3.json("combat_vars").then(combat_vars=>
                pokedex_filter(pokedex,match_vars,combat_vars,t1filter,t2filter,classfilter,genfilter)    
                )
            )
        )
}
// Limit Checks
function limit_checks(name,row_index){
    var checks = document.getElementsByName(name)
    var k = 0;
    for(var i=0, length=checks.length; i<length; i++){
        var poke_row = document.getElementsByTagName("tr")
        if(checks[i].checked === true){
            k = k + 1
            poke_row[i].className = "pokedex_row_checked"
        }
        else{
            poke_row[i].className = "pokedex_row"
        }
    }
    if(k > npoke){
        cur_row = parseInt(row_index)
        checks[row_index].checked = false
        poke_row[cur_row].className = "pokedex_row"
    }
}
// Render Filters
// Type 1 & Type 2
// function render_type_filters(combat_vars,type_no){
//     types = combat_vars[0].types
//     var title = "Type"+type_no
//     selection = "type"+type_no+"_filter"
//     d3.select(selection)
//         .append("div")
//         .attr("class","row")
//         .attr("id","pokedex_filter")
//         .append("div")
//         .attr("class","container-fluid")
//         .attr("id","filter_title")
//         .text(title)
//     if(type_no==="2"){
//         d3.select(selection)
//             .select(".row")
//             .append("img")
//             .attr("name","type2")
//             .attr("id","type2none")
//             .attr("class","typefilter_typeimg")
//             .attr("onclick","click_typeimg(id)")
//             .attr("title"," - ")
//             .attr("src","img_url")
//             .attr("alt","NONE")
//     }
//     for(var i=0,length=types.length;i<length;i++){
//         var img_name = "type"+type_no
//         var img_id = types[i]+"_type"+type_no+"_filter"
//         var img_url = "static/images/type_imgs/" + types[i] + ".png"
//         d3.select(selection)
//             .select(".row")
//             .append("img")
//             .attr("name",img_name)
//             .attr("id",img_id)
//             .attr("class","typefilter_typeimg")
//             .attr("onclick","click_typeimg(id)")
//             .attr("title",types[i])
//             .attr("src",img_url)
//     }
// }
// Type Filter Highlight Function
// function click_typeimg(id){
//     var img_sel = document.getElementById(id)
//     if(img_sel.className==="typefilter_typeimg"){
//         img_sel.className = "typefilter_typeimg_checked"
//     }
//     else{
//         img_sel.className = "typefilter_typeimg"
//     }
// }
// Weight Class
// function render_weight_class_filter(match_vars){
//     weight_class = match_vars[0].radios.weight_class
//     d3.select("weight_class_filter")
//         .append("div")
//         .attr("class","row")
//         .attr("id","pokedex_filter")
//         .append("div")
//         .attr("class","container-fluid")
//         .attr("id","filter_title")
//         .text("Weight Class")
//     for(var i=0,length=weight_class.values.length;i<length;i++){
//         var checkbox_id = weight_class.values[i]+"_checkbox"
//         var checkbox_text = weight_class.text[i]
//         var checkbox_value = weight_class.values[i]
//         d3.select("weight_class_filter")
//             .select(".row")
//             .append("span")
//             .attr("class","checkmark")
//             .html(`<input id="${checkbox_id}" class="checkbox" type="checkbox" name="weight_class" value="${checkbox_value}">
//                     <label class="checkbox_label">${checkbox_text}</label>`)
//     }
// }
// Generation
// function render_generation_filter(match_vars){
//     generations = match_vars[0].radios.generation
//     d3.select("generation_filter")
//         .append("div")
//         .attr("class","row")
//         .attr("id","pokedex_filter")
//         .append("div")
//         .attr("class","container-fluid")
//         .attr("id","filter_title")
//         .text("Generation")
//     for(var i=0,length=generations.values.length;i<length;i++){
//         var checkbox_id = generations.values[i]+"_checkbox"
//         var checkbox_text = generations.text[i]
//         var checkbox_value = generations.values[i]
//         d3.select("generation_filter")
//             .select(".row")
//             .append("span")
//             .attr("class","checkmark")
//             .html(`<input id="${checkbox_id}" class="checkbox" type="checkbox" name="generation" value="${checkbox_value}">
//             <label class="checkbox_label">${checkbox_text}</label>`)
        //     .append("input")
        //     .attr("id",checkbox_id)
        //     .attr("class","checkbox")
        //     .attr("type","checkbox")
        //     .attr("name","generation")
        //     .attr("value",checkbox_value)
        // d3.select("generation_filter")
        //     .select(".row")
        //     .append("label")
        //     .attr("class","pokedex_filter_label")
        //     .text(checkbox_text)
//     }
// }
//Show & Hide functions for filters
// function show_filters(){
//     d3.select("filter_buttons")
//         .style("display","inline")
//     d3.select("#showfilters")
//         .style("display","none")
//     d3.select("#hidefilters")
//         .style("display","inline")
// }
// function hide_filters(){
//     d3.select("filter_buttons")
//         .style("display","none")
//     d3.select("#showfilters")
//         .style("display","inline")
//     d3.select("#hidefilters")
//         .style("display","none")
// }
// Clear Filters Function
// function clear_filters(){
//     d3.selectAll(".checkbox").property("checked",false)
//     d3.selectAll(".typefilter_typeimg_checked").attr("class","typefilter_typeimg")
// }
// Base function to render filtered Pokedex
// function render_filtered_pokedex(t1filter,t2filter,classfilter,genfilter){
//     d3.json("pokedex_data").then(pokedex=>
//         d3.json("match_vars").then(match_vars=>
//             d3.json("combat_vars").then(combat_vars=>
//                 pokedex_filter(pokedex,match_vars,combat_vars,t1filter,t2filter,classfilter,genfilter)    
//                 )
//             )
//         )
// }
// Middle function to grab variables and render filtered Pokedex
// function grab_filter_vars(t1filter,t2filter,classfilter,genfilter){
    // var checks = document.getElementsByClassName("checkbox")
    // for(var i=0,length=checks.length;i<length;i++){
    //     if(checks[i].checked===true){
    //         if(checks[i].name === "weight_class"){
    //             classfilter.push(checks[i].value)
    //         }
    //         if(checks[i].name === "generation"){
    //             if(checks[i].value==="all"){
    //                 genfilter.push(checks[i].value)
    //             }
    //             else{
    //                 genfilter.push(parseInt(checks[i].value))
    //             }
    //         }
    //     }
    // }
//     var typesel = document.getElementsByClassName("typefilter_typeimg_checked")
//     for(var i=0,length=typesel.length;i<length;i++){
//             if(typesel[i].name==="type1"){
//                 t1filter.push(typesel[i].title)
//             }
//             if(typesel[i].name==="type2"){
//                 t2filter.push(typesel[i].title)
//             }
//     }
//     render_filtered_pokedex(t1filter,t2filter,classfilter,genfilter)
// }
// Outer function to clear arrays then grab vars & render filtered Pokedex
// function filtered_pokedex(){
//     var t1filter = []
//     var t2filter = []
//     var classfilter = []
//     classfilter.push(weight_class)
//     var genfilter = []
//     genfilter.push(parseInt(generation))
//     grab_filter_vars(t1filter,t2filter,classfilter,genfilter)
// }
// Call functions to render Filters & Pokdex on page load
// render_pokedex()
// d3.json("combat_vars").then(combat_vars=>
//     render_type_filters(combat_vars,"1")
//     )
// d3.json("combat_vars").then(combat_vars=>
//     render_type_filters(combat_vars,"2")
//     )
// END ROSTER SELECT ---------------------------------------------------------