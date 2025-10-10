const { Router } = require("express");
const router = Router();
const authRouter = require("../components/user/routes/auth.routes");
const userRouter = require("../components/user/routes/auth.routes");
const docsRouter= require('../documentation/route');

router.use("/onboarding", userRouter);
router.use("/auth", authRouter);
router.use('/docs', docsRouter);

module.exports = router;
