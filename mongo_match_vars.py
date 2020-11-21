import pymongo

def match_vars_push(nplayers,npoke,weight_class,gen):
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.pokefight2
    match_vars_dict = {
        "nplayers":nplayers,
        "npoke":npoke,
        "weight_class":weight_class,
        "gen":gen
    }
    match_vars = db.match_vars
    match_vars.drop()
    match_vars.insert_one(match_vars_dict)

