import express from  "express"
import { analysis } from "../Controllers/Analysis controller.js";

const router =express.Router();


router.post("/analysis",analysis)

export default router  