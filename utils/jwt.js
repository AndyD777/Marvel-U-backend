import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export function createToken(user) {
  return jwt.sign(user, secret, { expiresIn: "1w" });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
