const Meeting = require('./../models/meetingModel');
const User = require('./../models/userModel');
const factory = require('./handlerFactory');

exports.getAllMeetings = factory.getAll(Meeting);

exports.getMeeting = factory.getOne(Meeting);

exports.createMeeting = async (req, res, next) => {
  try {
    req.body.meetingCreator = req.user._id;
    const newMeeting = await Meeting.create(req.body);

    // Here i tried to update users array of currently logged in user, but bugged, so i made it another way around

    // const meetingCreator = await User.findById(req.user._id);
    // console.log(meetingCreator);

    // meetingCreator.myMeetings.push(newMeeting);
    // await meetingCreator.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      data: {
        meeting: newMeeting
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      data: {
        message: err.message
      }
    });
  }
};

exports.signForMeeting = async (req, res, next) => {
  try {
    // 1. Find current user and current meeting
    const updatedMeeting = await Meeting.findById(req.params.id);
    const updatedUser = await User.findById(req.user._id);

    // 2. Check if there is any duplicate in array, and if so throw error
    updatedMeeting.users.forEach(user => {
      const buf1 = Buffer.from(`${user._id}`);
      const buf2 = Buffer.from(`${req.user._id}`);

      if (buf1.equals(buf2)) {
        throw new Error('You are already signed for this meeting.');
      }
    });

    // 3. Check if users limit for meeting is reached
    if (updatedMeeting.users.length + 1 > updatedMeeting.limit) {
      throw new Error('No free spots for this meeting is left.');
    }

    // 4. If there are free spots, update those 2 documents
    updatedMeeting.users.push(req.user._id);
    updatedUser.myMeetings.push(req.params.id);

    await updatedMeeting.save();
    await updatedUser.save({ validateBeforeSave: false });

    // 5. Send response
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Successfully signed for this meeting'
        // data: {
        //   meeting: updatedMeeting,
        //   user: updatedUser
        // }
      }
    });
  } catch (err) {
    res.status(403).json({
      status: 'fail',
      data: {
        message: err.message
      }
    });
  }
};
