# Networked Observation & Tracking Environment (N.O.T.E)

Networked Observation & Tracking Environment (N.O.T.E) is a web application for managing a simulated network of surveillance cameras in a building or facility.

## Table of Contents

- [Special Note](#special-note)
- [Features](#features)
- [Database Design Concept](#database-design-concept)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Built With](#built-with)
- [Final Product](#final-product)

## Special Note:

There is a functionality with this project that will simulate an alert type of either "SOUND" or "MOTION" to any available camera's that have an ONLINE status. This feature will begin to operate continuously starting 30 seconds after rendering the Dashboard after a user logs in. This will continue until the user stops the backend server from running. `PLEASE BE ADVISED` that this will continue to populate alerts in the database until the backend process is completely shut down.


The server is also set up to have a proxy for the front end. This functionality can be found in the root of the project at /src/server.ts.

It will look like:
```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```
If you are running the front end on a different port then the one indicated here be sure to update the server code to reflect those changes.

## Features 
<sup><sub>[top](#table-of-contents)</sub></sup>

1. Login functionality with user sign up and JWT authentication
2. Allow operators to view simulated camera alerts
3. Allows users to acknowledge alerts
4. Updates database responsively with user's/camera's id 
4. Designed and implemented with a responsive UI that works well on both desktop and mobile devices


## Database Design Concept  
<sup><sub>[top](#table-of-contents)</sub></sup>

### Key Entities 

1. Users
2. Cameras
3. Alerts

### Attributes and Relationships

1. Users:

* id (Primary key)
* username (Unique)
* password (hashed)
* email (Unique)
* first_name
* last_name
* role (Admin, Operator)

1. Cameras:

* id (Primary key)
* name (Unique)
* location
* status (Online, Offline)
* video_url (URL to the video file or live stream)
* created_at (Timestamp)
* updated_at (Timestamp)

3. Alerts:

* id (Primary key)
* camera_id (Foreign key referencing Cameras)
* alert_type (Motion, Sound)
* detected_at (Timestamp)
* acknowledged (Boolean)
* acknowledged_by (Foreign key referencing Users)
* acknowledged_at (Timestamp)

### Relationships 
<sup><sub>[top](#table-of-contents)</sub></sup>

* One Camera can have many Alerts (One-to-Many relationship between Cameras and Alerts)

* One User can acknowledge many Alerts (One-to-Many relationship between Users and Alerts)

## Requirements 
<sup><sub>[top](#table-of-contents)</sub></sup>

1. Node.js v18.0.0 or later
2. PostgreSQL v14.0 or later
3. Prisma v4.11.0 or later

## Getting Started 
<sup><sub>[top](#table-of-contents)</sub></sup>

To set up the project locally, follow these steps:

You will need to have a instance of a `PostgreSQL database server` running locally and the `psql` command line client. Follow the instructions found [here](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

Afterwards you can:

1. Clone the repository:
  
  - git clone https://github.com/hopeVaughn/no_te

      Move into the cloned dir
       - cd no_te (or whatever the dir name you have designated)

2. Install dependencies:
  
  - npm install


3. Configure environment variables:
  
  - Create a `.env` file in the root of the project

  - Copy the `.env.example` file to `.env` and update the variables with your own PostgreSQL database credentials and other required settings.

4. Apply database migrations:
  
  - npx prisma generate

  - npx prisma migrate dev

  - npx prisma db seed
      
      This should run the seed script to populate the database with 12 unique camera's.

5. Start the server:
  
  - npm run dev


6. Navigate to the `client` folder and install dependencies:

  - cd client
  - npm install


7. Start the frontend server:

  - npm run dev


The application will be available at `http://localhost:3001`.

## Running Tests 
<sup><sub>[top](#table-of-contents)</sub></sup>

  * Currently there are only test for the back end. To run the tests for the backend, run the following command in the project root:

  - npm test

## Built With 
<sup><sub>[top](#table-of-contents)</sub></sup>

- [Node.js](https://nodejs.org/) - Backend runtime
- [Express](https://expressjs.com/) - Backend web framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [React](https://react.dev/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework


## Final Product 
<sup><sub>[top](#table-of-contents)</sub></sup>

!["landing Page/signin"](https://github.com/hopeVaughn/no_te/blob/main/01_note.png)
!["landing Page/signup"](https://github.com/hopeVaughn/no_te/blob/main/02_note.png)
!["Dashboard"](https://github.com/hopeVaughn/no_te/blob/main/03_note.png)
!["Tablet View"](https://github.com/hopeVaughn/no_te/blob/main/04_note.png)
!["Tablet View"](https://github.com/hopeVaughn/no_te/blob/main/05_note.png)
!["Mobile View"](https://github.com/hopeVaughn/no_te/blob/main/06_note.png)
!["Mobile Alert View"](https://github.com/hopeVaughn/no_te/blob/main/07_note.png)
!["View Camera Demo"](https://github.com/hopeVaughn/no_te/blob/main/cameraFeed.mp4)