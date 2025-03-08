import logging
import sys
from logging.handlers import RotatingFileHandler

def setup_logging():
    # Create a formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    # Create and configure the file handler
    file_handler = RotatingFileHandler(
        'app.log',
        maxBytes=512*1024,  # 0.5MB
        backupCount=5
    )
    file_handler.setLevel(logging.ERROR)
    file_handler.setFormatter(formatter)
    
    # Create and configure the console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.ERROR)
    console_handler.setFormatter(formatter)
    
    # Configure the root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.ERROR)
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)
    
    # Remove any existing handlers from root logger
    for handler in root_logger.handlers[:]:
        if isinstance(handler, logging.StreamHandler) and handler != console_handler and handler != file_handler:
            root_logger.removeHandler(handler)