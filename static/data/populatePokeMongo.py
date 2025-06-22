import json
import os
from pymongo import MongoClient

# function to construct file path and load json files in as variables
def load_json_from_init(file_name):
    #path = os.path.join(file_name)
    path = os.path.join('static', 'data', file_name)
    with open(path, 'r') as f:
        return json.load(f)


# load in files
pokedex_dict = load_json_from_init('pokedex.json')
combat_vars_dict = load_json_from_init('combat_vars.json')
match_vars_dict = load_json_from_init('match_vars.json')

#print(pokedex_dict["pokedex"][999])

# MongoDB stuffs ----------------------------------------
# Establish DB Connection (Local for meow)
MONGO_URI = os.environ.get("MONGO_URI",'mongodb://localhost:27017')
client = MongoClient(MONGO_URI)

#MONGO_URI = os.environ.get("MONGO_URI",'mongodb://35.90.73.74:27017')
#client = MongoClient('mongodb://35.90.73.74:27017')
# Define DB
db = client.pokefight2
# Clear and Populate Collections
# Pokedex
pokedex = db.pokedex
pokedex.drop()
pokedex.insert_one(pokedex_dict)
# Combat Variables
combat_vars = db.combat_vars
combat_vars.drop()
combat_vars.insert_one(combat_vars_dict)
# Match Options Variables
match_vars = db.match_vars
match_vars.drop()
match_vars.insert_one(match_vars_dict)