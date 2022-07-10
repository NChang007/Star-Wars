"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Characters, Favorites
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# get all characters
@api.route('/characters', methods=['GET'])
def getAllCharacters():
  characters = Characters.query.all()
  if characters is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=[character.serialize() for character in characters]) 

# get one Character
@api.route('/characters/<int:id>', methods=['GET'])
def getOneCharacters(id):
  character = Characters.query.get(id)
  if character is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=character.serialize())

# get all favorites
@api.route('/favorites', methods=['GET'])
def getAllFavorites():
  favorites = Favorites.query.all()
  if favorites is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=[favorite.serialize() for favorite in favorites]) 

#add a fave
@api.route('/addfavorites', methods=['POST'])
def getFavorite():
  request_body = request.get_json()
  print(request_body)
  favorite = Favorites(fave_id = request_body["id"],
                    name = request_body["name"],
                    item_type = request_body["itemType"])

  db.session.add(favorite)   
  db.session.commit()
  return jsonify(msg="good job")

# remove favorite
@api.route('/deletefav/<int:id>', methods=['DELETE'])
def removeFav(id):
  Favorites.query.filter_by(id=id).delete()
  db.session.commit()
  return jsonify(msg="good job")