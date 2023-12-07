from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db, bcrypt

class Custom(db.Model, SerializerMixin):
    __tablename__ = 'customs'

    serialize_rules = ('-user.customs', '-clothing.customs',)

    # columns
    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    clothing_id = db.Column(db.Integer, db.ForeignKey('customs.id'))

    # relationships
    user = db.relationship('User', back_populates='customs')
    clothing = db.relationship('Clothing', back_populates='customs')

    def __repr__(self):
        return f'<Custom: {self.id}. Username: {self.user.name}. Clothing: {self.clothing.name}.>'