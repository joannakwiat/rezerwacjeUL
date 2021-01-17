/*eslint-disable*/

// updateData function
import axios from 'axios';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success')
      alert(`${type.toUpperCase()} updated successfully!`);
  } catch (err) {
    alert('Please provide proper data.');
  }
};

export const signForMeeting = async id => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/meetings/${id}`
    });

    if (res.data.status === 'success') {
      alert('Signed for meeting successfully!');
    }
  } catch (err) {
    alert('You are already signed for this meeting!');
  }
};

export const createNewMeeting = async data => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/meetings`,
      data
    });

    if (res.data.status === 'success') {
      alert('Meeting created successfully!');
      // window.setTimeout(() => {
      //   location.assign('/');
      // }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
