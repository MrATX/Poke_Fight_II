import pandas as pd
import urllib.request
pokemon = pd.read_csv("0gifscrape_data.csv")
pokemon = pokemon.iloc[:,1:]
for i in range(len(pokemon)):
    pokename = f"{pokemon.iloc[i,0]}.gif"
    pokeurl = pokemon.iloc[i,1]
    urllib.request.urlretrieve(pokeurl,pokename)
