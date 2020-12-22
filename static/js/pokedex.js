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
        .html(d => `<td class="pokedex_stat">${d.num}</td>
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
    // Check Filter Variables
    if(t1filter[0] === undefined){
        var t1filter = types
    }
    if(t2filter[0] === undefined){
        var t2filter = types
        t2filter.push(" - ")
    }
    if(classfilter[0] === undefined || classfilter.includes("all")){
        var classfilter = ["feather","light","welter","middle","cruiser","heavy"]
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
    var genfilter = []
    d3.json("pokedex_data").then(pokedex=>
        d3.json("match_vars").then(match_vars=>
            d3.json("combat_vars").then(combat_vars=>
                pokedex_filter(pokedex,match_vars,combat_vars,t1filter,t2filter,classfilter,genfilter)    
                )
            )
        )
}
// Render Filters
// Type 1 & Type 2
function render_type_filters(combat_vars,type_no){
    types = combat_vars[0].types
    var title = "Type"+type_no
    selection = "type"+type_no+"_filter"
    d3.select(selection)
        .append("div")
        .attr("class","row")
        .attr("id","pokedex_filter")
        .append("div")
        .attr("class","container-fluid")
        .attr("id","filter_title")
        .text(title)
    if(type_no==="2"){
        d3.select(selection)
            .select(".row")
            .append("img")
            .attr("name","type2")
            .attr("id","type2none")
            .attr("class","typefilter_typeimg")
            .attr("onclick","click_typeimg(id)")
            .attr("title"," - ")
            .attr("src","img_url")
            .attr("alt","NONE")
    }
    for(var i=0,length=types.length;i<length;i++){
        var img_name = "type"+type_no
        var img_id = types[i]+"_type"+type_no+"_filter"
        var img_url = "static/images/type_imgs/" + types[i] + ".png"
        d3.select(selection)
            .select(".row")
            .append("img")
            .attr("name",img_name)
            .attr("id",img_id)
            .attr("class","typefilter_typeimg")
            .attr("onclick","click_typeimg(id)")
            .attr("title",types[i])
            .attr("src",img_url)
    }
}
// Type Filter Highlight Function
function click_typeimg(id){
    var img_sel = document.getElementById(id)
    if(img_sel.className==="typefilter_typeimg"){
        img_sel.className = "typefilter_typeimg_checked"
    }
    else{
        img_sel.className = "typefilter_typeimg"
    }
}
// Weight Class
function render_weight_class_filter(match_vars){
    weight_class = match_vars[0].radios.weight_class
    d3.select("weight_class_filter")
        .append("div")
        .attr("class","row")
        .attr("id","pokedex_filter")
        .append("div")
        .attr("class","container-fluid")
        .attr("id","filter_title")
        .text("Weight Class")
    for(var i=0,length=weight_class.values.length;i<length;i++){
        var checkbox_id = weight_class.values[i]+"_checkbox"
        var checkbox_text = weight_class.text[i]
        var checkbox_value = weight_class.values[i]
        d3.select("weight_class_filter")
            .select(".row")
            .append("span")
            .attr("class","checkmark")
            .html(`<input id="${checkbox_id}" class="checkbox" type="checkbox" name="weight_class" value="${checkbox_value}">
                    <label class="checkbox_label">${checkbox_text}</label>`)
    }
}
// Generation
function render_generation_filter(match_vars){
    generations = match_vars[0].radios.generation
    d3.select("generation_filter")
        .append("div")
        .attr("class","row")
        .attr("id","pokedex_filter")
        .append("div")
        .attr("class","container-fluid")
        .attr("id","filter_title")
        .text("Generation")
    for(var i=0,length=generations.values.length;i<length;i++){
        var checkbox_id = generations.values[i]+"_checkbox"
        var checkbox_text = generations.text[i]
        var checkbox_value = generations.values[i]
        d3.select("generation_filter")
            .select(".row")
            .append("span")
            .attr("class","checkmark")
            .html(`<input id="${checkbox_id}" class="checkbox" type="checkbox" name="generation" value="${checkbox_value}">
            <label class="checkbox_label">${checkbox_text}</label>`)
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
    }
}
//Show & Hide functions for filters
function show_filters(){
    d3.select("filter_buttons")
        .style("display","inline")
    d3.select("#showfilters")
        .style("display","none")
    d3.select("#hidefilters")
        .style("display","inline")
}
function hide_filters(){
    d3.select("filter_buttons")
        .style("display","none")
    d3.select("#showfilters")
        .style("display","inline")
    d3.select("#hidefilters")
        .style("display","none")
}
// Clear Filters Function
function clear_filters(){
    d3.selectAll(".checkbox").property("checked",false)
    d3.selectAll(".typefilter_typeimg_checked").attr("class","typefilter_typeimg")
}
// Base function to render filtered Pokedex
function render_filtered_pokedex(t1filter,t2filter,classfilter,genfilter){
    d3.json("pokedex_data").then(pokedex=>
        d3.json("match_vars").then(match_vars=>
            d3.json("combat_vars").then(combat_vars=>
                pokedex_filter(pokedex,match_vars,combat_vars,t1filter,t2filter,classfilter,genfilter)    
                )
            )
        )
}
// Middle function to grab variables and render filtered Pokedex
function grab_filter_vars(t1filter,t2filter,classfilter,genfilter){
    var checks = document.getElementsByClassName("checkbox")
    for(var i=0,length=checks.length;i<length;i++){
        if(checks[i].checked===true){
            if(checks[i].name === "weight_class"){
                classfilter.push(checks[i].value)
            }
            if(checks[i].name === "generation"){
                if(checks[i].value==="all"){
                    genfilter.push(checks[i].value)
                }
                else{
                    genfilter.push(parseInt(checks[i].value))
                }
            }
        }
    }
    var typesel = document.getElementsByClassName("typefilter_typeimg_checked")
    for(var i=0,length=typesel.length;i<length;i++){
            if(typesel[i].name==="type1"){
                t1filter.push(typesel[i].title)
            }
            if(typesel[i].name==="type2"){
                t2filter.push(typesel[i].title)
            }
    }
    console.log(t1filter,t2filter,classfilter,genfilter)
    render_filtered_pokedex(t1filter,t2filter,classfilter,genfilter)
}
// Outer function to clear arrays then grab vars & render filtered Pokedex
function filtered_pokedex(){
    var t1filter = []
    var t2filter = []
    var classfilter = []
    var genfilter = []
    grab_filter_vars(t1filter,t2filter,classfilter,genfilter)
}
// Call functions to render Filters & Pokdex on page load
render_pokedex()
d3.json("combat_vars").then(combat_vars=>
    render_type_filters(combat_vars,"1")
    )
d3.json("combat_vars").then(combat_vars=>
    render_type_filters(combat_vars,"2")
    )
d3.json("match_vars").then(match_vars=>
    render_weight_class_filter(match_vars)
    )
d3.json("match_vars").then(match_vars=>
    render_generation_filter(match_vars)
    )
