from flask import Flask, render_template, redirect, url_for, jsonify, json
from flask_pymongo import PyMongo
import requests

poke2=Flask(__name__)
poke2.config['JSON_SORT_KEYS'] = False
poke2.config["MONGO_URI"]="mongodb://localhost:27017/pokefight2"
mongo=PyMongo(poke2)
pokedex = mongo.db.pokedex
combat_vars = mongo.db.combat_vars
# rosters = mongo.db.rosters
# active = mongo.db.active

@poke2.route("/")
def index():
    return render_template(
        "index.html",
    )

@poke2.route("/info_menu")
def match_setup():
    return render_template(
        "info_menu.html",
    )

@poke2.route("/match_setup")
def match_setup():
    return render_template(
        "match_setup.html",
    )

@poke2.route("/match_active")
def match_setup():
    return render_template(
        "match_active.html",
    )

@poke2.route("/match_over")
def match_setup():
    return render_template(
        "match_over.html",
    )

@poke2.route("/pokedex")
def servePokemon():
    return jsonify(list(pokedex.find({ },
   { '_id': 0})))

@poke2.route("/combat_vars")
def serveCombatvars():
    return jsonify(list(combat_vars.find({ },
   { '_id': 0})))

# @app.route("/rosters")
# def servePokemon():
#     return jsonify(list(rosters.find({ },
#    { '_id': 0})))

# @app.route("/active")
# def servePokemon():
#     return jsonify(list(active.find({ },
#    { '_id': 0})))

if __name__=="__main__":
    poke2.run(debug=True)