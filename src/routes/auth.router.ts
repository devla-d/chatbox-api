import { Router, Response } from "express";
import {
  GetExistingData,
  LoginUser,
  regisTerUser,
} from "../controller/auth.controller";
import authRequired from "../middleware/auth.middleware";
import validateReg from "../middleware/register.middleware";

const router = Router();

router.post("/register", validateReg, regisTerUser);
router.post("/login", LoginUser);
router.get("/valid-users-data", GetExistingData);
router.get("/test", authRequired, (req, res: Response) => {
  const user = req.user ? req.user : null;
  res.json({ msg: "welcome", user: user });
});
export default router;
