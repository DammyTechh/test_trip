const { Router } = require("express");
const onboardingController = require("./controllers/onboarding.controller");
const { protect } = require("../../middlewares/auth.middleware");
const {
  validate,
  userTypeSchema,
  interestsSchema,
  travelPreferencesSchema,
  generalRateLimit,
} = require("../../middlewares/validation.middleware");
const { guard } = require("../../../middlewares/auth.middleware");
const { tokenSchema } = require("../validators/auth-schema");

const router = Router();

router.use(generalRateLimit);

/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: User onboarding and profile management
 */

/**
 * @swagger
 * /api/onboarding/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/profile",
  validate(tokenSchema(), "headers"),
  guard,
  onboardingController.getUserProfile
);

/**
 * @swagger
 * /api/onboarding/user-type:
 *   put:
 *     summary: Update user type
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userTypeId
 *             properties:
 *               userTypeId:
 *                 type: integer
 *                 example: 1
 *                 description: User type identifier (1=Traveller, 2=Planner, 3=Both)
 *     responses:
 *       200:
 *         description: User type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid user type ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  "/user-type",
  validate(tokenSchema(), "headers"),
  guard,
  validate(userTypeSchema),
  onboardingController.updateUserType
);

/**
 * @swagger
 * /api/onboarding/interests:
 *   put:
 *     summary: Update user interests
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - interestIds
 *             properties:
 *               interestIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3, 4]
 *                 description: Array of interest IDs
 *     responses:
 *       200:
 *         description: User interests updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid interest IDs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get all interests
 *     tags: [Onboarding]
 *     security: []
 *     responses:
 *       200:
 *         description: Interests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     interests:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Interest'
 */
router.put(
  "/interests",
  guard,
  validate(interestsSchema),
  onboardingController.updateUserInterests
);

/**
 * @swagger
 * /api/onboarding/travel-preferences:
 *   put:
 *     summary: Update travel preferences (frequency and budget)
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - travelFrequency
 *               - budgetRange
 *             properties:
 *               travelFrequency:
 *                 type: string
 *                 enum: ["Once a year", "2 - 3 times per year", "Weekly", "Monthly"]
 *                 example: "2 - 3 times per year"
 *               budgetRange:
 *                 type: string
 *                 enum: ["Under $500", "$500 - $1500", "$1500 - $3000", "Above $3000"]
 *                 example: "$500 - $1500"
 *     responses:
 *       200:
 *         description: Travel preferences updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid travel preferences
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  "/travel-preferences",
  guard,
  validate(travelPreferencesSchema),
  onboardingController.updateTravelPreferences
);

/**
 * @swagger
 * /api/onboarding/trip-purpose:
 *   put:
 *     summary: Update trip purpose
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripPurpose
 *             properties:
 *               tripPurpose:
 *                 type: string
 *                 example: "Planning a vacation"
 *     responses:
 *       200:
 *         description: Trip purpose updated successfully
 */
router.put("/trip-purpose", guard, onboardingController.updateTripPurpose);

/**
 * @swagger
 * /api/onboarding/planner-profile:
 *   put:
 *     summary: Update planner profile (for planners only)
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destinationSpecialties:
 *                 type: string
 *                 example: "Paris, Kenya"
 *               planningExperienceYears:
 *                 type: integer
 *                 example: 3
 *               planningRate:
 *                 type: number
 *                 example: 75.00
 *     responses:
 *       200:
 *         description: Planner profile updated successfully
 */
router.put(
  "/planner-profile",
  guard,
  onboardingController.updatePlannerProfile
);

/**
 * @swagger
 * /api/onboarding/complete:
 *   post:
 *     summary: Complete onboarding process
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/complete", guard, onboardingController.completeOnboarding);

/**
 * @swagger
 * /api/onboarding/user-types:
 *   get:
 *     summary: Get all user types
 *     tags: [Onboarding]
 *     security: []
 *     responses:
 *       200:
 *         description: User types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     userTypes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserType'
 */
router.get("/user-types", onboardingController.getUserTypes);

/**
 * @swagger
 * /api/onboarding/trip-purposes:
 *   get:
 *     summary: Get all trip purposes
 *     tags: [Onboarding]
 *     security: []
 *     responses:
 *       200:
 *         description: Trip purposes retrieved successfully
 */
router.get("/trip-purposes", onboardingController.getTripPurposes);

router.get("/interests", onboardingController.getInterests);

module.exports = router;
