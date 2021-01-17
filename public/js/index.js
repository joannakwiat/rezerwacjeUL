/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { signUp } from './signUp';
import {
  updateSettings,
  signForMeeting,
  createNewMeeting,
} from './updateSettings';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

const signForMeetingButtons = document.querySelectorAll('.signForMeetingBtn');
const createMeetingForm = document.querySelector('.form-create-meeting');

const signUpForm = document.querySelector('.form--signUp');

signForMeetingButtons.forEach((signButton) => {
  signButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(signButton.value);
    signForMeeting(signButton.value);
  });
});
// VALUES

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (createMeetingForm) {
  createMeetingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--create-meeting').textContent = 'Creating...';

    const info = document.getElementById('info').value;
    const place = document.getElementById('place').value;
    const date = document.getElementById('date').value;
    const limit = Number.parseInt(document.getElementById('limit').value);

    await createNewMeeting({ info, place, date, limit });

    document.querySelector('.btn--create-meeting').textContent = 'Create';
    document.getElementById('info').value = '';
    document.getElementById('place').value = '';
    document.getElementById('date').value = '';
    document.getElementById('limit').value = '';
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--signUp').textContent = 'Signing up...';

    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const role = document.getElementById('signUpRole').value;
    const faculty = document.getElementById('signUpFaculty').value;
    const password = document.getElementById('signUpPassword').value;
    const passwordConfirm = document.getElementById('signUpPasswordConfirm')
      .value;

    await signUp({ name, email, role, faculty, password, passwordConfirm });

    document.querySelector('.btn--signUp').textContent = 'Sign Up';
  });
}
