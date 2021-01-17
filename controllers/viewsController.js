const Meeting = require('../models/meetingModel');
const User = require('./../models/userModel');

exports.getHome = async (req, res, next) => {
  try {
    res.status(200).render('home', {
      title: 'Home Page'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    // 1. get data for the requested tour (including reviews and guides)
    const user = await User.findOne({ _id: req.params.id }).populate(
      'meetings'
    );

    if (!user) {
      throw new Error('There is no user with that id');
    }
    // 2. build template

    // 3. render that template using tour data from 1.
    res.status(200).render('user', {
      title: `${user.name} User`,
      user
    });
  } catch (err) {
    res.status(404).render('error', {
      title: 'Someting went wrong!',
      msg: err.message
    });
  }
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Sign up'
  });
};

exports.getMeetingCreateForm = (req, res) => {
  res.status(200).render('createMeeting', {
    title: 'Create New Meeting'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getAllEmployess = async (req, res) => {
  const employees = await User.find({ role: 'employee' });

  res.status(200).render('allEmployees', {
    title: 'All Employees',
    employees
  });
};

exports.getMyMeetings = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate('meetings');

    if (user.role === 'student') {
      res.status(200).render('myMeetings', {
        title: 'Your Meetings',
        meetings: user.myMeetings
      });
    } else {
      res.status(200).render('myMeetings', {
        title: 'Your Meetings',
        meetings: user.meetings
      });
    }
  } catch (err) {
    res.status(404).render('error', {
      title: 'Someting went wrong!',
      msg: err.message
    });
  }
};

exports.getUsersOnMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.id });
    res.status(200).render('meetingDetails', {
      title: 'Opened meeting',
      meeting
    });
  } catch (err) {
    res.status(404).render('error', {
      title: 'Someting went wrong!',
      msg: err
    });
  }
};

exports.updateUserData = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email
      },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser
    });
  } catch (err) {
    res.status(404).render('error', {
      title: 'Someting went wrong!',
      msg: err.message
    });
  }
};
