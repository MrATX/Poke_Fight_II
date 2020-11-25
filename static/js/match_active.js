// RADIOS ---------------------------------------------------------
// Base Function
// Create and Display Radios for Selection Match Parameters
function render_radios(radio_vars){
    console.log(radio_vars.values.length)
    d3.select(String(radio_vars.name))        
        .append("div")
        .attr("class","jumbotron")
        .attr("id","prompt_jumbo")
        .append("h1")
        .attr("class","radio_prompt")
        .text(radio_vars.prompt)
    d3.select(String(radio_vars.name))
        .select("#prompt_jumbo")
    d3.select(String(radio_vars.name))
        .select("#prompt_jumbo")
        .append("row")
    if(String(radio_vars.name)==="generation"){
        for(var i=0,length=radio_vars.values.length;i<length;i++){
            d3.select(String(radio_vars.name))
                .select("#prompt_jumbo")
                .append("p")
                .attr("class","jumbopara")
                .append("radio")
                .attr("class","radio")
                .html(`<input type="radio"
                        name="${radio_vars.name}"
                        value="${radio_vars.values[i]}"
                        id="hold">${radio_vars.text[i]}`)
        }
    }
    else{
        for(var i=0,length=radio_vars.values.length;i<length;i++){
            d3.select(String(radio_vars.name))
                .select("#prompt_jumbo")
                .select("row")
                .append("radio")
                .attr("class","radio")
                .html(`<input class="radio" type="radio"
                        name="${radio_vars.name}"
                        value="${radio_vars.values[i]}"
                        id="hold">${radio_vars.text[i]}`)
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
// RADIOS ---------------------------------------------------------
function clearradios(){
    d3.select("#radios_container").html("")
}