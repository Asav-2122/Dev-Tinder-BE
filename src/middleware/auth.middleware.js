const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized!",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(403).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = authMiddleware;
