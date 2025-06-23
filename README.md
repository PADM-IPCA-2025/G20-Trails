# Trails
- **Backend**: NestJS API
- **Frontend**:  React
## Run outside the Docker
### Starting the API/Services
1. Go to **trails-api** folder:
    > cd trails-api
2. Start the service:
   > npm start
3. Running the seed
   > npx ts-node --files seed.ts
### Starting the Frontend
1. Go to **trails-web-ui** folder:
   > cd trails-web-ui
2. Start the application:
   > npm start
## Using the Docker
### Creating the containers
1. Go to **trails** folder (root directory)
   > cd trails
2. Buils the containers
   > docker-compose build
3. Start the containers
   > docker-compose up
### Running the seed
  > docker exec -it trails-api sh
  >
  > node dist/seed.js
## Access
- **React UI**: http://localhost:3000
- **NestJS API**: http://localhost:3002
## Test Accounts
### Admin
- Username: admin
- Password: 1234
### Participant
- Username: participant1
- Password: 1234
