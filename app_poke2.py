from flask import Flask, render_template, redirect, url_for, jsonify, json, request
from flask_pymongo import PyMongo
import pymongo
import requests
import sys
# Data Variables --------------------------------------------------
poke2=Flask(__name__)
poke2.config['JSON_SORT_KEYS'] = False
poke2.config["MONGO_URI"]="mongodb://localhost:27017/pokefight2"
mongo=PyMongo(poke2)
pokedex = mongo.db.pokedex
combat_vars = mongo.db.combat_vars
match_vars = mongo.db.match_vars
# Frontend App Routes --------------------------------------------------
# Main Menu routes --------------------------------------------------
@poke2.route("/")
def index():
    return render_template(
        "index.html",
    )
@poke2.route("/info_menu")
def info_menu():
    return render_template(
        "info_menu.html",
    )
@poke2.route("/pokedex")
def servePokedex():
    return render_template(
        "pokedex2.html",
        pokedex = pokedex,
    )
@poke2.route("/pokedex2")
def servePokedex2():
    return render_template(
        "pokedex.html",
    )
@poke2.route("/types")
def types():
    return render_template(
        "types.html",
    )
# Match Routes --------------------------------------------------
@poke2.route("/match_setup",methods=['GET','POST'])
def match_setup():
    return render_template(
        "match_setup.html",
    )
@poke2.route("/roster_select",methods=['GET','POST'])
def roster_select():
    if request.method == 'POST':
        nplayers = request.form['nplayers']
        npoke = request.form['npoke']
        weight_class = request.form['weight_class']
        gen = request.form['gen']
        return render_template(
            'roster_select.html',
            nplayers = nplayers,
            npoke = npoke,
            weight_class = weight_class,
            gen = gen,
            pokedex = pokedex,
        )
@poke2.route("/match_active",methods=['GET','POST'])
def match_active():
    return render_template(
        'match_active.html',
        pokedex = pokedex,
    )
@poke2.route("/match_over")
def match_over():
    return render_template(
        "match_over.html",
    )
# Backend App Routes --------------------------------------------------
@poke2.route("/pokedex_data")
def servePokemon():
    return jsonify(list(pokedex.find({ },
   { '_id': 0})))
@poke2.route("/combat_vars")
def serveCombatvars():
    return jsonify(list(combat_vars.find({ },
   { '_id': 0})))
@poke2.route("/match_vars")
def serveMatchvars():
    return jsonify(list(match_vars.find({ },
   { '_id': 0})))
# Run App --------------------------------------------------
if __name__=="__main__":
    poke2.run(debug=True)