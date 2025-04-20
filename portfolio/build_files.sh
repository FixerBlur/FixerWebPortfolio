#!/bin/bash
pip install -r requirements.txt
python manage.py collectstatic --noinput
apt-get update && apt-get install -y libjpeg-dev zlib1g-dev 