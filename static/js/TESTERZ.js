//TESTERZ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function ipwntesterz(param){
    if(param==="a"){
        // var test2 = document.getElementById("p2buttons")
        // test2.html("")
        alert("iPwn")
    }
}
//TESTERZ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

for(var i=0,length=50;i<length;i++){
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("class","battletext")
        .text("iPwn")
    // objDiv.scrollTop = objDiv.scrollHeight
}

function regatk(param){
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("id","attacktext")
        .attr("class","battletext")
        .text("Pokemon 1 attacked Pokemon 2 for x damage")
    var scrolldown = document.getElementById("battlelogtextbox")
    scrolldown.scrollTop = scrolldown.scrollHeight
}
function spatk(param){
    d3.select("#battlelogtextbox")
        .append("div")
        .attr("id","spattacktext")
        .attr("class","battletext")
        .text("Pokemon 1 attacked Pokemon 2 for x damage")
    var scrolldown = document.getElementById("battlelogtextbox")
    scrolldown.scrollTop = scrolldown.scrollHeight
    d3.select("#p2buttons")
        .attr("style","visibility:hidden;")
}