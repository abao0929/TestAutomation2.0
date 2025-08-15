import os
import json
from io import TextIOWrapper
from flask import request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from server.controllers.testflow_controller import add_testflow, list_testflow, get_testflow_detail

testflow = Blueprint("testflow", __name__, url_prefix="/api/testflow")

@testflow.route("", methods=["POST"])
def upload_testflow():
    name = (request.form.get("name") or "").strip()
    f = request.files.get("file")

    raw = f.read()
    json_text = raw.decode("utf-8-sig")

    tf = add_testflow(name, json_text)
    return jsonify({"id": tf.id, "name": tf.name}), 201

@testflow.route("", methods=["GET"])
def get_list_testflow():
    data = list_testflow()
    return jsonify({
        "code": 0,
        "data": data,
        "count": len(data)
    }), 200

@testflow.get("/<int:testflow_id>")
def get_testflow_detail_api(testflow_id: int):
    data, err = get_testflow_detail(testflow_id)
    if err:
        return jsonify(err), err.get("code", 400)
    return jsonify({"code": 0, "data": data}), 200
