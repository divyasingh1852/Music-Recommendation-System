import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  // Expecting token in Authorization header: "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach user ID to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
