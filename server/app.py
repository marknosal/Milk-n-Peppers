#!/usr/bin/env python3

from flask import request, session, abort
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import datetime

from config import app, db, api
from models import User, Clothing, Blog, Custom, ClothingImagePath

@app.route('/')
def index():
    return '<h1>Milk n Peppers</h1>'

OPEN_ACCESS_LIST = [
    'signup',
    'home',
    'login',
    'about',
    'clothes',
    'check_session',
    'clothing_image_path'
]

@app.before_request
def check_if_logged_in():
    if (
        not request.path.startswith('/static') 
        and request.endpoint not in OPEN_ACCESS_LIST 
        and 'user_id' not in session
    ):
        abort(401, 'Unauthorized')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).one_or_none()
        if user:
            return user.to_dict(), 200
        return {}, 401
        
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.query.filter_by(username=username).one_or_none()
            if not user:
                return {'error': 'username/password do not match'}, 404
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            elif not user.authenticate(password):
                return {'error': 'username/password do not match'}, 401
        except Exception as e:
            return {'error': str(e)}, 401

class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User.query.filter_by(username=data.get('username')).one_or_none()
            if not user:
                new_user = User()
                for key, value in data.items():
                    setattr(new_user, key, value)
                new_user.password_hash = data.get('password')
                delattr(new_user, 'passwordConfirm')
                db.session.add(new_user)
                db.session.commit()
                return new_user.to_dict(), 202
            return {'error': f'Username already exists'}, 422
        
        except Exception as e:
            return {'error': str(e)}, 422

class Blogs(Resource):
    def get(self):
        blogs = Blog.query.all()
        blogs_dict = [b.to_dict() for b in blogs]
        return blogs_dict, 200
    
class Clothings(Resource):
    def get(self):
        clothings = Clothing.query.all()
        clothings_dict = [c.to_dict() for c in clothings]
        return clothings_dict, 200
    
class Profile(Resource):
    def get(self):
        return {}, 123
            
class ClothingImagesById(Resource):
    def get(self, id):
        try:
            image_paths = ClothingImagePath.query.filter_by(clothing_id=id).all()
            img_path_dict = [p.to_dict(only=('id', 'image_path',)) for p in image_paths]
            return img_path_dict, 200
        except:
            return { 'error': 'image_paths not found' }, 404
        
class Customs(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            user = User.query.filter_by(id=user_id).one_or_none()
            customs = Custom.query.filter(Custom.user_id==user_id).all()
            return [c.to_dict() for c in customs], 200
        except:
            return { 'error': f'{user.username} does not have any customs' }, 404

    def post(self):
        data = request.get_json()
        try:
            clothing_id = data.get('clothing_id')
            user_id = session.get('user_id')

            if clothing_id is None or user_id is None:
                raise ValueError('Missing required fields')
            
            user = User.query.filter_by(id=user_id).first()
            clothing = Clothing.query.filter_by(id=clothing_id).first()

            existing_custom = Custom.query \
                .filter_by(user_id=user_id, clothing_id=clothing_id).first()
            if existing_custom:
                return { 'error': 'This item is already added to cart' }, 400

            new_custom = user.clothings.creator(clothing, user_id)
            db.session.add(new_custom)
            db.session.commit()

            return new_custom.to_dict(), 201
        except ValueError as e:
            return { 'error': str(e) }, 400
        except Exception:
            return { 'error': 'An error occurred while processing the request' }, 500


api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Blogs, '/blogs', endpoint='blogs')
api.add_resource(Clothings, '/clothes', endpoint='clothes')
api.add_resource(Profile, '/profile', endpoint='profile')
api.add_resource(ClothingImagesById, '/clothing_image_path/<int:id>', endpoint='clothing_image_path')
api.add_resource(Customs, '/customs', endpoint='customs')


if __name__ == '__main__':
    app.run(port=5555, debug=True)