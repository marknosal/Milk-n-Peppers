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
        print('Clearing DB records...')
        User.query.delete()
        Blog.query.delete()
        Custom.query.delete()
        Clothing.query.delete()
        db.session.commit()
        print('DB records cleared.')
        
        # Create User records
        print('Creating users...')
        def generate_random_string(min, max):
            characters = string.ascii_letters + string.digits
            random_length = randint(min, max)
            random_string = ''.join(rc(characters) for _ in range(random_length))
            return random_string
        users = []
        user_admin = User(
            username='admin',
            email='admin@fake.com',
            name='Admin'
        )
        user_admin.password_hash = 'admin'
        for i in range(100):
            password = generate_random_string(8, 50)
            new_user = User(
                username=generate_random_string(5, 15),
                email=fake.email(),
                name=fake.name(),
            )
            new_user.password_hash = password
            users.append(new_user)
        db.session.add_all(users + [user_admin])
        db.session.commit()
        print('Users created.')

        # Create clothing records
        print('Creating clothings...')
        clothings = []
        decimals = [0.00, 0.25, 0.50, 0.75]
        clothing_ranges = {
            'bottom': {'inseam': (0, 40), 'waist': (0, 60), 'hips': (0, 60)},
            'top': {'chest': (0, 75), 'waist': (0, 60)},
            'dress': {'chest': (0, 75), 'waist': (0, 60), 'hips': (0, 60)},
            'accessory': {},
            'outwear': {'chest': (0, 75), 'waist': (0, 60)}
        }
        for i in range(75):
            random_type = rc(list(clothing_ranges.keys()))
            new_clothing = Clothing(
                name=fake.first_name(),
                type=random_type,
            )
            new_clothing_ranges = clothing_ranges.get(random_type, {})
            for attr, (min, max) in new_clothing_ranges.items():
                setattr(new_clothing, attr, randint(min, max) + rc(decimals))
            clothings.append(new_clothing)
        db.session.add_all(clothings)
        db.session.commit()
        print('Clothings created.')

        # Create Custom records
        print('Creating customs...')
        customs = []
        for i in range(20):
            new_custom = Custom(
                notes=fake.sentence(nb_words=randint(0, 250)),
                user=rc(users),
                clothing=rc(clothings)
            )
            customs.append(new_custom)
        db.session.add_all(customs)
        db.session.commit()
        print('Customs created.')

        # Create Blog records
        print('Creating blogs...')
        blogs = []
        for _ in range(10):
            blog_title = fake.sentence(nb_words=randint(1, 8))
            blog_body = ' '.join(fake.sentences(nb=randint(5, 50)))
            new_blog = Blog(
                title=blog_title,
                body=blog_body
            )
            blogs.append(new_blog)
        db.session.add_all(blogs)
        db.session.commit()
        print('Blogs created.')

        print('Seed complete.')