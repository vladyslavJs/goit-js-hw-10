import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDelay = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', promiseGeneration);

function promiseGeneration(event) {
    event.preventDefault();

    const delay = form.delay.value;
    const userChoise = form.state.value;

    const createPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userChoise === 'fulfilled') {
                resolve(delay);
            } else if (userChoise === 'rejected') {
                reject(delay);
            }
        }, delay);
    });

    createPromise
        .then(delay =>
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                color: '#B5EA7C',
                messageColor: '#FFF',
                titleColor: '#FFF',
                theme: 'dark',
                progressBarColor: '#326101',
            })
        )
        .catch(delay =>
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                color: '#EF4040',
                messageColor: '#FFF',
                titleColor: '#FFF',
                theme: 'dark',
                progressBarColor: '#B51B1B',
            })
    );
    inputDelay.value = '';
}