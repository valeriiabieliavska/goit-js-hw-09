import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const text = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const body = document.querySelector('body');
body.style.backgroundColor = 'pink';

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const dateTimePicker = flatpickr(text, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn(event) {
  const timer = setInterval(() => {
    const countdown = dateTimePicker.selectedDates[0].getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(countdown);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
    if (countdown < 1000) {
      clearInterval(timer);
    }
  }, 1000);
}

// функция для подсчета значений

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// flatpickr(text, {
//     onClose (selectedDates) {
//         const time = selectedDates[0];
//         console.log(time)
//     }
//     })

// const options = {
//   enableTime: true,  - Включает выбор времени
//   time_24hr: true, - Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
//   defaultDate: new Date(), - Устанавливает начальную выбранную дату (даты).
//   minuteIncrement: 1, -  Регулирует шаг ввода минут (включая прокрутку)
//   onClose(selectedDates) {
//     console.log(selectedDates[0]); -// Функция(и) для запуска при каждом закрытии календаря.
//   },
// };
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати.
// ДДля відображення повідомлень користувачеві, замість window.alert(), використана бібліотека notiflix.
// Метод getTime() возвращает числовое значение, соответствующее указанной дате по всемирному координированному времени.
// Date.now() метод об'єкту Date який повертає кількість мілісекунд які пройшли з 01.01.1970 до поточного часу.
// Failure-Отказ
// function addLeadingZero(value) -перед рендерингом інтефрейсу форматує значення.
// clearInterval - cтоп интервал/очистить/сбросить
// 1000= 1'
// dateTimePicker.selectedDates[0].getTime() - Date.now(); - для обратного отсчета времени
