import authRoute from "./authRoute.js"
import express from "express";
import userRoute from "./userRoute.js";
import postRoute from "./postRoute.js";
const router = express.Router();

router.use("/auth",authRoute);
router.use("/user",userRoute);
router.use("/posts", postRoute);
export default router;