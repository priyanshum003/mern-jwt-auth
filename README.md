# MERN JWT Auth

This is a full-stack web application built with MongoDB, Express.js, React.js, and Node.js (MERN stack). It uses JSON Web Tokens (JWT) for authentication and Redux for state management.

## Features

- User registration and login with encrypted passwords using bcryptjs
- JWT authentication
- Persistent authentication status with JWT
- Protected routes that only authenticated users can access
- Redux for state management
- Axios for HTTP requests
- CORS enabled
- React Router for routing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB
- A package manager like npm or yarn

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/mern-jwt-auth.git`
2. Navigate to the server directory and install the dependencies: `cd server && npm install` or `cd server && yarn install`
3. Navigate to the client directory and install the dependencies: `cd ../client && npm install` or `cd ../client && yarn install`

4. Create a `.env` file in the server directory and add your MongoDB URI and JWT secret, like this:


```env
CLIENT_URL="your_client_url"
MONGODB_URI="your_mongodb_url"
JWT_SECRET="your_jwt_secret_key"
TOKEN_EXPIRATION="expiration"
NODE_ENV="your_developement_enviroment"
```
4. Create a .env file in the client directory and add any environment variables needed for the client, like this:

```env
VITE_API_URL="your_backend_api_url"
```

5. Start the backend server: 
`cd server` && `npm start` or `cd server` && `yarn start`

6. In a new terminal window, start the frontend server: 
`cd client` && `npm start` or `cd client` && `yarn start`

7. Open your browser and visit `http://localhost:<Port>`



**Note:** Please replace <Port> with the actual port number where your server is running.
