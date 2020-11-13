from flask import Flask, render_template, redirect, url_for, jsonify, json
from flask_pymongo import PyMongo
import requests

poke2=Flask(__name__)
# poke2.config["MONGO_URI"]="mongodb://localhost:27017/national_parks_db"
# mongo=PyMongo(poke2)
# np_data = mongo.db.park_info
# np_data_month1 = mongo.db.park_months1
# np_data_month = mongo.db.park_months

@app.route("/")
def index():
    # data = mongo.db.collection
    return render_template(
        "index.html",
        #data=data,
    )

@app.route("/pokemon")
def servePokemon():
    #return jsonify