#!/bin/bash

containerName="ang_client"

docker stop ${containerName}

echo "Server stopped!"
docker ps -a


