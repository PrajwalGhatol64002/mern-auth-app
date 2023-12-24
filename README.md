# MERN Authentication App with Tailwind CSS, Material-UI, and OAuth

## Overview

This project is a full-stack web application that implements user authentication using the MERN stack along with Tailwind CSS, Material-UI for styling, and OAuth for authentication.

### Technologies Used

- **Frontend**:
  - React
  - Axios
  - React Router
  - Tailwind CSS
  - Material-UI

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)
  - bcrypt for password hashing
  - OAuth libraries for authentication (e.g., Passport.js)

## Installation

1. **Client Setup**:
   - Clone the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. **Server Setup**:
   - Clone the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

## Configuration

- **OAuth Integration**:
  - To enable OAuth, obtain API keys from providers (Google, Facebook, etc.).
  - Place these keys in the designated files (e.g., `server/config/default.json`).
  - Refer to our OAuth integration guide [here](link) for detailed steps.

## Usage

1. **Local Development**:
   - Start the frontend:
   ```bash
   cd client
   npm start
   ```
   - Start the backend:
   ```bash
   cd server
   node server 
   ```

2. **Authentication Flow**:
   - Register a new user or authenticate via OAuth providers.
   - Login with registered user credentials or OAuth login.
   - Access the protected routes and update the user profile.



## Setting Up Environment Variables

This project relies on environment variables for configuration. Follow these steps to set up your `.env` files:

### Server (.env)

Create a file named `.env` in the root directory of the `server` folder and add the following content:

```bash
# MongoDB connection URL for demo purposes
MONGODB_URL=mongodb+srv://username:password@your-mongodb-host/User-Info?retryWrites=true&w=majority
SERVER_PORT=5000
JWT_SECRET=mySecretKeyForJWT
```

Replace `username`, `password`, and `your-mongodb-host` with your MongoDB credentials and host details. The `JWT_SECRET` can be any random string for local development.

### Client (.env)

For the `client` side, create a file named `.env` in the root directory of the `client` folder and add the following:

```bash
REACT_APP_API_URL=https://your-demo-api-url.com
# REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_API_KEY="YOUR_FIREBASE_DEMO_API_KEY"
```

Replace `https://your-demo-api-url.com` with a demo API endpoint or use `http://localhost:4000` for local development. For `REACT_APP_FIREBASE_API_KEY`, you can use any placeholder text or a string format without an actual API key.

## Contributing

- Contributions are welcomed.
