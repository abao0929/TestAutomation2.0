import json as pyjson
from flask import request, jsonify
from flask import Blueprint
from server.controllers.testflow_controller import TestflowController

testflow = Blueprint("testflow", __name__, url_prefix="/api/testflow")

@testflow.route("", methods=["POST"])
def upload_testflow():
    data = request.json
    try:
        TestflowController.create_testflow(
            data["name"], data["json"]
        )
        return jsonify({"success": True, "msg": "添加成功"})
    except Exception as e:
        return jsonify({"success": False, "msg": str(e)})