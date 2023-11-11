import {getResource} from '../services/services';

function cards() {
  // Cards
  class Card {
    constructor(image, heading, descr, price, parentSelector, ...classes) {
      this.image = image;
      this.heading = heading;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 31;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length == 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => {
          element.classList.add(className);
        });
      }
      element.innerHTML = `
        <img src="${this.image}" alt="vegy">
        <h3 class="menu__item-subtitle">${this.heading}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  //с использованием классов то есть шаблонизации
  getResource(' http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, title, descr, price}) => {
      new Card(img, title, descr, price, '.menu .container').render();
    });
  });
}

export default cards;