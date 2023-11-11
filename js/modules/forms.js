import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/spinner.svg",
    success: "Thank you, we will contact you",
    failure: "Smth went wrong"
  };

  //перебераем обьект и для каждой формы вызываем функцию
  forms.forEach(form => {
    bindPostData(form);
  });

  // создаем функцию по отправке формы внутри которой попадает форма
  function bindPostData(form) {

    //Вешаем обработчик сабмит
    form.addEventListener('submit', (e) => {
      // отменяем стандартное поведение
      e.preventDefault();

      //созадем элемент в который попадает статус сервера
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const object = {};

      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    })
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  };

  fetch(' http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

export default forms;