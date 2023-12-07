#!/usr/bin/env python3

from random import randint, choice as rc;
from faker import Faker
from app import app
from config import db, bcrypt
from models import User, Blog, Custom, Clothing
import string

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Starting seed...')

        # Clear db records
        User.query.delete()
        Blog.query.delete()
        Custom.query.delete()
        Clothing.query.delete()
        db.session.commit()
        print('DB records cleared...')
        
        print('Creating users')
        def generate_random_string(min, max):
            characters = string.ascii_letters + string.digits
            random_length = randint(min, max)
            random_string = ''.join(rc(characters) for _ in range(random_length))
            return random_string
        users = []
        user_admin = User(
            username = 'admin',
            email = 'admin@fake.com',
            name = 'Admin'
        )
        user_admin.password_hash = 'admin'
        for i in range(5):
            password = generate_random_string(8, 50)
            new_user = User(
                username = generate_random_string(5, 15),
                email = fake.email(),
                name = fake.name(),
            )
            new_user.password_hash = password
            users.append(new_user)
        db.session.add_all(users + [user_admin])
        db.session.commit()
        print('Users created...')