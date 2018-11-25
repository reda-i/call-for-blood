# go to front end microservice
cd ./frontend/
#
# run react app using react scripts for development stage
react-scripts start&
# run server.js for routing frontend requests to other microservices
node server.js&
# go to auth microservice
cd ../auth/
# run server.js to enable the server to respond to auth requests
node server.js&
# go back to main directory
cd ../