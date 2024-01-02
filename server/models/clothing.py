from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db, bcrypt

class Clothing(db.Model, SerializerMixin):
    __tablename__ = 'clothings'

    serialize_rules = ('-customs.clothing', '-clothing_image_paths.clothing',)

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, default=0.00)
    inseam = db.Column(db.Float)
    chest = db.Column(db.Float)
    waist = db.Column(db.Float)
    hips = db.Column(db.Float)

    # relationships
    customs = db.relationship('Custom', back_populates='clothing')
    users = association_proxy('customs', 'user')
    clothing_image_paths = db.relationship('ClothingImagePath', back_populates='clothing')
    
    def __repr__(self):
        return f'<Clothing: {self.id}. Type: {self.type}.>'