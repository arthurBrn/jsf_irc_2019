#!/bin/bash

projectHost=0.0.0.0
projectPort=4200
projectPath="/home/baron/Documents/Epitech/jsf_irc_2019/angClient"
containerName="ang_client"

echo "================================================================"
echo "client will run on $projectHost:$projectPort"
echo "container name : $containerName"
echo "project path : $projectPath"
echo "================================================================"

docker run -it --name ${containerName} --rm -w /app -v ${projectPath}:/app -p ${projectPort}:${projectPort} alexsuch/angular-cli:7.3.8-chromium ng serve --host ${projectHost}



