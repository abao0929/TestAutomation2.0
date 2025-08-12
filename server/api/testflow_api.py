import os
import json
from io import TextIOWrapper
from flask import request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from server.controllers.testflow_controller import TestflowController

testflow = Blueprint("testflow", __name__, url_prefix="/api/testflow")

@testflow.route("", methods=["POST"])
def upload_testflow():
    name = (request.form.get("name") or "").strip()
    f = request.files.get("file")

    raw = f.read()
    json_text = raw.decode("utf-8-sig")

    tf = TestflowController.add_testflow(name, json_text)
    return jsonify({"id": tf.id, "name": tf.name}), 201