import pymongo

def match_vars_push(nplayers,npoke,gen):
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.pokefight2
    match_vars_dict = {
        "nplayers":nplayers,
        "npoke":npoke,
        "gen":gen
    }
    match_vars = db.match_vars
    match_vars.drop()
    match_vars.insert_one(match_vars_dict)

