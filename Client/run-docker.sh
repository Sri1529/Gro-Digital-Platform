#!/bin/bash

echo "Building and running Client Docker container..."

# Build the Docker image
docker build -t gro-client .

# Run the container
docker run -p 3000:3000 --name gro-client-container gro-client

echo "Client is running on http://localhost:3000"
