#!/bin/bash

echo "Enter component name : "

read component

docker run -it --rm -w /app -v $(pwd)/angClient:/app alexsuch/angular-cli:7.3.8-chromium ng g component component

echo "Component ${comp} created!"
