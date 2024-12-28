# Gym Registration App

A web application designed for gym registration, fee payment, and management. The app allows users to register, view their due dates, and make payments. It provides functionality for administrators to track unpaid students and manage user information.

## Features

- **User Registration**: Users can register by providing their name, email, batch (morning/evening), and due date.
- **Unpaid Fees**: Users can view the list of students with unpaid fees.
- **Fee Payment**: Users can pay their outstanding fees, and the payment status will be updated in the system.
- **Database**: Utilizes a PostgreSQL database to store user information and payment status.
- **Responsive UI**: The app is built with React and styled using Tailwind CSS for a clean, responsive design.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Prisma ORM
- **Deployment**: Vercel (Frontend), Local PostgreSQL (Backend)
- **Version Control**: GitHub

## Setup Instructions

### Prerequisites

Before you begin, ensure that you have the following installed:

- Node.js (version 16.x or above)
- PostgreSQL
- Git
- Prisma CLI

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Ahamedajas/gym_registration_app.git
   cd gym_registration_app
2. Install the dependencies:
    npm install
3. Set up the PostgreSQL database and create a .env file in the root directory with the following content:
  DATABASE_URL="postgresql://user:password@localhost:5432/gym_db?schema=public"
  Replace user, password, and gym_db with your PostgreSQL credentials and database name.
4. Run the Prisma migration to set up the database schema:
  npx prisma migrate dev
5. Start the backend server:
npm run dev
The backend will be running on http://localhost:5001.
## Frontend Setup

In a separate terminal, navigate to the `gym_registration_app` directory and install the frontend dependencies:
cd gym_registration_app
npm install
## Deployment
The backend is deployed using Vercel. Ensure your environment variables (such as the database URL) are configured in Vercel's settings.

The frontend is also deployed using Vercel. Make sure it is linked to the correct backend URL.
## Endpoints
POST /register
Registers a new user.

Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "batch": "Morning",
  "dueDate": "2024-12-31"
}
Response:
{
  "message": "User created",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "batch": "Morning",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "paymentStatus": false
  }
}
GET /unpaid-fees
Fetches a list of all unpaid students.

  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "batch": "Morning",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "paymentStatus": false
  },
POST /pay-fee
Marks a user as having paid their fee.

Request Body:
{
  "userId": 1
}
## License
This project is licensed under the MIT License - see the LICENSE file for details.


