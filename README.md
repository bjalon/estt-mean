# estt-mean

This is project is a personnal project to learn MEAN stack and deliver for a small school a library manager.
This application is composed by a front application using AngularJS, a back application based on NodeJS and the Express framework and a database MongoDB.

## Build & development

* [Install MongoDB](https://docs.mongodb.org/manual/installation/)
* [Install NodeJS](https://nodejs.org/en/download/)
* Install http-server npm module with the following command line
 ```
npm install -g http-server
 ```
* Start the mongoDB (normally explained at the end of the installation)
* Launch the following command line to expose the front application from the root of the project

 ```
cd /path/of/workspace
npm install
bower install
cd app
http-server -p 8080
```
* Let the command line opened
* Now the Front application is expose on the 8080 port
* In another Terminal, launch the following command line to expose the back application from the server directory

```
cd /path/of/workspace
node server/app
```

* Now the Back application is expose on the 3000 port

# TODO

* Improve the Mongo indexes
* Refactor the code
** for the front application
*** split controller
*** Expose the backend requests as a service
*** create directive for
**** child fragment
**** children list
**** book fragment
**** books list
** for the back
*** avoid marshalling
*** 
* Create Tests
* Create build script using Gulp
* Create an injector and an app to manage books ([we used to create books database on Nuxeo](https://github.com/bjalon/estt), but all things can change :) )

