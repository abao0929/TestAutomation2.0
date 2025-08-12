import os
from flask import Flask
from .extensions import db
from . import api as api_pkg
from . import models as models_pkg
from . import controllers as controllers_pkg


def create_app():
    app = Flask(__name__)
    app.config.from_object('config')


    db.init_app(app)

    models_pkg.init_app(app)        # 内部可空实现
    controllers_pkg.init_app(app)   # 内部可空实现
    api_pkg.init_app(app)           # 注册蓝图


    return app
