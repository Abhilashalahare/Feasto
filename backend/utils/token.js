import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    // jwt.sign returns a string token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    return null;
  }
};

export default genToken;
