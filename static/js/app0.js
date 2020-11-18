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
        typeof gen_sel !=='undefined'){
            console.log(nplayers_sel,npoke_sel,gen_sel)
            var match_text = "Begin a " + nplayers_text + " match with " +
            npoke_text + " " + gen_text + " Pokemon?"
            if (confirm(match_text)) {
                window.location.href = "match_active";
                }
    }
    else{
        alert("Select # of Players, # of Pokemon, and a Pokemon Generation to continue")   
    }
}

function testerz(varhere){
    console.log(varhere);
}

// function pushvars(){
//     var match_vars = {
//         "nplayers":nplayers_sel,
//         "npoke":npoke_sel,
//         "gen":gen_sel
//     };
//     var MongoClient = require(['mongoDB']).MongoClient;
//     MongoClient.connect("mongodb://localhost:27017/pokefight2",function(err,db){
//         if(err) throw err;
//         console.log(match_vars);
//     });
// }

// function pushvars(){
//     var MongoClient = require([('mongodb').MongoClient]);
//     // var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://localhost:27017/pokefight2";
//     MongoClient.connect(url, function(err,db){
//         console.log("We are connected");
//         })
//         db.close();
// };