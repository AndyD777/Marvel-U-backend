import { verifyToken } from "../utils/jwt.js";
import { getUserById } from "../db/queries/users.js";

export default async function getUserFromToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return next();

  const token = auth.split(" ")[1];
  try {
    const { id } = verifyToken(token);
    const user = await getUserById(id);
    if (user) req.user = user;
  } catch (err) {
    console.error(err);
  }
  next();
}
