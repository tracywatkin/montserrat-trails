import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trailsRouter from "./trails";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/trails", trailsRouter);

export default router;
