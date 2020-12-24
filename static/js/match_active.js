// Leave Match Check
function leave_match(){
    var prompt_text = "Are you sure you want to quit the match and return to the home page?"
    if(confirm(prompt_text)){
        window.location.href = "/"
    }
}

// WIPWIPWIP VARIABLES
var npoke = "6"
var p1name = "JDUB"
var p1roster = ["charizard","typhlosion","scizor","mega-gyrados","rayquaza","umbreon"]
var p2name = "iPwn"
var p2roster = ["articuno","zapdos","moltres","raikou","entei","suicune"]
// WIPWIPWIP VARIABLES

// Setup Player Roster Visualizations
// Non-dynamic now; to be modified
function renderp1roster(data){
    var rosternametext = p1name+"'s Pokemon Roster"
    d3.select("#p1rosterdiv")
        .append("div")
        .attr("class","row")
        .append("h1")
        .text(rosternametext)
    d3.select("#p1rosterdiv")
        .append("div")
        .attr("class","row")
        .attr("id","p1pokeballz")
    d3.select("#p1rosterdiv")
        .append("div")
        .attr("class","row")
        .attr("id","p1rostersprites")
    for(var i=0,length=parseInt(npoke);i<length;i++){
        d3.select("#p1pokeballz")
            .append("img")
            .attr("class","pokeball")
            .attr("src",)
    }
}

renderp1roster()
