import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Token not verified" });
    }

    console.log("Decoded token:", decodedToken);

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error("isAuth error:", error.message); 
    return res
      .status(500)
      .json({ message: "isAuth error", error: error.message });
  }
};

export default isAuth;
