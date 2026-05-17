import express from "express";

import verifyToken
from "../middleware/authMiddleware.js";

import authorize
from "../middleware/roleMiddleware.js";

import {

  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask

} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", verifyToken, authorize("Admin"), createTask);

router.get("/",verifyToken,getTasks);

router.put("/:taskId",verifyToken,updateTaskStatus);

router.delete(
  "/:taskId",

  verifyToken,

  authorize("Admin"),

  deleteTask
);

export default router;