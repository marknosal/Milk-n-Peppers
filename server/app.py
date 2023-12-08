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

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session',
        'about',
        'clothes',
    ]
    if request.endpoint not in open_access_list and not session.get('user_id'):
        abort(401, 'Unauthorized')
        
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.query.filter_by(username=username).one_or_none()
            if not user:
                return {'error': f'username {username} not found'}, 404
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            elif not user.authenticate(password):
                return {'error': 'username/password do not match'}, 401
        except Exception as e:
            return {'error': str(e)}, 401

api.add_resource(Login, '/login', endpoint='login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)