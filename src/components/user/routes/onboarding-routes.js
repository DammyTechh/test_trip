const { Router } = require("express");
const onboardingController = require("../controllers/onboarding.controller");
const { validate } = require("../../../middlewares/validate-request");
const { guard } = require("../../../middlewares/auth.middleware");
const {
  updateUserSchema,
  updateInterestSchema,
  userIdSchema,
  tripPurposeSchema,
  userTypeSchema,
  updatePlannerSchema,
} = require("../validators/onboarding-schema");
const {
  generalRateLimit,
} = require("../../../middlewares/security.middleware");
const { tokenSchema } = require("../validators/auth-schema");
const router = Router();

router.use(generalRateLimit);

router.get("/user-types", onboardingController.getUserTypes);
router.get("/interests", onboardingController.getAllInterests);
router.patch(
  "/trip-purpose",
  validate(tokenSchema(), "headers"),
  guard,
  validate(tripPurposeSchema()),
  onboardingController.updateTripPurpose
);
router.patch(
  "/user-type",
  validate(userTypeSchema(), "body"),
  onboardingController.addUserType
);
router.patch(
  "/planner",
  validate(tokenSchema(), "headers"),
  guard,
  validate(updatePlannerSchema(), "body"),
  onboardingController.updatePlannerDetails
),
  router.get(
    "/user/:user_id",
    validate(userIdSchema(), "params"),
    onboardingController.getUserById
  );

router.get(
  "/user",
  validate(tokenSchema(), "headers"),
  guard,
  onboardingController.getUser
);

router.patch(
  "/interests",
  validate(tokenSchema(), "headers"),
  guard,
  validate(updateInterestSchema()),
  onboardingController.selectInterest
);
router.patch(
  "/user",
  validate(updateUserSchema()),
  onboardingController.updateUserDetails
);

module.exports = router;
