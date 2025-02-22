from app.features.common.exceptions.database_exceptions import handle_database_exceptions

class BaseRepository:
    def __getattribute__(self, name):
        attr = super().__getattribute__(name)
        if callable(attr):  # Check if the attribute is a method
            return handle_database_exceptions(attr)  # Apply the decorator
        return attr