import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import "./models/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/dashboard",dashboardRoutes);

sequelize.sync()
.then(()=>{
  console.log("Database Synced");
});

app.listen(process.env.PORT,()=>{
  console.log("Server Running");
});