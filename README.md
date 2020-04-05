# JSF_irc_2019

Création d'un server IRC en NodeJs, ExpressJS avec un client angular

### Requirments

* Docker
* NodeJs
* NPM
 

### Technologies

* [AngularJS](https://angular.io/) - Power the front of the application
* [Bootstrap](https://mdbootstrap.com/) - Improve the UI/UX
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [MySql]() - Database system for data persistance

### Installation
```sh
$ git clone git@gitlab.com:baronbrn/jsf_irc_2019.git
$ cd jsf_irc_2019/angClient
$ npm install
$ cd ../backend
$ npm install 
$ cd database
$ docker-compose up
$ cd ../.. 
$ ./script_fronts/launch_server.sh
$ node backend/app.js
```
> Now you can go to 127.0.0.1:4200
