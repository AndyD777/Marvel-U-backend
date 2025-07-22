import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../db/queries/users.js";
import { createToken } from "../utils/jwt.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

// ✅ FIX: Call requireBody with the fields to check
router.post(
  "/register",
  requireBody(["email", "password"]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Note: The manual check below is no longer needed because requireBody handles it
      // if (!email || !password) { ... }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(email, hashedPassword);

      const token = createToken({ id: user.id, email: user.email });
      // ✅ FIX: Send the raw token string, not a JSON object
      res.status(201).send(token);
    } catch (error) {
      next(error);
    }
  }
);

// ✅ FIX: Call requireBody with the fields to check
router.post(
  "/login",
  requireBody(["email", "password"]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Note: The manual check below is no longer needed because requireBody handles it
      // if (!email || !password) { ... }

      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(401).send("Invalid credentials.");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).send("Invalid credentials.");
      }

      const token = createToken({ id: user.id, email: user.email });
      // ✅ FIX: Send the raw token string, not a JSON object
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
