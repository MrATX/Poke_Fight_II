function radios_val(name,value){
    var radios = document.getElementsByName(name);
    for(var i=0, length=radios.length; i<length; i++){
        if(radios[i].checked){
            if(name==="nplayers"){
                var nplayers_sel = value;
            }
            if(name==="npoke"){
                var npoke_sel = value;
            }
            if(name==="gen"){
                var gen_sel = value;
            }
            console.log(value);
            break;
        }
    }
    return nplayers_sel;
            npoke_sel;
            gen_sel;
}
console.log("poop")

function gimmethosevars(){
    console.log(nplayers_sel);
    console.log(npoke_sel);
    console.log(gen_sel);
}