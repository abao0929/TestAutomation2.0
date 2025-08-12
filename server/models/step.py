from datetime import datetime
from sqlalchemy import func
from sqlalchemy import JSON      # 通用 JSON 类型（MySQL 5.7+ 原生支持）
from ..extensions import db

class Step(db.Model):
    __tablename__ = "steps"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True)
    json = db.Column(JSON, nullable=False)

    def to_dict(self, with_json: bool = True):
        data = {
            "id": self.id,
            "name": self.name,
        }
        if with_json:
            data["json"] = self.json
        return data