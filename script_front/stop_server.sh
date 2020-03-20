#!/bin/bash

containerName="ang_client"

docker stop ${containerName}
docker system prune

echo "Server stopped!"
docker ps -a


