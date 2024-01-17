# Node.js 20 TypeScript Mongoose JWT Authentication API

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D%2020.11.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-%5E5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Mongoose Version](https://img.shields.io/badge/Mongoose-%5E7.4.4-yellow.svg)](https://mongoosejs.com/)
[![JWT Version](https://img.shields.io/badge/jsonwebtoken-%5E9.0.2-orange.svg)](https://www.npmjs.com/package/jsonwebtoken)

This project is a robust Node.js 20-based scaffold, meticulously crafted with TypeScript and integrated with Mongoose, a MongoDB ODM (Object-Document Mapper). The primary objective of this scaffold is to offer a fully-fledged authentication and registration API framework for web and application developers.

## Features

- Node.js 20: Leveraging the latest capabilities and performance enhancements of Node.js.
- TypeScript: Providing a statically typed and more maintainable codebase.
- Mongoose: Seamlessly integrating MongoDB for efficient data modeling and management.
- Authentication and Registration: A secure and extensible system for user authentication and registration.
- API Endpoints: Preconfigured API endpoints for user management, login, registration, and more.
- Express.js: A well-structured and flexible web application framework for building APIs.
- Modular Design: Encouraging a clean, maintainable, and easily extensible project structure.
- Scalability: Designed with scalability in mind, allowing for seamless expansion as your project grows.
- Documentation: Comprehensive documentation to facilitate quick onboarding and development.

## Installation

Before getting started, ensure that you have Node.js (>= 18.18.2) and npm installed on your system.

```bash
# Clone the repository
git clone https://github.com/imgmongelli/node-ts-mongoose-jwt-auth-api.git

# Navigate to the project directory
cd node-ts-mongoose-jwt-auth-api

# Install dependencies
npm install
```

## Usage

Before getting started, ensure that you have Node.js (>= 18.18.2) and npm installed on your system.

### Development

To run the project in development mode with live-reloading:

```bash
npm start
```

## Code Checking

To check your code for linting issues using ESLint, run the following command in your terminal:

```bash
npm run check
```

**API Descriptions:**

| Endpoint         | Description                           | Method | Authentication |
| ---------------- | ------------------------------------- | ------ | -------------- |
| `/auth/register` | Register a new user                   | POST   | No Auth        |
| `/auth/login`    | Log in as a user                      | POST   | No Auth        |
| `/api/me`        | Get details of the authenticated user | GET    | Bearer Token   |

1. **Register (Register a new user)**

   - **Endpoint:** `/auth/register`
   - **Method:** `POST`
   - **Authentication:** No authentication required
   - **Description:** This endpoint allows you to register a new user by providing their first name, last name, password, and email.

2. **Login (Log in as a user)**

   - **Endpoint:** `/auth/login`
   - **Method:** `POST`
   - **Authentication:** No authentication required
   - **Description:** This endpoint allows you to log in as a user by providing their email and password. After a successful registration, the access token is stored in the Postman environment.

3. **Me (Get details of the authenticated user)**

   - **Endpoint:** `/api/me`
   - **Method:** `GET`
   - **Authentication:** Bearer Token
   - **Description:** This endpoint allows you to retrieve details of the authenticated user. You must include the access token in the authentication header.

**Notes:**

- To obtain the access token after registration or login, first execute the `/auth/register` or `/auth/login` request respectively.
- The obtained access token is stored in the Postman environment and will be automatically used for subsequent requests.
- Ensure that you include the access token in the authentication header for requests that require authentication.
