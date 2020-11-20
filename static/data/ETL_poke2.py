import pandas as pd
import pymongo
### Pokedex ---------------------------
# Read & Clean Data
pokemon = pd.read_csv("Pokemon.csv")
pokemon = pokemon.iloc[:,1:]
pokemon = pokemon.drop(columns=["Type 2"])
# Create Variables
gen_list = pokemon.loc[:,"Generation"].unique()
pokedex_fields = ["name","type1","total","hp","attack","defense","spatk","spdef","speed","generation"]
pokedex_dict = {}
#wip_dict_gen = {}
wip_list_gen = []
wip_dict_poke = {}
# Subset Legendary Pokemon
legends = pokemon.loc[(pokemon["Legendary"]=="Yes")&(pokemon["Mega"]=="No")].reset_index()
legends = legends.iloc[:,1:]
# Filter Pokemon >500 Total Power, Non-Legendary, Non-Mega
pokemon = pokemon.loc[(pokemon["Total"]>=500)&(pokemon["Legendary"] =="No")&(pokemon["Mega"]=="No")].reset_index()
pokemon = pokemon.iloc[:,1:]
# Populate Pokedex dict of dicts with all filtered Pokemon, sorted into generations
for i in gen_list:
    wip_df = pokemon.loc[pokemon["Generation"]==i,:]
    for j in range(len(wip_df)):
        for k in range(len(pokedex_fields)):
            if type(wip_df.iloc[j,k])==str:
                wip_dict_poke[pokedex_fields[k]]=(wip_df.iloc[j,k])
            else:
                wip_dict_poke[pokedex_fields[k]]=(wip_df.iloc[j,k].item())
        #wip_dict_gen[wip_df.iloc[j,0]] = (wip_dict_poke)
        wip_list_gen.append(wip_dict_poke)
        wip_dict_poke = {}
    pokedex_dict[f"gen{i}"]=(wip_list_gen)
    #wip_dict_gen = {}
    wip_list_gen = []
# Add Legendary Pokemon dict to Pokedex
for i in range(len(legends)):
    for j in range(len(pokedex_fields)):
        if type(legends.iloc[i,j])==str:
            wip_dict_poke[pokedex_fields[j]]=(legends.iloc[i,j])
        else:
            wip_dict_poke[pokedex_fields[j]]=(legends.iloc[i,j].item())
    #wip_dict_gen[legends.iloc[i,0]] = (wip_dict_poke)
    wip_list_gen.append(wip_dict_poke)
    wip_dict_poke = {}
pokedex_dict["genL"] = (wip_list_gen)
#wip_dict_gen = {}
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