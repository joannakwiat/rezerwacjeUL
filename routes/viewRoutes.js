const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const meetingController = require('./../controllers/meetingController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get(
  '/user/:id/meetings',
  authController.isLoggedIn,
  viewsController.getUser
);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignUpForm);
router.get(
  '/createMeeting',
  authController.isLoggedIn,
  viewsController.getMeetingCreateForm
);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/me/meetings',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getMyMeetings
);
router.get(
  '/allEmployees',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getAllEmployess
);

router.get(
  '/me/meetings/:id',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getUsersOnMeeting
);

router.post(
  '/submit-user-data',
  authController.isLoggedIn,
  authController.protect,
  viewsController.updateUserData
);

router.patch(
  '/meetings/:id',
  authController.isLoggedIn,
  authController.protect,
  meetingController.signForMeeting
);
module.exports = router;
