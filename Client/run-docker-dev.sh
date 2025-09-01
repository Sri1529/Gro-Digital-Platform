#!/bin/bash

echo "Building and running Client Docker container in development mode..."

# Build the development Docker image
docker build -f Dockerfile.dev -t gro-client-dev .

# Run the container
docker run -p 3000:3000 -v $(pwd):/app --name gro-client-dev-container gro-client-dev

echo "Client is running in development mode on http://localhost:3000"
