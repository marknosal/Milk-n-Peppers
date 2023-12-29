from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db, bcrypt

class ClothingImagePath(db.Model, SerializerMixin):
    __tablename__ = 'clothing_image_paths'

    # serialize_rules = (,)

    # columns
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String)

    clothing_id = db.Column(db.Integer, db.ForeignKey('clothings.id'))

    # relationships
    clothing = db.relationship('Clothing', back_populates='clothing_image_paths')


    def __repr__(self):
        return f'<ClothingImagePath {self.id}>'