<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg" width="100" alt="Nest Logo" /></a>
</p>
<h1 align="center">Musica</h1>
<p align="center">
A REST application of serving audio details containing Album, Artist, Tracks, Favorites. User can sign up here and get a list of albums containing various music tracks of different artist. User can also mark any song as favorite.
</p>

## Description

The application has been built with `Node.js` using `Nest` framework and the entire application's data is being served by `PostgreSQL` throw a `Docker container` where `Prisma` is being used as orm.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Web

After running the server withe dev/prod mode the API will be available to serve data from `http://localhost:3050` URL.
