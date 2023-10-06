import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimleft();
    }

    const verfied = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verfied;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
