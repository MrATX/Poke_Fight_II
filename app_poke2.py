from flask import Flask, render_template, redirect, url_for, jsonify, json, request
from flask_pymongo import PyMongo
import pymongo
import requests
import sys
import mongo_funz

poke2=Flask(__name__)
poke2.config['JSON_SORT_KEYS'] = False
poke2.config["MONGO_URI"]="mongodb://localhost:27017/pokefight2"
mongo=PyMongo(poke2)
pokedex = mongo.db.pokedex
combat_vars = mongo.db.combat_vars
match_vars = mongo.db.match_vars
# rosters = mongo.db.rosters
# active = mongo.db.active

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
        gen = request.form['gen']
        mongo_funz.mongo_push(nplayers,npoke,gen)
        return render_template(
            'roster_select.html',
            nplayers = nplayers,
            npoke = npoke,
            gen = gen,
        )

@poke2.route("/match_active")
def match_active():
    return render_template(
        "match_active.html",
    )

@poke2.route("/match_over")
def match_over():
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

@poke2.route("/match_vars")
def serveMatchvars():
    return jsonify(list(match_vars.find({ },
   { '_id': 0})))

# @app.route("/rosters")
# def servePokemon():
#     return jsonify(list(rosters.find({ },
#    { '_id': 0})))

# @app.route("/active")
# def servePokemon():
#     return jsonify(list(active.find({ },
#    { '_id': 0})))

@poke2.route('/PythonFunctionName', methods=['POST', 'GET'])
def getPage():
    if request.method == 'POST':
        strTextBoxVal= request.form['HTMLControlName']
        if strTextBoxVal=="poop":
            return render_template(
                'page.html',
                strTextBoxVal = strTextBoxVal,
            )

if __name__=="__main__":
    poke2.run(debug=True)