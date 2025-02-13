#!/usr/bin/bash

# Activate venv (using relative path since we're in the correct directory)
source venv/bin/activate

# Install or upgrade dependencies
pip3 install -r requirements.txt

# Start the server
python3 -m uvicorn main:app --reload --port 8000 