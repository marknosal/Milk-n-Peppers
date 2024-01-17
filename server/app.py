#!/usr/bin/env python3

from flask import request, session, abort, jsonify, redirect
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import datetime
import stripe

from config import app, db, api
from models import User, Clothing, Blog, Custom, ClothingImagePath

YOUR_DOMAIN = 'http://localhost:4000'

stripe.api_key = 'sk_test_51OYuqDAY4XFYCSiOOP7aCo5pUOLoEsF9lSq3RVwxao4hb7LOWLGwPIQJqNBE2e51rfuJKKXXnrR6DNfaat1j9EI100EnRvmI0a'

@app.route('/')
def index():
    return '<h1>Milk n Peppers</h1>'

OPEN_ACCESS_LIST = [
    '/',
    'signup',
    'home',
    'login',
    'about',
    'clothes',
    'check_session',
    'clothing_image_path',
    'clothing_image_path_by_id'
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
    
class ClothingsById(Resource):
    def get(self, id):
        try:
            clothing = Clothing.query.filter_by(id=id).one_or_none()
            if clothing:
                return clothing.to_dict(), 200
            return { 'error': 'clothing not found' }, 404
        except Exception as e:
            return { 'error': str(e) }, 400
    
class Profile(Resource):
    def get(self):
        return {}, 123
    
class ClothingImagePaths(Resource):
    def get(self):
        try:
            image_paths = ClothingImagePath.query.all()
            img_path_dict = [p.to_dict() for p in image_paths]
            return img_path_dict, 200
        except:
            return { 'error': 'image_paths not found'}, 404
            
class ClothingImagePathsById(Resource):
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
            if customs:
                return [c.to_dict() for c in customs], 200
            return { 'error': f'{user.username} does not have any customs' }, 404
        except Exception as e:
            return { 'error': str(e) }, 400

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
                return { 'error': 'Already In Cart' }, 400

            new_custom = user.clothings.creator(clothing, user_id)
            db.session.add(new_custom)
            db.session.commit()

            return new_custom.to_dict(), 201
        except ValueError as e:
            return { 'error': str(e) }, 400
        except Exception:
            return { 'error': 'An error occurred while processing the request' }, 500
        
    def patch(self):
        data = request.get_json()
        try:
            user_id = session.get('user_id')
            price_id = data.get('price_id')
            custom = (
                Custom.query
                .filter_by(user_id=user_id)
                .join(Custom.clothing)
                .filter(Clothing.stripe_price_id == price_id)
                .first()
            )
            custom.purchased = True
            db.session.commit()
            return custom.to_dict(), 200
        except Exception as e:
            return { 'error': str(e) }, 500
        
class CustomsById(Resource):
    def delete(self, id):
        deleted_custom = Custom.query.filter_by(id=id).one_or_none()
        try:
            if deleted_custom:
                db.session.delete(deleted_custom)
                db.session.commit()
                return {}, 204
            return {'error': f'Custom {id} does not exist'}, 404
        except Exception as e:
            return { 'error': str(e) }, 400
        
    def patch(self, id):
        data = request.get_json()
        try:
            custom = Custom.query.filter_by(id=id).one_or_none()
            if custom:
                for key, value in data.items():
                    setattr(custom, key, value)
                    db.session.commit()

                    return custom.to_dict(), 200
                
            return { 'error': f'Custom {id} not found'}, 404
        
        except ValueError as e:
            return { 'error': str(e) }, 400
        except Exception:
            return { 'error': 'An error occurred while processing the request' }, 500
        
class CheckoutSession(Resource):
    def get_user_cart(self):
        try:
            user_id = session.get('user_id')
            customs = Custom.query.filter(Custom.user_id==user_id).all()
            if customs:
                body = [c.to_dict(only=('clothing.stripe_price_id',)) for c in customs]
                status = 200
                return body, status
            return { 'error': 'Nothing in cart'}, 404
        except Exception as e:
            return { 'error': str(e) }, 400

    def post(self):
        try:
            cart_price_codes, status = self.get_user_cart()
            line_items = []
            for price_code_obj in cart_price_codes:
                line_items.append({
                    'price': price_code_obj['clothing']['stripe_price_id'],
                    'quantity': 1,
                })
            session = stripe.checkout.Session.create(
                ui_mode='embedded',
                line_items=line_items,
                mode='payment',
                return_url=YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
                automatic_tax={'enabled': True},
            )

        except Exception as e:
            return { 'error': str(e) }, 400
        
        return jsonify(clientSecret=session.client_secret)
    
class SessionStatus(Resource):
    def get(self):
        session_id = request.args.get('session_id')
        session = stripe.checkout.Session.retrieve(session_id)
        line_items = stripe.checkout.Session.list_line_items(session_id)
        price_ids = [item.price.id for item in line_items.data]

        return jsonify(status=session.status, customer_email=session.customer_details.email, priceIds=price_ids)

# class GetLineItems(Resource):
#     def get(self):
#         try:
#             session_id = request.args.get('session_id')
#             line_items = stripe.checkout.Session.list_line_items(session_id)
#             price_ids = [item.price.id for item in line_items.data]

#             return price_ids, 200
#         except Exception as e:
#             print(str(e))
#             return {str(e)}, 500


api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Blogs, '/blogs', endpoint='blogs')
api.add_resource(Clothings, '/clothes', endpoint='clothes')
api.add_resource(ClothingsById, '/clothes/<int:id>', endpoint='clothes_by_id')
api.add_resource(Profile, '/profile', endpoint='profile')
api.add_resource(ClothingImagePaths, '/clothing_image_path', endpoint='clothing_image_path')
api.add_resource(ClothingImagePathsById, '/clothing_image_path/<int:id>', endpoint='clothing_image_path_by_id')
api.add_resource(Customs, '/customs', endpoint='customs')
api.add_resource(CustomsById, '/customs/<int:id>', endpoint='customs_by_id')
api.add_resource(CheckoutSession, '/create-checkout-session', endpoint='create-checkout-session')
api.add_resource(SessionStatus, '/session-status', endpoint='session-status')
# api.add_resource(GetLineItems, '/get-line-items', endpoint='get-line-items')


if __name__ == '__main__':
    app.run(port=5555, debug=True)