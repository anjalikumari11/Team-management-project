import express from "express";

import {signup,login, getAllUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",signup);
router.get("/allUsers",getAllUser);
router.post("/login",login);

export default router;