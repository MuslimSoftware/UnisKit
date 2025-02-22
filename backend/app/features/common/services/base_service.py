from app.features.common.exceptions.service_exceptions import handle_service_exceptions

class BaseService:
    def __getattribute__(self, name):
        attr = super().__getattribute__(name)
        if callable(attr):  # Check if the attribute is a method
            return handle_service_exceptions(attr)  # Apply the decorator
        return attr