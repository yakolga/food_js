function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  const slides = document.querySelectorAll(slide),
  slider = document.querySelector(container),
  buttonNext = document.querySelector(nextArrow),
  buttonPrev = document.querySelector(prevArrow),
  current = document.querySelector(currentCounter),
  total = document.querySelector(totalCounter),
  slidesWrapper = document.querySelector(wrapper),
  slidesField = document.querySelector(field),
  width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  function showDots() {
    dots.forEach((dot) => {
      dot.style.opacity = '0.5';
      dots[slideIndex - 1].style.opacity = '1';
    })
  }

  function showNextDigits() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function makeNumber(str) {
    return +str.replace(/\D/g, "");
  }

  buttonNext.addEventListener('click', () => {
    if (offset == parseInt(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseInt(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    showNextDigits();

    showDots();
  });

  buttonPrev.addEventListener('click', () => {
    if (offset == 0) {
      offset = parseInt(width) * (slides.length - 1);
    } else {
      offset -= parseInt(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    showNextDigits();
  });

  //navigation

  const dotsWrapper = document.createElement('div');
  dotsWrapper.classList.add('carousel-indicators');
  const dots = [];

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.setAttribute('data-id', `${i + 1}`);
    dot.classList.add('dot');
    dotsWrapper.append(dot);
    dots.push(dot);
    if (i == 0) {
      dot.style.opacity = '1';
    }
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-id');

      slideIndex = slideTo;
      offset = parseInt(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      showNextDigits();

      showDots();
    });
  });

  slider.prepend(dotsWrapper);
}

export default slider;