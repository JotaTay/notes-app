# Notes App
The goal of this project is to create a service that brings all of my notes and favorite quotations together into a central database.

This project will allow a user to create account, and then authenticate that account with their Evernote and Goodreads accounts.

The Goodreads service will query the users Goodreads account for books and kindle notes/highlights that have been added. It will then save these queries into a MongoDB instance running in a docker container.

The Evernote  service will query my Evernote account for books and kindle notes/highlights that have been added. It wi
ll then save these queries into a MongoDB instance running in a docker container.

## To run locally
### Start a mongoDB instance (w/ persistant storage and at specified port):
* docker run -p 27017:27017 mongo  (-d -v $PWD/data/bin:/data/db mongo)
### To login to the mongo instance
* mongo 127.0.0.1:27017
### To start the app w/ debugging:
* npm run-script start
