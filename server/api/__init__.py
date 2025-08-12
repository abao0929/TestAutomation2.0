from .testflow_api import testflow
from .check import check_api

def init_app(app):
    app.register_blueprint(testflow)
    app.register_blueprint(check_api)
    pass
