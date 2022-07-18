from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine


db = SQLAlchemy()

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(80), unique=False, nullable=False)
#     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return f'<User {self.email}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             # do not serialize the password, its a security breach
#         }


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     _password = db.Column(db.String(128), unique=False, nullable=False)
#     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return '<User {}>'.format(self.email)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             # do not serialize the password, its a security breach
#         }
    
#     @hybrid_property
#     def password(self):
#         return self._password

#     @password.setter
#     def password(self, password):
#         self._password = generate_password_hash(password)

#     def check_password_hash(self, password):
#         return check_password_hash(self.password, password)

class Users(db.Model):
    __tablename__ ='Users'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    name = db.Column(db.String(256))
    email = db.Column(db.String(256), unique = True)
    user_name = db.Column(db.String(256))
    password = db.Column(db.String(256))
    #favorites = db.Column(db.String(256))
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "user_name": self.user_name,
            #"favorites": self.favorites
            # do not serialize the password, its a security breach
        }

class Favorites(db.Model):
    __tablename__ = 'Favorites'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    user_id = db.Column(db.Integer, ForeignKey('Users.id'))
    fave_id = db.Column(db.Integer)
    item_type = db.Column(db.String(256))
    name = db.Column(db.String(256))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "fave_id": self.fave_id,
            "item_type": self.item_type,
            "name": self.name
            # do not serialize the password, its a security breach
        }

class Characters(db.Model):
    __tablename__ = 'Characters'
    id = db.Column(db.Integer, primary_key=True, unique = True)
    name = db.Column(db.String(256))
    birth_year = db.Column(db.String(256))
    eye_color = db.Column(db.String(256))
    gender = db.Column(db.String(256))
    hair_color = db.Column(db.String(256))
    height = db.Column(db.String(256)) 
    mass = db.Column(db.String(256))
    skin_color = db.Column(db.String(256))
    homeworld = db.Column(db.String(256))
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "birth_year": self.birth_year,
            "eye_color": self.eye_color,
            "gender": self.gender,
            "hair_color": self.hair_color,
            "height": self.height,
            "mass": self.mass,
            "skin_color": self.skin_color,
            "homeworld": self.homeworld,
            # do not serialize the password, its a security breach
        }
    
    def to_dict(self):
        return {}

# class Planets():
#     __tablename__ = "Planets"
#     id = Column(Integer, primary_key = True, unique = True)
#     name = Column(String(256))
#     diameter = Column(Integer)
#     rotation_period = Column(Integer)
#     orbital_period = Column(Integer)
#     gravity = Column(String(256))
#     population = Column(Integer)
#     climate = Column(String(256))
#     terrain = Column(String(256))
#     surface_water = Column(String(256))

#     def to_dict(self):
#         return {}

# class Starships():
#     __tablename__ = 'Starships'
#     id = Column(Integer, primary_key=True, unique = True)
#     name = Column(String(256))
#     model = Column(String(256)) 
#     starship_class = Column(String(256))
#     manufacturer = Column(String(256))
#     cost_in_credits = Column(String(256))
#     length = Column(String(256))
#     crew = Column(String(256))
#     passengers = Column(String(256))
#     max_atmosphering_speed = Column(String(256))
#     hyperdrive_rating = Column(String(256))
#     MGLT = Column(String(256))
#     cargo_capacity = Column(String(256))

#     def to_dict(self):
#         return {}

# class Vehicles():
#     __tablename__ = "Vehicles"
#     id = Column(Integer, primary_key = True, unique = True)
#     name = Column(String(256))
#     model = Column(String(256))
#     vehicle_class = Column(String(256))
#     manufacturer = Column(String(256))
#     length = Column(String(256))
#     cost_in_credits = Column(String(256))
#     crew = Column(String(256))
#     passengers = Column(String(256))
#     max_atmosphering_speed = Column(String(256))
#     cargo_capacity = Column(String(256))

#     def to_dict(self):
#         return {}

## Draw from SQLAlchemy base
