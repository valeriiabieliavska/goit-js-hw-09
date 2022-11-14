import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  });
}


form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  let timeDelay = Number(delay.value);
  let timeStep = Number(step.value);
  let valueAmount = Number(amount.value);
  for (i = 1; i <= valueAmount; i += 1) {
createPromise(i, timeDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    timeDelay += timeStep;
  }
}









// resolve(value) - функція для виклику у разі успішної операції. 
// Переданий їй аргумент буде значенням виконаного промісу.
//   reject(error) - функція для виклику у разі помилки. 
// Переданий їй аргумент буде значенням відхиленого промісу.

//  в методі then() обробляють тільки успішне виконання промісу,
//   а помилку його виконання у спеціальному методі catch () для «відловлювання» помилок.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });


// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів,
//   скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position),
//   що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

//   Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється 
//   через delay часу.Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay
//    зі значеннями однойменних параметрів. 
//   Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// Notiflix.Notify.success - успех
// Notiflix.Notify.failure - неудача
// Первая задержка
// Шаг задержки
// Количество