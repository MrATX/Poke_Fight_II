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
    else{
        alert("Select # of Players, # of Pokemon, Pokemon Weight Class, and Pokemon Generation to continue")   
    }
}