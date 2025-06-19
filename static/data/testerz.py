import json
import os

# function to construct file path and load json files in as variables
def load_json_from_init(file_name):
    path = os.path.join(file_name)
    with open(path, 'r') as f:
        return json.load(f)


# load in files
pokedex_dict = load_json_from_init('pokedex.json')
combat_vars_dict = load_json_from_init('combat_vars.json')
match_vars_dict = load_json_from_init('match_vars.json')

print(pokedex_dict["pokedex"][420])

# MongoDB stuffs ----------------------------------------
# Establish DB Connection (Local for meow)
#MONGO_URI = os.environ.get("MONGO_URI",'mongodb://localhost:27017')
#client = MongoClient(MONGO_URI)
# Define DB
#db = client.pokefight2
# Clear and Populate Collections
# Pokedex
#pokedex = db.pokedex
#pokedex.drop()
#pokedex.insert_one(pokedex_dict)
# Combat Variables
#combat_vars = db.combat_vars
#combat_vars.drop()
#combat_vars.insert_one(combat_vars_dict)
# Match Options Variables
#match_vars = db.match_vars
#match_vars.drop()
#match_vars.insert_one(match_vars_dict)






type_imgs = {
    "Bug":"static/images/type_imgs/bug.png",
    "Dark":"static/images/type_imgs/dark.png",
    "Dragon":"static/images/type_imgs/dragon.png",
    "Electric":"static/images/type_imgs/electric.png",
    "Fairy":"static/images/type_imgs/fairy.png",
    "Fighting":"static/images/type_imgs/fighting.png",
    "Fire":"static/images/type_imgs/fire.png",
    "Flying":"static/images/type_imgs/flying.png",
    "Ghost":"static/images/type_imgs/ghost.png",
    "Grass":"static/images/type_imgs/grass.png",
    "Ground":"static/images/type_imgs/ground.png",
    "Ice":"static/images/type_imgs/ice.png",
    "Normal":"static/images/type_imgs/normal.png",
    "Poison":"static/images/type_imgs/poison.png",
    "Psychic":"static/images/type_imgs/psychic.png",
    "Rock":"static/images/type_imgs/rock.png",
    "Steel":"static/images/type_imgs/steel.png",
    "Water":"static/images/type_imgs/water.png",
    " - ":" "
}
#dict = {}
#for i in type_imgs:
    # dict["iPwn"] = type_imgs["Steel"]
#    dict[i] = type_imgs[i]
#print(dict)