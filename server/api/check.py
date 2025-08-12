from flask import Blueprint
import json as pyjson
from flask import request, jsonify

check_api = Blueprint('check_api',__name__, url_prefix='/check')

@check_api.route("")
def check():
    return jsonify({"status": "ok"})