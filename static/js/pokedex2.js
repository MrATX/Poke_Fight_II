// Base function rendering table with given list of Pokemon
function pokedex_table(pokedex,headers){
    for(var i=0,length=headers.length;i<length;i++){
        console.log(headers[i])
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
function pokedex_filter(pokedex,headers){
    // Grab table body and clear rows
    tbody = d3.select("tbody");
    tbody.html("")
    // Grab Variables from Filters (default for both is All) 
    // var weight_class = document.getElementById("weight_filter").value
    // var gen = document.getElementById("gen_filter").value
    var weight_class = "all"
    var gen = "all"
    // Route into data dictionary
    var pokedex = pokedex[0]["pokedex"]
    // Setup Class Ranges
    // THESE SHOULD BE PUT INTO MONGO FOR COMBAT VARIABLES
    let weight_class_vars = {
        "feather":[0,250],
        "light":[250,350],
        "middle":[350,500],
        "heavy":[500,1000],
        "legendary":[0,1000],
        "all":[0,1000]
    }
    // Establish filter variables; STR range, Generation, Legendary
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
    var pokedex_filtered = []
    // Create dummy variable to generate row indexes
    var k = 0
    // Loop through Pokedex, get Pokemon meeting filter criteria and push to array
    pokedex.forEach(pokemon=>{
        if(
            pokemon.total >= str_min &&
            pokemon.total < str_max &&
            gen_var.includes(pokemon.generation) &&
            legend_var.includes(pokemon.legendary)
        ){
            pokemon.tableindex = k
            k = k + 1
            pokedex_filtered.push(pokemon)
        }
    })
    // Grab Headers Array
    headers = headers[0].pokedex_headers
    // Pass filtered array of Pokemon to base function to render table
    pokedex_table(pokedex_filtered,headers)
}
// Top function calling data to pass through middle and base functions
// Attached to filter button on HTML page
function render_pokedex(){
    d3.json("pokedex_data").then(pokedex=>
        d3.json("match_vars").then(match_vars=>
            pokedex_filter(pokedex,match_vars)
            )
        )
}
// Render Filters
// Type 1
function render_type_filters(combat_vars,type_no){
    types = combat_vars[0].types
    selection = "type"+type_no+"_filter"
    d3.select(selection)
        .append("div")
        .attr("class","row")
        .attr("id","pokedex_filter")
    for(var i=0,length=types.length;i<length;i++){
        var img_id = types[i]+"_type"+type_no+"_filter"
        var img_url = "static/images/type_imgs/" + types[i] + ".png"
        d3.select(selection)
            .select(".row")
            .append("img")
            .attr("id",img_id)
            .attr("class","typefilter_typeimg")
            .attr("src",img_url)
    }
}
// Type 2
// Weight Class
// Generation
// Call functions to render Filters & Pokdex on page load
render_pokedex()
d3.json("combat_vars").then(combat_vars=>
    render_type_filters(combat_vars,"1")
    )
d3.json("combat_vars").then(combat_vars=>
    render_type_filters(combat_vars,"2")
    )
