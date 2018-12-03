# call-for-blood

A place where blood donors can painlessly help the close hospitals to them in need for blood donations.

#Contribution

## Running the app on docker-compose

- you can run the app simply on docker-compose by using `docker-compose up`
- In order to rebuild the images you use the following
```
docker-compose down --rmi local 
docker-compose up --build
```
This will delete the docker images from the system and rebuild them again from the source code.

## Running locally without containers

There are two ways of doing this depending on your OS
1. If you are on windows:
    - init `mongod` instance to accept database requests
    - You go to each microservice directory `auth`, `frontend`, and `calls`
    - in each directory you go to the terminal and type `npm install` and `npm start`
    - make sure that you supply your environment variables (more details on that down below)
2. If you are on a unix based machine:
    - You can go similarly to windows, but there is a much faster way
    - In the main package.json file there are convenience scripts to make starting the application faster
    - just run the following code in the main project directory
        ```
        npm run install:all
        npm start
        ```
    This will run scripts that install dependencies on all microservices and start them

## Environment variables

- There are two ways to check on environment variables needed to run the system
    1. If you are using docker:
        - Simply check the docker-compose file and find all the environment variables you need
        You can override the current variables, for more info on this check this [link](https://docs.docker.com/compose/production/)
    2. If you are running locally:
        - You can checkout `.env.example` file and add a similar  `.env` with the same variables, but change the value to what suits you
