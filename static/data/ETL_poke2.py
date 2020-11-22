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
pokedex_fields = ["num","name","type1","type2","total","hp","attack","defense","spatk","spdef","speed","generation","legendary","img_url","tableindex"]
pokedex_dict = {}
wip_list_gen = []
wip_dict_poke = {}
for i in range(len(pokemon)):
    for j in range(len(pokedex_fields)):
        if type(pokemon.iloc[i,j])==str:
            wip_dict_poke[pokedex_fields[j]]=(pokemon.iloc[i,j])
        else:
            wip_dict_poke[pokedex_fields[j]]=(pokemon.iloc[i,j].item())
    wip_list_gen.append(wip_dict_poke)
    wip_dict_poke = {}
pokedex_dict["pokedex"] = (wip_list_gen)
wip_list_gen = []
### Combat Vars ---------------------------------
# Read Data
type_matchups = pd.read_csv("type_matchups.csv").set_index("TYPE")
# Create Variables
type_coeffs = {}
wip_dict_type = {}
types = []
for i in type_matchups:
    if i != "TYPE":
        types.append(i)
# Populate type_coeffs dict and push to combat vars
for i in range(len(types)):
    for j in range(len(types)):
        if type(type_matchups.loc[types[i],types[j]])==str:
            wip_dict_type[types[j]]=(type_matchups.loc[types[i],types[j]])
        else:
            wip_dict_type[types[j]]=(type_matchups.loc[types[i],types[j]].item())
    type_coeffs[types[i]]=(wip_dict_type)
    wip_dict_type = {}
combat_vars_dict = {}
combat_vars_dict["type_matchups"]=(type_coeffs)
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