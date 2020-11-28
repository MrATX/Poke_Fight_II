var test_array = [1,2,3]

d3.select("testez")
    .append("p")
test_array.forEach(i=>{
    d3.select("testerz")
        .append()
        .html(`<input type="radio" name="nplayers" value="1" id="One Player"> ${i}`)
})




// Function ran with each clicking of a Radio input
// Assigns selections to global variables for use in next function
function radios_val(name,value,id){
    var radios = document.getElementsByName(name);
    for(var i=0, length=radios.length; i<length; i++){
        if(radios[i].checked){
            if(name==="nplayers"){
                window.nplayers_sel = value;
                window.nplayers_text = id;
            }
            if(name==="npoke"){
                window.npoke_sel = value;
                window.npoke_text = id;
            }
            if(name==="weight_class"){
                window.weight_class_sel = value;
                window.weight_class_text = id;
            }
            if(name==="gen"){
                window.gen_sel = value;
                window.gen_text = id;
            }
            break;
        }
    }
}
// Function attached to Continue button
// Checks to make sure all required options are selected
// Continues to roster_select once input requriments are met
function beginmatch(){
    if(typeof nplayers_sel !=='undefined' &&
        typeof npoke_sel !=='undefined' &&
        typeof weight_class_sel !== 'undefined' &&
        typeof gen_sel !=='undefined'){
            console.log(nplayers_sel,npoke_sel,weight_class_sel,gen_sel)
            var match_text = "Begin a " + nplayers_text + " match with " +
            npoke_text + weight_class_text + " Pokemon from " + gen_text + " generation?"
            if (confirm(match_text)){
                document.getElementById('setup_button').click();
                console.log('iPwn');
            }
    }
    // Prompt alert message and exit function if required option(s) are missing
    else{
        console.log(nplayers_sel,npoke_sel,weight_class_sel,gen_sel)
        alert("Select # of Players, # of Pokemon, Pokemon Weight Class, and Pokemon Generation to continue")   
    }
}