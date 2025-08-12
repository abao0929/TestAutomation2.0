import os
from flask import Flask
from .extensions import db


def create_app():
    app = Flask(__name__)
    app.config.from_object('config')


    db.init_app(app)

    from .models import init_models
    init_models()

    from .controllers import init_controllers
    init_controllers()

    from .api import init_api
    init_api(app)
    
    return app
