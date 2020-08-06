import { Router } from "express";
import { registerSchema } from "../validation";
import { User } from "../models";

const router = Router();

router.post("/register", async (req, res) => {
  await registerSchema.validateAsync(req.body, { abortEarly: false });

  const { email, name, password } = req.body;
  const found = await User.exists({ email });

  if (found) {
    throw new Error("Invalid email address");
  }

  await User.create({
    email,
    name,
    password,
  });

  res.json({ message: "OK" });
});

export default router;
