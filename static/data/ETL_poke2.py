import pandas as pd
import pymongo
### Pokedex ---------------------------
# Read & Clean Data
pokemon = pd.read_csv("Pokemon.csv")
pokemon["img_url"] = "hold"
pokemon["gen_index"] = "hold"
totalpoke = pokemon.index.nunique()
for i in range(0,totalpoke):
    pokemon.iloc[i,14] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon.iloc[i,0].item()}.png"
pokemon = pokemon.drop(columns=["Type 2"])
# Create Variables
gen_list = pokemon.loc[:,"Generation"].unique()
pokedex_fields = ["num","name","type1","total","hp","attack","defense","spatk","spdef","speed","generation","img_url","gen_index"]
pokedex_dict = {}
#wip_dict_gen = {}
wip_list_gen = []
wip_dict_poke = {}
# Master Pokemon df
pokemon_master = pokemon
pokemon_master = pokemon_master.drop(columns=["Legendary","Mega"])
# Subset Legendary Pokemon
legends = pokemon.loc[(pokemon["Legendary"]=="Yes")&(pokemon["Mega"]=="No")].reset_index()
legends = legends.drop(columns=["Legendary","Mega"])
legends = legends.iloc[:,1:]
# Filter Pokemon >500 Total Power, Non-Legendary, Non-Mega
pokemon = pokemon.loc[(pokemon["Total"]>=500)&(pokemon["Legendary"] =="No")&(pokemon["Mega"]=="No")].reset_index()
pokemon = pokemon.drop(columns=["Legendary","Mega"])
pokemon = pokemon.iloc[:,1:]
# Master Pokedex dict
for i in range(len(pokemon_master)):
    for j in range(len(pokedex_fields)):
        if type(pokemon_master.iloc[i,j])==str:
            wip_dict_poke[pokedex_fields[j]]=(pokemon_master.iloc[i,j])
        else:
            wip_dict_poke[pokedex_fields[j]]=(pokemon_master.iloc[i,j].item())
    wip_list_gen.append(wip_dict_poke)
    wip_dict_poke = {}
pokedex_dict["master"] = (wip_list_gen)
wip_list_gen = []
# Populate Pokedex dict of dicts with all filtered Pokemon, sorted into generations
for i in gen_list:
    wip_df = pokemon.loc[pokemon["Generation"]==i,:]
    index_wip = -1
    for z in range(0,wip_df.index.nunique()):
        index_wip = index_wip + 1
        wip_df.iloc[z,12] = str(index_wip)
        for j in range(len(wip_df)):
            for k in range(len(pokedex_fields)):
                if type(wip_df.iloc[j,k])==str:
                    wip_dict_poke[pokedex_fields[k]]=(wip_df.iloc[j,k])
                else:
                    wip_dict_poke[pokedex_fields[k]]=(wip_df.iloc[j,k].item())
            wip_list_gen.append(wip_dict_poke)
            wip_dict_poke = {}
        pokedex_dict[f"gen{i}"]=(wip_list_gen)
        wip_list_gen = []
# Add Legendary Pokemon dict to Pokedex
for i in range(len(legends)):
    index_wip = -1
    for z in range(0,legends.index.nunique()):
        index_wip = index_wip + 1
        legends.iloc[z,12] = str(index_wip)
        for j in range(len(pokedex_fields)):
            if type(legends.iloc[i,j])==str:
                wip_dict_poke[pokedex_fields[j]]=(legends.iloc[i,j])
            else:
                wip_dict_poke[pokedex_fields[j]]=(legends.iloc[i,j].item())
    wip_list_gen.append(wip_dict_poke)
    wip_dict_poke = {}
pokedex_dict["genL"] = (wip_list_gen)
wip_list_gen = []
# Add dict with Pokemon names for each gen
gen_name_lists = {}
wip_list = []
for i in gen_list:
    gen_name = f"gen{i}_names"
    gen = f"gen{str(i)}"
    for j in pokedex_dict[gen]:
        wip_list.append(j)
    gen_name_lists[gen_name] = (wip_list)
    wip_list = []
for i in pokedex_dict["genL"]:
    wip_list.append(i)
gen_name_lists["genL"] = (wip_list)
pokedex_dict["gen_name_lists"] = (gen_name_lists)
wip_list = []
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
# Rosters for Current Match
#rosters = db.rosters
#rosters.drop()
#rosters.insert_one(rosters_dict)
# Active Pokemon in Combat
#active = db.active
#active.drop()
#active.insert_one(active_dict)