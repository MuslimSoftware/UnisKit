#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the backend directory
cd "$SCRIPT_DIR"

# Activate venv
if [ -f "venv/bin/activate" ]; then
    # shellcheck disable=SC1091
    echo "Activating virtual environment..."
    . venv/bin/activate
else
    echo "Virtual environment not found. Creating one..."
    python3 -m venv venv
    # shellcheck disable=SC1091
    . venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
fi 