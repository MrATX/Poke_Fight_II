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
        "pokedex.html",
        pokedex = pokedex,
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
        pokedex = pokedex,
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
    if request.method == 'POST':
        npoke = request.form['npoke']
        p1_name = request.form['p1_name']
        p1_roster = []
        for i in range(int(npoke)):
            pokename = f"p1pokemon{i+1}"
            wip = request.form[pokename]
            p1_roster.append(wip)
        p2_name = request.form['p2_name']
        p2_roster = []
        for i in range(int(npoke)):
            pokename = f"p2pokemon{i+1}"
            wip = request.form[pokename]
            p2_roster.append(wip)
        return render_template(
            'match_active.html',
            npoke = npoke,
            p1_name = p1_name,
            p1_roster = p1_roster,
            p2_name = p2_name,
            p2_roster = p2_roster,
        )
# Testerz match_active page for static test variables
# @poke2.route("/match_active")
# def match_active_wip():
#     return render_template(
#         "match_active.html",
#     )
# Not using this page anymore to not have to pass data across pages just for victory screen
# @poke2.route("/match_over")
# def match_over():
#     return render_template(
#         "match_over.html",
#     )
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