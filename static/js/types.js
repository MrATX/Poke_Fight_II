// Create Single Type Matchup Table
function single_types_table(combat_vars){
    d3.select(".single_type_header")
        .append("tr")
        .append("th")
        .attr("class","typetable_row0")
    for(i in combat_vars[0].types){
        var atk_type = combat_vars[0].types[i]
        var row_id = atk_type + "_singlerow"
        var img_url = "static/images/type_imgs/" + atk_type.toLowerCase() + ".png"
        d3.select(".single_type_header")
            .select("tr")
            .append("th")
            .attr("class","typetable_row0")
            .html(`<img class="typetable_typeimg" src=${img_url}><br>${atk_type}`)
        d3.select(".single_type_header")
            .select("tr")
            .enter()
            .append("p")
            .text(atk_type)
        d3.select(".single_type_body")
            .append("tr")
            .attr("id",row_id)
        for(j in combat_vars[0].types){
            var def_type = combat_vars[0].types[j]
            if(j==="Normal"){
                d3.select("#"+String(row_id))
                    .append("td")
                    .attr("class","typetable_col0")
                    .append("img")
                    .attr("class","typetable_typeimg")
                    .attr("src",img_url)
                d3.select("#"+String(row_id))
                    .select("td")
                    .append("p")
                    .text(atk_type)
                d3.select("#"+String(row_id))
                    .append("td")
                    .attr("id",combat_vars[0].type_matchups[i][def_type].id)
                    .attr("valign","middle")
                    .text(combat_vars[0].type_matchups[i][def_type].coeff)
            }
            else{
                d3.select("#"+String(row_id))
                    .append("td")
                    .attr("id",combat_vars[0].type_matchups[i][def_type].id)
                    .attr("valign","middle")
                    .text(combat_vars[0].type_matchups[i][def_type].coeff)
            }

        }
    }
}
// Populate dropdown list of types for Dual Types Chart
function dual_type_filters(combat_vars){
    for(i in combat_vars[0].types){
        d3.select(".typetable_type1sel")
            .append("option")
            .attr("value",combat_vars[0].types[i])
            .text(combat_vars[0].types[i])
    }   
}
// Create Dual Type Matchups Table
function dual_types_table(combat_vars,filter){
    var filter_img_url = "static/images/type_imgs/" + filter.toLowerCase() + ".png"
    d3.select(".dual_type_header")
        .append("tr")
        .append("th")
        .attr("class","typetable_row0")
    for(i in combat_vars[0].types){
        var atk_type = combat_vars[0].types[i]
        var row_id = atk_type + "_dualrow"
        var img_url = "static/images/type_imgs/" + atk_type.toLowerCase() + ".png"
        d3.select(".dual_type_header")
            .select("tr")
            .append("th")
            .attr("class","typetable_row0")
            .html(`<img class="typetable_typeimg" src=${filter_img_url}><br>${filter}<br>
                    <img class="typetable_typeimg" src=${img_url}><br>${atk_type}`)
        d3.select(".dual_type_header")
            .select("tr")
            .enter()
            .append("p")
            .text(atk_type)
        d3.select(".dual_type_body")
            .append("tr")
            .attr("id",row_id)
        for(j in combat_vars[0].types){
            var def_type = combat_vars[0].types[j]
            var cell_value = combat_vars[0].type_matchups[i][def_type].coeff * combat_vars[0].type_matchups[i][filter].coeff
            var dmg_ranges = {
                0.00:"no_dmg",
                0.25:"quarter_dmg",
                0.50:"half_dmg",
                1.00:"reg_dmg",
                2.00:"double_dmg",
                4.00:"quadruple_dmg"
            }
            var td_id = dmg_ranges[cell_value]
            if(j==="Normal"){
                d3.select("#"+String(row_id))
                    .append("td")
                    .attr("class","typetable_col0")
                    .append("img")
                    .attr("class","typetable_typeimg")
                    .attr("src",img_url)
                d3.select("#"+String(row_id))
                    .select("td")
                    .append("p")
                    .text(atk_type)
                d3.select("#"+String(row_id))
                    .append("td")
                    .attr("id",td_id)
                    .attr("valign","middle")
                    .text(cell_value)
            }
            else{
                d3.select("#"+String(row_id))
                    .append("td")
                    .attr("id",td_id)
                    .attr("valign","middle")
                    .text(cell_value)
            }

        }
    }
}
// Middle function to pull in data 
function update_dual_types_table(filter){
    d3.json("combat_vars").then(combat_vars=>
        dual_types_table(combat_vars,filter)
        )
}
// Outer function connected to Dual Type Table Dropdown
function dual_types_filter_change(){
    var filter = document.getElementsByClassName("typetable_type1sel")[0].value
    d3.select(".dual_type_header").html("")
    d3.select(".dual_type_body").html("")
    update_dual_types_table(filter)
}
// Tab swap function
function swapTabs(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Create Tables, Populate Dropdown, Select Single Type Tab
d3.json("combat_vars").then(combat_vars=>
    single_types_table(combat_vars)
    )
d3.json("combat_vars").then(combat_vars=>
    dual_type_filters(combat_vars)
    )
d3.json("combat_vars").then(combat_vars=>
    dual_types_table(combat_vars,"Normal")
    )
document.getElementById("singletype_tab").click()