import pandas as pd
import pymongo
### Pokedex ---------------------------
# Read & Clean Data
pokemon = pd.read_csv("Pokemon.csv")
pokemon["weight_class"] = "hold"
pokemon["img_url"] = "hold"
pokemon["tableindex"] = "hold"
pokemon["type1img"] = "hold"
pokemon["type2img"] = "hold"
totalpoke = pokemon.index.nunique()
pokemon = pokemon.fillna(" - ")
image_exceptions = ["slowbro-galar","sirfetchd","kubfu","urshifu","urshifu-rapid-strike","zarude"]
for i in range(0,totalpoke):
    if pokemon.iloc[i,14] in image_exceptions:
        pokemon.iloc[i,16] = f"https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/{pokemon.iloc[i,14]}.gif"
    if pokemon.iloc[i,14] not in image_exceptions:
        pokemon.iloc[i,16] = f"https://projectpokemon.org/images/normal-sprite/{pokemon.iloc[i,14]}.gif"
    # Previously used static images; missing images for expanded Pokedex, should still work fine for most Pokemon though
    # pokemon.iloc[i,14] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon.iloc[i,0].item()}.png"
    if pokemon.iloc[i,12] == "Yes":
        pokemon.iloc[i,12] = "Legendary"
    if pokemon.iloc[i,12] == "No":
        pokemon.iloc[i,12] = " - "
pokemon = pokemon.reset_index()
pokemon["id"] = pokemon["index"]
pokemon = pokemon.drop(columns="index")
# Create Variables
# Setup Weight Classes
weight_class_keys = ["feather","light","welter","middle","cruiser","heavy"]
weight_classes_dict = {
    "feather":[0,300],
    "light":[300,400],
    "welter":[400,500],
    "middle":[500,600],
    "cruiser":[600,700],
    "heavy":[700,800],
    "all":[0,1000]
}
gen_list = pokemon.loc[:,"Generation"].unique()
pokedex_fields = ["num","name","type1","type2","total","hp","attack","defense","spatk","spdef","speed","generation","legendary","mega","altname","weight_class","img_url","tableindex","type1img","type2img","id"]
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
        pokemon.iloc[i,18] = type_imgs[pokemon.iloc[i,2]]
        pokemon.iloc[i,19] = type_imgs[pokemon.iloc[i,3]]
        for k in weight_class_keys:
            if pokemon.iloc[i,4] >= weight_classes_dict[k][0] and pokemon.iloc[i,4] < weight_classes_dict[k][1]:
                    pokemon.iloc[i,15] = k
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
type_coeffs = {}
wip_dict_type = {}
types = []
combat_vars_dict = {}
combat_vars_dict["weight_classes"]=(weight_classes_dict)
for i in type_matchups:
    if i != "TYPE":
        types.append(i)
coeff_values = {
    0.0:{"id":"no_dmg","text":"Ineffective"},
    0.25:{"id":"quarter_dmg","text":"Berely Effective"},
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
            coeff_id = coeff_values[types[i],types[j]]["id"]
            coeff_text = coeff_values[types[i],types[j]]["text"]
            wip_dict_type[types[j]] = {
                "coeff":type_matchups.loc[types[i],types[j]],
                "id":coeff_id,
                "text":coeff_text
            }
        else:
            wip_dict_type[types[j]] = {
                "coeff":type_matchups.loc[types[i],types[j]].item(),
                "id":coeff_id,
                "text":coeff_text
            }
    type_coeffs[types[i]] = wip_dict_type
    wip_dict_type = {}
combat_vars_dict["type_matchups"]=(type_coeffs)
# Pokemon Types
types_dict = {}
types_list = [
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy"
]
for i in types_list:
    types_dict[i] = i
combat_vars_dict["types"]=(types_dict)
combat_vars_dict["types_list"]=(types_list)
### Match Option Variables ---------------------------------
match_vars_dict = {}
# Radios
# nplayers
nplayers_radio_values = ["1","2"]
nplayers_radio_ids = ["oneplayerradio","twoplayerradio"]
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
weight_class_radio_values = ["feather","light","welter","middle","cruiser","heavy","all"]
weight_class_radio_ids = ["Featherweight","Lightweight","Welterweight","Middleweight","Cruiserweight","Heavyweight","allclasses"]
weight_class_radio_text = ["Featherweight","Lightweight","Welterweight","Middleweight","Cruiserweight","Heavyweight","All Classes"]
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
match_vars_dict["radios"]=(radios)
# Table Headers
pokedex_headers = [
    "#","","","","","TOTAL","HP",
    "ATK","DEF","SP ATK","SP DEF",
    "SPD","GENERATION","LEGENDARY"
]
match_vars_dict["pokedex_headers"]=(pokedex_headers)
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
match_vars.insert_one(match_vars_dict)