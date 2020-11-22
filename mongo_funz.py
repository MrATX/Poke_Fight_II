import pymongo

def match_vars_push(nplayers,npoke,weight_class,gen):
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.pokefight2
    match_vars = db.match_vars
    match_vars.drop()

