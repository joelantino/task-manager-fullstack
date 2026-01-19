# Task Hub - Premium Task Management App 🚀

Task Hub is a full-stack task management application designed with a focus on aesthetics and productivity. It features a modern "floating glassmorphism" UI, secure JWT authentication, and advanced task metadata management.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login and registration with encrypted passwords.
- **📋 Task CRUD**: Create, read, update, and delete tasks seamlessly.
- **🏷️ Task Metadata**: Organize tasks with Categories, Priority levels (Low, Medium, High), and Due Dates.
- **🎨 Modern UI/UX**: Built with React and Vite, featuring a sleek glassmorphic design system and smooth animations.
- **📊 Database Management**: Powered by MongoDB for reliable data persistence.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Lucide Icons, Vanilla CSS (Glassmorphism).
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Auth**: JSON Web Tokens (JWT), Bcrypt.js.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/joelantino/task-manager-fullstack.git
   cd task-manager-fullstack
   ```

2. **Backend Setup**:
   ```bash
   npm install
   ```
   Create a `.env` file in the root:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/task_db
   JWT_SECRET=your_secret_key
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

### Running the App

1. **Start the Backend**:
   ```bash
   # From the root directory
   node server.js
   ```

2. **Start the Frontend**:
   ```bash
   # From the frontend directory
   npm run dev
   ```

Visit `http://localhost:5173` in your browser!

## 🧪 Testing with Postman

I've included a Postman collection file `TaskHub.postman_collection.json` in the root directory.

1. **Import**: Open Postman and import the file.
2. **Environment**: The collection includes a `baseUrl` variable set to `http://localhost:3000/api`.
3. **Automated Auth**: When you run the **Login** request, the JWT token is automatically saved and used for all **Task** requests.

## 📸 Screenshots

*(Add your screenshots here later!)*

## 📄 License

This project is open-source and available under the MIT License.
