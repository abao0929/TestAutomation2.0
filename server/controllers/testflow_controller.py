from typing import Optional, Any, List
from ..extensions import db
from ..models import TestFlow

class TestflowController:

    

    def create_testflow(name: str, json_data: Any) -> TestFlow:
        tf = TestFlow(name=name, json=json_data)
        db.session.add(tf)
        db.session.commit()
        return tf

    def list_testflows() -> List[TestFlow]:
        return TestFlow.query.order_by(TestFlow.id.asc()).all()

    def get_testflow(tf_id: int) -> Optional[TestFlow]:
        return TestFlow.query.get(tf_id)

    def get_testflow_by_name(name: str) -> Optional[TestFlow]:
        return TestFlow.query.filter_by(name=name).first()

    def update_testflow(tf_id: int, *, name: Optional[str] = None, json_data: Optional[Any] = None) -> Optional[TestFlow]:
        tf = TestFlow.query.get(tf_id)
        if not tf:
            return None
        if name is not None:
            tf.name = name
        if json_data is not None:
            tf.json = json_data
        db.session.commit()
        return tf

    def delete_testflow(tf_id: int) -> bool:
        tf = TestFlow.query.get(tf_id)
        if not tf:
            return False
        db.session.delete(tf)
        db.session.commit()
        return True
