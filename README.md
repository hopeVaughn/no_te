# Networked Observation & Tracking Environment (N.O.T.E)

Networked Observation & Tracking Environment (N.O.T.E) is a web application for managing a simulated network of surveillance cameras in a building or facility.

## Table of Contents

- [Features](#features)
- [Database Design Concept](#database-design-concept)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## `Features`

1. Login functionality with user
2. Allow operators to view simulated past footage from each camera
3. Alert operators when a camera goes offline or detects simulated motion or sound
4. Design and implement a responsive UI that works well on both desktop and mobile devices


## Database Design Concept

### `Key Entities` 

1. Users
2. Cameras
3. Alerts

### `Attributes and Relationships`

1. `Users`:

* id (Primary key)
* username (Unique)
* password (hashed)
* email (Unique)
* first_name
* last_name
* role (Admin, Operator)

1. `Cameras`:

* id (Primary key)
* name (Unique)
* location
* status (Online, Offline)
* video_url (URL to the video file or live stream)
* created_at (Timestamp)
* updated_at (Timestamp)

3. `Alerts`:

* id (Primary key)
* camera_id (Foreign key referencing Cameras)
* alert_type (Motion, Sound)
* detected_at (Timestamp)
* acknowledged (Boolean)
* acknowledged_by (Foreign key referencing Users)
* acknowledged_at (Timestamp)

### `Relationships`

* One Camera can have many Alerts (One-to-Many relationship between Cameras and Alerts)

* One User can acknowledge many Alerts (One-to-Many relationship between Users and Alerts)

## `Requirements`

1. Node.js v18.0.0 or later
2. PostgreSQL v14.0 or later
3. Prisma v4.11.0 or later

## `Getting Started`

To set up the project locally, follow these steps:

1. Clone the repository:
  
  - git clone https://github.com/hopeVaughn/no_te
  - cd no_te

2. Install dependencies:
  
  - npm install


3. Configure environment variables:
  
  - Copy the `.env.example` file to `.env` and update the variables with your own PostgreSQL database credentials and other required settings.

4. Apply database migrations:
  
  - npx prisma migrate dev

5. Start the server:
  
  - npm run dev


6. Navigate to the `client` folder and install dependencies:

  - cd client
  - npm install


7. Start the frontend server:

  - npm run dev


The application will be available at `http://localhost:3000`.

## `Running Tests`

  * To run the tests for the backend, run the following command in the project root:

  - npm test

  
## `Deployment`

Deployment instructions will depend on your chosen hosting provider. Please refer to their specific documentation for deploying Node.js and React applications.

## `Built With`

- [Node.js](https://nodejs.org/) - Backend runtime
- [Express](https://expressjs.com/) - Backend web framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [React](https://react.dev/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework


