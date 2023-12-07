#!/usr/bin/env python3

from flask import request, session, abort
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import datetime

from config import app, db, api
from models import User, Clothing, Blog, Custom

@app.route('/')
def index():
    return '<h1>Milk n Peppers</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)