#!/bin/bash

projectName="angClient"

docker run -it --rm -w /app -v $(pwd):/app alexsuch/angular-cli:7.3.8-chromium ng new ${projectName}

echo "Component ${projectName} created!"
