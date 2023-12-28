'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import "flatpickr/dist/themes/material_green.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (options.defaultDate > selectedDates[0]) {
          iziToast.error({
              title: 'Error',
              message: 'Please choose a date in the future',
              position: 'topRight',
              color: '#EF4040',
              messageColor: '#FFF',
              titleColor: '#FFF',
              theme: 'dark',
              progressBarColor: '#B51B1B',
    
          });
          btnStart.disabled = true;
      } else {
          btnStart.disabled = false;
          userSelectedDate = selectedDates[0];
    }
  },
};

const datePicker = flatpickr(input, options);

input.addEventListener('focus', () => {
    datePicker.config.defaultDate = new Date();
});

btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
    const timer = setInterval(() => {
        const selectedDateTime = userSelectedDate.getTime();
        const currentDateTime = new Date().getTime();
        const difference = selectedDateTime - currentDateTime - 1000;
        const res = convertMs(difference);

        const { days, hours, minutes, seconds } = res;

        timerDays.textContent = pad(days);
        timerHours.textContent = pad(hours);
        timerMinutes.textContent = pad(minutes);
        timerSeconds.textContent = pad(seconds);

        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}


function pad(value) {
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}









