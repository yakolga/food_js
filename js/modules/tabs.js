function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  //Na początku ukrywamy wszystkie taby na stronie
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide', 'fade');
      item.classList.remove('show');
    });

    tabs.forEach(tab => {
      tab.classList.remove(activeClass);
    });
  }

  // Pokazujemy pierwsy tab na stronie
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  //Dodajemy click na elemencie który sprawdza czy click właściwie odbył się na nagłówku.
  //Dalej sprawdzamy czy element na którym odbył się klik równa się elementu w objekcie, jeśli tak to wywołujemy te funkcję.
  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;