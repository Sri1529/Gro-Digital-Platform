#!/bin/bash

echo "🧪 Testing Docker Setup for Gro Digital Platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker is running"

# Test building images
echo "🔨 Testing image builds..."

# Build client image
echo "Building client image..."
if docker build -t gro-client-test ./Client > /dev/null 2>&1; then
    echo "✅ Client image built successfully"
else
    echo "❌ Client image build failed"
    exit 1
fi

# Build server image
echo "Building server image..."
if docker build -t gro-server-test ./Server > /dev/null 2>&1; then
    echo "✅ Server image built successfully"
else
    echo "❌ Server image build failed"
    exit 1
fi

# Test docker-compose
echo "Testing docker-compose..."
if docker-compose config > /dev/null 2>&1; then
    echo "✅ docker-compose.yml is valid"
else
    echo "❌ docker-compose.yml has errors"
    exit 1
fi

# Clean up test images
echo "🧹 Cleaning up test images..."
docker rmi gro-client-test gro-server-test > /dev/null 2>&1

echo ""
echo "🎉 All tests passed! Your Docker setup is ready."
echo ""
echo "🚀 To start your application:"
echo "   ./setup.sh"
echo ""
echo "📋 Or manually:"
echo "   docker-compose up --build"


