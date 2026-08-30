import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password,
  hashedPassword
) {
  return bcrypt.compare(
    password,
    hashedPassword
  );
}

export function createToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

export function verifyToken(token) {
  return jwt.verify(
    token,
    process.env.JWT_SECRET
  );
}