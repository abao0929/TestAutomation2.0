from typing import Optional, Any, List
from ..extensions import db
from ..models import TestFlow
import json

class TestflowController:

    def __init__(self):
        pass

    def add_testflow(self, name, json_text) -> TestFlow:
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
    
    def list_testflow(self):
        return TestFlow.query.all()