#!/bin/bash

set -e

DEV_API_KEY="${DEV_API_KEY}"
GITHUB_API_KEY="${GITHUB_API_KEY}"
REGISTRY_NAME="${REGISTRY_NAME}"
DOCKER_IMAGE_NAME="wildanazz.com-docker"
GITHUB_SHA="${GITHUB_SHA}"

echo "Creating .env file..."
echo "DEV_API_KEY=${DEV_API_KEY}" > .env
echo "GITHUB_API_KEY=${GITHUB_API_KEY}" >> .env

echo "Building Docker image..."
docker build -t ${REGISTRY_NAME}/${DOCKER_IMAGE_NAME}:$(echo ${GITHUB_SHA} | head -c7) .

echo "Logging in to DigitalOcean Container Registry..."
doctl registry login --expiry-seconds 1200

echo "Pushing Docker image to DigitalOcean Container Registry..."
docker push ${REGISTRY_NAME}/${DOCKER_IMAGE_NAME}:$(echo ${GITHUB_SHA} | head -c7)

echo "Docker build and push process complete."