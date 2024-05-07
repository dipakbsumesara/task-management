# Task Management

Brief description of what this project does and its purpose.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (See [Node.js](https://nodejs.org/en/) for installation instructions)
- Nx CLI installed globally (`npm install -g nx`)

## Installation

Follow these steps to get your development environment set up:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/task-management.git

2. **Navigate to the project directory:**
   ```bash
   cd task-management

3. **Install dependencies:**
   ```bash
   npm install

4. **Create a .env file in the root directory of the project and add the following environment variables:**
   ```bash
   REACT_APP_API_URL=<your_api_url_here>
   MONGO_CONNECTION_STRING=<your_mongodb_connection_string_here>
   JWT_SECRET=<your_jwt_secret_here>

## Running the Application
1. **To Run the backend server:**
   ```bash
   npm run serve:backend

2. **To Run the frontend:**
   ```bash
   npm run serve:frontend

3. **To Run the tests:**
   ```bash
   npm run test

4. **To Get the test coverage:**
   ```bash
   npm run test:coverage
