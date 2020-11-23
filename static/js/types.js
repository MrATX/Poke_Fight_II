function types_table(combat_vars){
    d3.select("#single_type_body")
        .selectAll("tr")
        .data(combat_vars[0].type_matchups)
        .enter()
        .append("tr")
        .html(d => `<td id="typesrow" style="position:sticky;left:0;background-color:burlywood;"><img src="static/images/type_imgs/${d.type}.png" id="typeimg"><br>${d.type}</td>
            <td id="${d.Normal.id}">${d.Normal.coeff}</td>
            <td id="${d.Fighting.id}">${d.Fighting.coeff}</td>
            <td id="${d.Flying.id}">${d.Flying.coeff}</td>
            <td id="${d.Poison.id}">${d.Poison.coeff}</td>
            <td id="${d.Ground.id}">${d.Ground.coeff}</td>
            <td id="${d.Rock.id}">${d.Rock.coeff}</td>
            <td id="${d.Bug.id}">${d.Bug.coeff}</td>
            <td id="${d.Ghost.id}">${d.Ghost.coeff}</td>
            <td id="${d.Steel.id}">${d.Steel.coeff}</td>
            <td id="${d.Fire.id}">${d.Fire.coeff}</td>
            <td id="${d.Water.id}">${d.Water.coeff}</td>
            <td id="${d.Grass.id}">${d.Grass.coeff}</td>
            <td id="${d.Electric.id}">${d.Electric.coeff}</td>
            <td id="${d.Psychic.id}">${d.Psychic.coeff}</td>
            <td id="${d.Ice.id}">${d.Ice.coeff}</td>
            <td id="${d.Dragon.id}">${d.Dragon.coeff}</td>
            <td id="${d.Dark.id}">${d.Dark.coeff}</td>
            <td id="${d.Fairy.id}">${d.Fairy.coeff}`)
}

d3.json("combat_vars").then(combat_vars=>
    types_table(combat_vars),
    )

function openCity(evt, cityName) {
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
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    }     