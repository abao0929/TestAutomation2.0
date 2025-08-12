from datetime import datetime
from sqlalchemy import func
from sqlalchemy import JSON      # 通用 JSON 类型（MySQL 5.7+ 原生支持）
from ..extensions import db

class TestFlow(db.Model):
    __tablename__ = "testflows"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True)  # 测试流程名称（可根据需要去掉 unique）
    json = db.Column(db.Text, nullable=False)                         # 存 listener 生成的 JSON（对象/数组均可）

    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    def to_dict(self):
        data = {
            "id": self.id,
            "name": self.name,
            "json": self.json,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

