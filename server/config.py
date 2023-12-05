import os

from flask import Flask
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


