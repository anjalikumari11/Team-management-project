# Team Task Manager

A full-stack project and task management application built with the **MERN-like stack** (MySQL/PostgreSQL via Sequelize instead of MongoDB). It helps teams organize projects, assign tasks, and track their progress efficiently with Role-Based Access Control (Admin & Member).

## 🚀 Features

- **Role-Based Authentication:** Secure login system with two roles: `Admin` and `Member`.
- **Dynamic Dashboard:** Get a quick overview of total tasks, completed tasks, pending tasks, and active projects.
- **User Management:** Admins can easily add, edit, and remove team members.
- **Project Management:** 
  - Create new projects (Admins).
  - Add or remove team members to specific projects.
  - Members can only view projects they are assigned to.
- **Task Management:** 
  - Create tasks within a project and assign them to specific team members.
  - Set due dates and priority levels (High, Medium, Low).
  - Update task statuses (Pending, In Progress, Completed).

## 🛠️ Technology Stack

**Frontend:**
- React.js
- React Router DOM
- Bootstrap 5 (for responsive UI/UX)
- Axios (for API requests)
- React-Toastify (for notifications)
- React-Icons

**Backend:**
- Node.js & Express.js
- Sequelize ORM (for SQL database connectivity)
- JSON Web Tokens (JWT) for authentication
- bcryptjs (for password hashing)

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Team-Task-Manager.git
cd Team-Task-Manager
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder and add your environment variables (e.g., PORT, DB credentials, JWT_SECRET).
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```

## 🌐 Usage
- Open your browser and navigate to `http://localhost:5173`.
- **Admin Default Setup:** Register an account and manually set its role to `Admin` in the database, or use an existing Admin account to create other users/admins.
- Admins can create projects, invite members, and assign tasks.
- Members can log in, view their assigned tasks, and update the task status as they work on it.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
