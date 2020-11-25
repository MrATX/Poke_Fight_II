import pandas as pd
import pymongo
### Pokedex ---------------------------
# Read & Clean Data
pokemon = pd.read_csv("Pokemon.csv")
pokemon = pokemon.loc[pokemon["Mega"]=="No"].reset_index()
pokemon = pokemon.iloc[:,1:]
pokemon = pokemon.drop(columns=["Mega"])
pokemon["img_url"] = "hold"
pokemon["tableindex"] = "hold"
pokemon["type1img"] = "hold"
pokemon["type2img"] = "hold"
totalpoke = pokemon.index.nunique()
pokemon = pokemon.fillna(" - ")
for i in range(0,totalpoke):
    pokemon.iloc[i,13] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon.iloc[i,0].item()}.png"
    if pokemon.iloc[i,12] == "Yes":
        pokemon.iloc[i,12] = "Legendary"
    else:
        pokemon.iloc[i,12] = " - "
# Create Variables
gen_list = pokemon.loc[:,"Generation"].unique()
pokedex_fields = ["num","name","type1","type2","total","hp","attack","defense","spatk","spdef","speed","generation","legendary","img_url","tableindex","type1img","type2img"]
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
pokedex_dict = {}
wip_list_gen = []
wip_dict_poke = {}
for i in range(len(pokemon)):
    for j in range(len(pokedex_fields)):
        pokemon.iloc[i,15] = type_imgs[pokemon.iloc[i,2]]
        pokemon.iloc[i,16] = type_imgs[pokemon.iloc[i,3]]
        if type(pokemon.iloc[i,j])==str:
            wip_dict_poke[pokedex_fields[j]]=(pokemon.iloc[i,j])
        else:
            wip_dict_poke[pokedex_fields[j]]=(pokemon.iloc[i,j].item())
    wip_list_gen.append(wip_dict_poke)
    wip_dict_poke = {}
pokedex_dict["pokedex"] = (wip_list_gen)
wip_list_gen = []
### Combat Variables ---------------------------------
# Read Data
type_matchups = pd.read_csv("type_matchups.csv").set_index("TYPE")
# Create Variables
type_coeffs = []
wip_dict_type = {}
types = []
for i in type_matchups:
    if i != "TYPE":
        types.append(i)
coeff_values = {
    0.0:{"id":"no_dmg","text":"Ineffective"},
    0.25:{"id":"quarter_dmg","text":"Berely Ineffective"},
    0.5:{"id":"half_dmg","text":"Mildly Effective"},
    1:{"id":"single_dmg","text":"Effective"},
    2:{"id":"double_dmg","text":"Very Effective"},
    4:{"id":"quadruple_dmg","text":"Super Effective"},
}
# Populate type_coeffs dict and push to combat vars
for i in range(len(types)):
    for j in range(len(types)):
        wip_dict_type["type"]=(types[i])
        coeff_id = coeff_values[type_matchups.loc[types[i],types[j]]]["id"]
        coeff_text = coeff_values[type_matchups.loc[types[i],types[j]]]["text"]
        if type(type_matchups.loc[types[i],types[j]])==str:
            # wip_dict_type[types[j]]=(type_matchups.loc[types[i],types[j]])
            coeff_id = coeff_values[types[i],types[j]]["id"]
            coeff_text = coeff_values[types[i],types[j]]["text"]
            wip_dict_type[types[j]] = {
                "coeff":type_matchups.loc[types[i],types[j]],
                "id":coeff_id,
                "text":coeff_text
            }
        else:
            # wip_dict_type[types[j]]=(type_matchups.loc[types[i],types[j]].item())
            wip_dict_type[types[j]] = {
                "coeff":type_matchups.loc[types[i],types[j]].item(),
                "id":coeff_id,
                "text":coeff_text
            }
    type_coeffs.append(wip_dict_type)
    wip_dict_type = {}
combat_vars_dict = {}
combat_vars_dict["type_matchups"]=(type_coeffs)
### Match Option Variables ---------------------------------
# Radios
# nplayers
nplayers_radio_values = ["1","2"]
nplayers_radio_ids = ["One Player","Two Player"]
nplayers_radio_text = ["One Player","Two Player"]
nplayers_ = [nplayers_radio_values,nplayers_radio_ids,nplayers_radio_text]
nplayers_radios = {
    "name":"nplayers",
    "prompt":"Choose Number of Players",
    "values":nplayers_radio_values,
    "ids":nplayers_radio_ids,
    "text":nplayers_radio_text
}
# npoke
npoke_radio_values = ["2","3","4","5","6"]
npoke_radio_ids = ["two","three","four","five","six"]
npoke_radio_text = ["2","3","4","5","6"]
npoke_radios = {
    "name":"npoke",
    "prompt":"Choose Number of Pokemon",
    "values":npoke_radio_values,
    "ids":npoke_radio_ids,
    "text":npoke_radio_text
}
# weight_class
weight_class_radio_values = ["light","middle","heavy","legendary","all"]
weight_class_radio_ids = ["Lightweight","Middleweight","Heavyweight","Legendary",""]
weight_class_radio_text = ["Lightweight","Middleweight","Heavyweight","Legendary","All Classes"]
weight_class_radios = {
    "name":"weight_class",
    "prompt":"Choose Pokemon Weight Class",
    "values":weight_class_radio_values,
    "ids":weight_class_radio_ids,
    "text":weight_class_radio_text
}
# generation
generation_radio_values = ["1","2","3","4","5","6","7","8","all"]
generation_radio_ids = ["1st","2nd","3rd","4th","5th","6th","7th","8th","any"]
generation_radio_text = [
    "Gen I - Red & Blue",
    "Gen II - Silver & Gold",
    "Gen III - Ruby & Sapphire",
    "Gen IV - Diamond & Pearl",
    "Gen V - Black & White",
    "Gen VI - X & Y",
    "Gen VII - Sun & Moon",
    "Gen VIII - Sword & Shield",
    "All Generations"
]
generation_radios = {
    "name":"generation",
    "prompt":"Choose Pokemon Generation",
    "values":generation_radio_values,
    "ids":generation_radio_ids,
    "text":generation_radio_text
}
# Combine Radio Dictionaries
radios = {
    "nplayers":nplayers_radios,
    "npoke":npoke_radios,
    "weight_class":weight_class_radios,
    "generation":generation_radios
}
radios_dict = {}
radios_dict["radios"]=(radios)
# MongoDB stuffs ----------------------------------------
# Establish DB Connection (Local for meow)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
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
match_vars.insert_one(radios_dict)