#!/usr/bin/env bash

set -e

echo "Start migrations..."
alembic upgrade head
echo "End migrations!"

echo "Start seeding..."
export PYTHONPATH=$PYTHONPATH:.
python mock_data_seed.py
echo "Seed finished!"

exec "$@"
