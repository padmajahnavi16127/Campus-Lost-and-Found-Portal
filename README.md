# Campus Lost and Found Portal

## Project Description
The Campus Lost and Found Portal is a web-based application developed to help university students report, search for, and recover lost belongings within the campus.

Students can report lost or found items, upload item images, search for belongings, and submit claims. Administrators can manage claims and monitor reported items.

## Features
- Student registration and login
- Secure authentication using JWT
- Report lost and found items
- Upload item images
- Search and filter items
- Sort items by date
- Submit claims for found items
- Admin dashboard
- Admin claim approval and rejection
- Student dashboard

## Technologies Used

**Frontend:**
- HTML5
- CSS3
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB Atlas
- Mongoose

**Other Tools:**
- Postman
- Git and GitHub
- Multer
- JWT
- bcryptjs

## Project Structure

- config – Database configuration
- controllers – Application logic
- middleware – Authentication and image upload
- models – MongoDB schemas
- public – Frontend files
- routes – API routes
- uploads – Uploaded item images
- server.js – Main server file

## Installation and Setup

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root folder and configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
```

5. Start the server:

```bash
node server.js
```

6. Open your browser at:

http://localhost:3000

## Database
The application uses MongoDB Atlas to store user accounts, lost and found items, and claims.

## API Testing
The backend APIs are tested using Postman.

## Developed For
Web Technology Academic Project – Sai University

## Repository
https://github.com/padmajahnavi16127/Campus-Lost-and-Found-Portal
