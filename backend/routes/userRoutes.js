import express from "express";
import { User } from "../models/index.js";
import verifyToken from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.delete("/:id", verifyToken, authorize("Admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        return res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/:id", verifyToken, authorize("Admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        
        await user.save();
        
        return res.status(200).json({ success: true, message: "User updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
