import logging
import sys

def setup_logging():
    # Configure the root logger
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        stream=sys.stdout
    )

    # Set up specific loggers
    loggers = [
        'app.config.middleware',
        'app.features.auth.schemas',
        'app.features.auth.controllers',
    ]

    for logger_name in loggers:
        logger = logging.getLogger(logger_name)
        logger.setLevel(logging.DEBUG)
        # Ensure the logger propagates to the root logger
        logger.propagate = True