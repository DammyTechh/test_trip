const { Router } = require('express');
const onboardingController = require('../controllers/onboarding.controller');
const { protect } = require('../middlewares/auth.middleware');
const {
  validate,
  userTypeSchema,
  interestsSchema,
  generalRateLimit
} = require('../middlewares/validation.middleware');

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
router.get('/profile', protect, onboardingController.getUserProfile);

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
router.put('/user-type', protect, validate(userTypeSchema), onboardingController.updateUserType);

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
 *                 example: [1, 2, 3]
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
router.put('/interests', protect, validate(interestsSchema), onboardingController.updateUserInterests);

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
router.post('/complete', protect, onboardingController.completeOnboarding);

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
router.get('/user-types', onboardingController.getUserTypes);

router.get('/interests', onboardingController.getInterests);

module.exports = router;