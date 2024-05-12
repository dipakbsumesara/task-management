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

## API Documentation
This project includes complete CRUD (Create, Read, Update, Delete) operations for task management. All API endpoints require authentication via a Bearer token provided in the Authorization header.

### Authentication
To access the endpoints, you must include the following header in each request:

```bash
Authorization: Bearer <your_access_token_here>
```

Replace `<your_access_token_here>` with the JWT token you received during the authentication process.

### User AUTH APIs
**Register**
- **Endpoint**: POST `/auth/register`
- **Description**: Creates a new account.
- **Request Body**:
```bash
{
  "name": "User",
  "email": "user@gmail.com",
  "password": "User@123"
}
```
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Registered successfully!",
  "data": {
      "userInfo": {
         "_id": "6636256aec9d130751144a6d",
         "name": "User",
         "email": "user@gmail.com",
         "createdAt": "2024-04-09T16:22:10.428Z",
         "updatedAt": "2024-04-09T16:22:10.428Z"
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpcGFrQGdtYWlsLmNvbSIsInN1YiI6IjY2M2E3MmE2MTFlYzA1ZTkxN2YwZDBlOCIsImlhdCI6MTcxNTUwNjE0MSwiZXhwIjoxNzE1NTkyNTQxfQ.P5DSJJTE4iqaC_3r8XNEnbqDl0-vB4W99aUk-Eu7Tfo"
  }
}
```

**Login**
- **Endpoint**: POST `/auth/login`
- **Description**: Login to existing account.
- **Request Body**:
```bash
{
  "email": "user@gmail.com",
  "password": "User@123"
}
```
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Logged in successfully!",
  "data": {
      "userInfo": {
         "_id": "6636256aec9d130751144a6d",
         "name": "User",
         "email": "user@gmail.com",
         "createdAt": "2024-04-09T16:22:10.428Z",
         "updatedAt": "2024-04-09T16:22:10.428Z"
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpcGFrQGdtYWlsLmNvbSIsInN1YiI6IjY2M2E3MmE2MTFlYzA1ZTkxN2YwZDBlOCIsImlhdCI6MTcxNTUwNjE0MSwiZXhwIjoxNzE1NTkyNTQxfQ.P5DSJJTE4iqaC_3r8XNEnbqDl0-vB4W99aUk-Eu7Tfo"
  }
}
```


### Task CRUD APIs

**Create a Task**
- **Endpoint**: POST `/api/tasks`
- **Description**: Creates a new task.
- **Authorization**: Required (Bearer Token)
- **Request Body**:
```bash
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "Done"
}
```
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Task created successfully!",
  "data": {
      "_id": "6636256aec9d130751144a6d",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending",
      "createdAt": "2024-04-09T16:22:10.428Z",
      "updatedAt": "2024-04-09T16:22:10.428Z"
  }
}
```

**Get All Tasks**
- **Endpoint**: GET `/api/tasks`
- **Description**: Retrieves all tasks.
- **Authorization**: Required (Bearer Token)
- **Optional Query Params**:
```bash
filterBy: "status",
filterValue: "To Do",
searchQuery: "Task",
skip: 0,
take: 1
```
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Tasks fetched successfully!",
  "data": 
    {
      "tasks": [
         {
            "_id": "6636256aec9d130751144a6d",
            "title": "Task Title",
            "description": "Task Description",
            "status": "pending",
            "createdAt": "2024-04-09T16:22:10.428Z",
            "updatedAt": "2024-04-09T16:22:10.428Z"
          }
       ],
      "count": 10    
   }
}
```

**Get a Task by ID**
- **Endpoint**: GET `/api/tasks/{taskId}`
- **Description**: Retrieves a task by its ID.
- **Authorization**: Required (Bearer Token)
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Task fetched successfully!",
  "data": {
    "_id": "6636256aec9d130751144a6d",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "createdAt": "2024-04-09T16:22:10.428Z",
    "updatedAt": "2024-04-09T16:22:10.428Z"
  }
}
```

**Update a Task**
- **Endpoint**: PATCH `/api/tasks/{taskId}`
- **Description**: Updates an existing task.
- **Authorization**: Required (Bearer Token)
- **Request Body**
```bash
{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "In Progress"
}
```
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Task updated successfully!",
  "data": {
    "_id": "6636256aec9d130751144a6d",
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "In Progress",
    "createdAt": "2024-04-09T16:22:10.428Z",
    "updatedAt": "2024-04-09T17:00:00.000Z"
  }
}
```

**Delete a Task**
- **Endpoint**: DELETE `/api/tasks/{taskId}`
- **Description**: Deletes a task by its ID.
- **Authorization**: Required (Bearer Token)
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Task deleted successfully!"
}
```

**Delete multiple Tasks**
- **Endpoint**: DELETE `/api/tasks`
- **Description**: Deletes multiple task by IDs.
- **Authorization**: Required (Bearer Token)
- **Request Body**
```bash
{
   "ids": ["6636256aec9d130751144a6d"]
}
```
- **Example Response**:
```bash
{
  "status": "success",
  "message": "Tasks deleted successfully!"
}
```


### Accessing Postman Documentation
For a more detailed API guide, including example requests and responses for all endpoints, you can access the Postman documentation <a href="https://drive.google.com/drive/folders/1sw8voV2vZcqv_dddebCHTaaLRFx-i31T?usp=drive_link" target="_blank">here</a>. This comprehensive guide will help you interact with each endpoint effectively.
