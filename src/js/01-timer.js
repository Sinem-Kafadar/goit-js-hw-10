import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';


const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const dateInput = document.querySelector('#datetime-picker');
document.getElementById('back').addEventListener('click', function () {
    window.history.back();
});

let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now= new Date();

    if (selectedDate <= new Date()) {
      alert('Lütfen gelecekte bir tarih seçin');
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const difference = selectedDate - currentTime;

    if (difference <= 0) {
      clearInterval(timerId);

      updateTimer({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      return;
    }

    const time = convertMs(difference);

    updateTimer(time);
  }, 1000);
});

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
