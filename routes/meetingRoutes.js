const express = require('express');
const meetingController = require('./../controllers/meetingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(meetingController.getAllMeetings)
  .patch(
    authController.protect,
    authController.restrictTo('employee'),
    meetingController.createMeeting
  );

router
  .route('/:id')
  .get(meetingController.getMeeting)
  .patch(
    authController.protect,
    authController.restrictTo('student'),
    meetingController.signForMeeting
  );

module.exports = router;
