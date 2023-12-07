from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db, bcrypt

class Blog(db.Model, SerializerMixin):
    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)

    def __repr__(self):
        return f'<Blog: {self.id}. Title: {self.title}.>'