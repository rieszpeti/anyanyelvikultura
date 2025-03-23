#!/bin/bash

export DOCKER_BUILDKIT=1
set -e  # Exit immediately on error

MAX_RETRIES=2  # Number of retries allowed
RETRY_COUNT=0

# Stop and clean up previous containers
docker-compose -f docker-test-compose.yml down --volumes --remove-orphans

# Rebuild and start the Docker environment
docker-compose -f docker-test-compose.yml up --build -d postgres

# Build the payload service without cache
docker-compose -f docker-test-compose.yml build --no-cache payload
docker-compose -f docker-test-compose.yml up -d payload

echo "Waiting for the environment to fully initialize..."
sleep 20

# Run Playwright tests with retries
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if pnpm playwright test; then
        echo "Tests passed!"
        exit 0
    else
        echo "Tests failed. Retrying... ($((RETRY_COUNT+1))/$MAX_RETRIES)"
        RETRY_COUNT=$((RETRY_COUNT+1))
        sleep 5
    fi
done

echo "Tests failed after $MAX_RETRIES attempts. Exiting with error."
exit 1
