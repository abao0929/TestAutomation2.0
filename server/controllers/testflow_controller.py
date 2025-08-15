from typing import Optional, Any, List
from sqlalchemy import select
from ..extensions import db
from ..models import TestFlow
import json


def add_testflow(name, json_text) -> TestFlow:
    try:
        parsed = json.loads(json_text)
        # 统一存储格式（压缩或美化均可，这里用压缩以节省空间）
        json_text = json.dumps(parsed, ensure_ascii=False, separators=(",", ":"))
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON: {e}")


    new_testflow = TestFlow(name = name, json = json_text)
    db.session.add(new_testflow)
    db.session.commit()
    return new_testflow

def list_testflow():
    stmt = (
        select(TestFlow.id, TestFlow.name, TestFlow.created_at, TestFlow.updated_at)
        .order_by(TestFlow.updated_at.desc())
    )
    rows = db.session.execute(stmt).all()  # -> list[tuple]

    def fmt(dt):
        # 统一输出格式：YYYY-MM-DD HH:MM:SS（也可用 isoformat()）
        return dt.strftime("%Y-%m-%d %H:%M:%S") if dt else None

    return [
        {"id":id, "name": n, "created_at": fmt(ca), "updated_at": fmt(ua)}
        for (id, n, ca, ua) in rows
    ]


def get_testflow_detail(testflow_id: int):
    tf = db.session.get(TestFlow, testflow_id)
    if not tf:
        return None, {"code": 404, "msg": "Testflow not found"}

    data = tf.json or {}            # 已是 Python dict（SQLAlchemy 自动反序列化）
    meta = data.get("meta") or {}
    logs = data.get("logs") or []
    if not isinstance(logs, list):  # 兜底：保证前端一定拿到数组
        logs = []

    def fmt(dt):
        return dt.strftime("%Y-%m-%d %H:%M:%S") if dt else None

    return {
        "id": tf.id,
        "name": getattr(tf, "name", None),
        "created_at": fmt(getattr(tf, "created_at", None)),
        "updated_at": fmt(getattr(tf, "updated_at", None)),
        "meta": meta,
        "logs": logs,
    }, None