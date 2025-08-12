# School App API
This document provides information on the backend API for the School App. 

## Getting Started

> This **Getting Started** section is generated using AI. 

To get a local copy up and running, follow these steps.

1.  Clone the repository:
    `git clone <your-repo-url>`
2.  Navigate to the API directory:
    `cd school-app/api`
3.  Install NPM packages:
    `npm install`
4.  Create a `.env` file in the `/api` root and add the following variables:
    ```
    PORT=7445
    MONGO_URI=<your_local_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```
5.  Seed the database with initial data:
    `npm run data:import`
6.  Run the server in development mode:
    `npm run dev`

## Used Technology
- NODE.js
- Express.js
- MongoDB
- Json Web Token 
- bcryptJS
- CORS
### Architectures & Design
- ***Architectural Pattern*** : MVC -(Model-View-Controller)
- ***Folder Structures*** : Feature-Based
- ***Development Process*** : Feature-Driven-Development


## App Features 
### Schedule Management
- *Daily Schedule*
- *Proxy Tracker*

### User Management
- *Profile Management*
- *Personal Dashboard*
- **User Roles**
    - Super Admin
    - Admin
    - Teacher
    - Cordinator
    - Student
    - Guardian
    - Public

### Academic Management 
- *Academic Profile*
- *Academic Gallery*
- *Academic Classes*
    - Class Periods 
    - Class Versions
    - Classroom Management

## API Endpoints
> This **API Endpoints** section is generated using AI.

Here is a list of the available API endpoints.

### Authentication

| Method | Endpoint             | Description              | Access |
| ------ | -------------------- | ------------------------ | ------ |
| POST   | `/api/users/register`| Register a new user      | Public |
| POST   | `/api/users/login`   | Authenticate a user & get token | Public |

### Schedule

| Method | Endpoint             | Description              | Access |
| ------ | -------------------- | ------------------------ | ------ |
| GET    | `/api/schedule/today`| Get today's final schedule | Private |

### Management (Admin Only)

| Method | Endpoint             | Description              | Access |
| ------ | -------------------- | ------------------------ | ------ |
| POST   | `/api/subjects`      | Create a new subject     | Admin  |
| POST   | `/api/classrooms`    | Create a new classroom   | Admin  |