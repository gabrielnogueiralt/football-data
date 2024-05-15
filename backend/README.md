# backend

## Overview

This backend application provides API endpoints to handle user authentication and manage favorite football teams. It uses Express.js as the web framework and SQLite as the database. User authentication is handled with bcrypt for password hashing and middleware to verify user IDs.

## Features
- User Authentication: Signup and login endpoints for user authentication.
- Favorite Teams Management: Endpoints to add, remove, and list favorite teams for authenticated users.
- In-memory Database: Uses SQLite in-memory database for storage.
- CORS Enabled: Allows cross-origin requests.
- Body Parsing: Uses body-parser to parse incoming request bodies.

## Prerequisites
- Node.js
- npm (Node package manager)

## Setup

```bash
npm install
node server.js
``` 

The server will start on port 3000.

## API Endpoints

### User Authentication
#### Signup

```
POST /signup
``` 

Request Body:

``` 
{ "username": "exampleUser", "password": "examplePassword" }
``` 

Response:

``` 
{ "userId": 1 }
``` 

#### Login

``` 
POST /login
``` 

Request Body:

``` 
{ "username": "exampleUser", "password": "examplePassword" }
``` 

Response:

``` 
{ "userId": 1 }
``` 

### Favorite Teams

#### Add Favorite Team

``` 
POST /favorites
``` 

Headers:

``` 
userid: 1
``` 

Request Body:

```
{ "teamId": 100 }
```

Response:

```
{ "success": true }
```
#### Remove Favorite Team

```
DELETE /favorites/:teamId
```

Headers:

```
userid: 1
```

Response:

```
{ "success": true }
```

#### Get Favorite Teams

```
GET /favorites
```

Headers:

```
userid: 1
```

Response:

```
[100, 200]
```