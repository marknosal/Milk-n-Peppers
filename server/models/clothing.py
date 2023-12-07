from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db, bcrypt

class Clothing(db.Model, SerializerMixin):
    __tablename__ = 'clothings'

    serialize_rules = ('-customs.clothing',)

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String, nullable=False)
    inseam = db.Column(db.Float)
    chest = db.Column(db.Float)
    waist = db.Column(db.Float)
    hips = db.Column(db.Float)

    # relationships
    customs = db.relationship('Custom', back_populates='clothing')
    users = association_proxy('customs', 'user')
    
    def __repr__(self):
        return f'<Clothing: {self.id}. Type: {self.type}.>'