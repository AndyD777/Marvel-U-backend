import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../db/queries/users.js";
import { createToken } from "../utils/jwt.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

router.post("/register", requireBody, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    const token = createToken({ id: user.id, email: user.email });
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", requireBody, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send("Invalid credentials.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send("Invalid credentials.");
    }

    const token = createToken({ id: user.id, email: user.email });
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
