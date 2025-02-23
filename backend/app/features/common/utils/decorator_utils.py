
def apply_exception_handler(obj, exception_decorator):
    """
    Dynamically applies an exception-handling decorator to all callable attributes of an object.
    
    Args:
        obj: The instance whose methods need to be decorated.
        exception_decorator: The decorator function to apply to callable attributes.
    
    Returns:
        The modified object with decorated methods.
    """
    if not hasattr(obj, '_decorated_methods'):
        obj._decorated_methods = {}
    for attr_name in dir(obj):
        if attr_name.startswith('_'):  # Skip private attributes
            continue
        attr = getattr(obj, attr_name)
        if callable(attr) and attr_name not in obj._decorated_methods:
            obj._decorated_methods[attr_name] = exception_decorator(attr)
            setattr(obj, attr_name, obj._decorated_methods[attr_name])
    return obj