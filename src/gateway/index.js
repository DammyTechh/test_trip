const { Router } = require("express");
const router = Router();
const authRouter = require("../components/user/routes/auth.routes");
const docsRouter = require("../documentation/route");
const onboardingRoute = require("../components/user/routes/onboarding-routes");

router.use("/onboarding", onboardingRoute);
router.use("/auth", authRouter);
router.use("/docs", docsRouter);

module.exports = router;
