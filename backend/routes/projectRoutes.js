import express from "express";

import verifyToken
from "../middleware/authMiddleware.js";

import authorize
from "../middleware/roleMiddleware.js";

import {

  createProject,
  getProjects,
  addMember,
  removeMember

} from "../controllers/projectController.js";

const router = express.Router();

router.post(
  "/",

  verifyToken,

  authorize("Admin"),

  createProject
);

router.get(
  "/",

  verifyToken,

  getProjects
);

router.post(
  "/:projectId/member",

  verifyToken,

  authorize("Admin"),

  addMember
);

router.delete(
  "/:projectId/member/:userId",

  verifyToken,

  authorize("Admin"),

  removeMember
);

export default router;