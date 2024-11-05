import jwt from "jsonwebtoken";

export const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
    (err, token) => {
      console.log(">>> check jwt auth token:", token);
    }
  );
};
