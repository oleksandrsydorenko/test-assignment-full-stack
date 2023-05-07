# Test Assignment - Full-Stack Developer

## Screens

<p style="display: flex;">
  <img src="/screens/screen_1.png" style="margin-right: 5px;" width="300px">
  <img src="/screens/screen_2.png" style="margin-right: 5px;" width="300px">
  <img src="/screens/screen_3.png" style="margin-right: 5px;" width="300px">
  <img src="/screens/screen_4.png" width="300px">
</p>

## Description

- Configured monorepository with Yarn workspaces for client and server applications
- Used TypeScript for client and server applications
- Used Create React App starter kit for client application with MaterialUI components
- Used Express and Mongoose for server application
- Used [Mongo](https://hub.docker.com/_/mongo) and [Mongo-Express](https://hub.docker.com/_/mongo-express) Docker images for MongoDB local deployment
- Configured ESlint and Prettier for linting and formatting code
- Implemented data generation in worker thread. All the data generation and insertion in DB processes divided on chunks
- Implemented infinite scroll with offset/limit pagination
- Implemented Edit, Delete, Duplicate promotion items actions

## How to run application (in development mode)

1. Clone repository:

`git clone https://github.com/oleksandrsydorenko/moon-active-promotions.git`

2. Install packages using yarn:

`yarn`

3. Pull [Mongo](https://hub.docker.com/_/mongo) and [Mongo-Express](https://hub.docker.com/_/mongo-express) Docker images

4. Run Docker containers:

`yarn server:start:db`

5. Run server application:

`yarn server:start`

6. Run client application:

`yarn client:start`

## Application URLs (default)

Client application: `http://localhost:3000`\
Server application: `http://localhost:8000`\
Database: `mongodb://localhost:27017/promotions`\
Database admin interface (Mongo-Express): `http://localhost:8081`

## How to change promotions count

Update `PROMOTIONS_COUNT` constant in client app, default value is 10000

## Scripts (root package.json)

`client:build` - compiles client application sources\
`client:start` - starts application in development mode\
`lint` - lints and formats code with ESlint and Prettier rules\
`server:build` - compiles server application sources\
`server:serve` - runs application in production mode\
`server:start` - runs application in development mode\
`server:start:db` - runs locally Mongo and Mongo-Express containers with Docker\
`server:stop:db`: - stops Docker containers

## Environment variables (server application)

`DB_ERASING_ENABLED` - enables erasing database on application start (set value to `true`)\
`DB_NAME`\* - database name\
`DB_HOST` - database host\
`DB_PASSWORD`\* - database password\
`DB_PORT` - database port\
`DB_PROTOCOL` - database protocol\
`DB_USERNAME`\* - database username\
`SERVER_HOST` - server host\
`SERVER_PORT` - server port\
`SERVER_PROTOCOL` - server protocol

\* - required

Added to repository `.env` file with predefined values of required variables

## Environment variables (client application)

`REACT_APP_BASE_API` - API origin (predefined in `API_BASE` constant)
