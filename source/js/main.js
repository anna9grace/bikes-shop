'use strict';

(function () {
  const page = document.querySelector(`.page`);
  const menu = page.querySelector(`.main-nav`);
  const menuToggle = page.querySelector(`.page-header__menu`);
  const logo = page.querySelector(`.page-header__logo`);
  const smallScreen = window.matchMedia(`(max-width: 1023px)`);
  const mobileScreen = window.matchMedia(`(max-width: 767px)`);
  let isMenuOpened = false;

  if (!menu || !menuToggle) {
    return;
  }

  const renderMobileMenu = () => {
    menuToggle.classList.remove(`hidden`);
    menu.classList.add(`mobile-menu`);
    menu.classList.add(`hidden`);
  };

  const renderDesktopMenu = () => {
    menuToggle.classList.add(`hidden`);
    menu.classList.remove(`mobile-menu`);
    menu.classList.remove(`hidden`);
  };

  const onWindowWidthChange = (evt) => {
    if (evt.matches) {
      renderMobileMenu();
      if (menuToggle.classList.contains(`page-header__menu--close`)) {
        menu.classList.remove(`hidden`);
      }
    } else {
      renderDesktopMenu();
    }
  };

  if (smallScreen.matches) {
    renderMobileMenu();
  }
  smallScreen.addEventListener(`change`, onWindowWidthChange);


  const changeLogoVisibility = () => {
    if (logo) {
      if (isMenuOpened && mobileScreen.matches) {
        logo.classList.add(`page-header__logo--hidden`);
      } else {
        logo.classList.remove(`page-header__logo--hidden`);
      }
    }
  };

  const changePageState = () => {
    if (isMenuOpened && mobileScreen.matches) {
      page.classList.add(`page--inactive`);
    } else {
      page.classList.remove(`page--inactive`);
    }
  };

  changeLogoVisibility();
  mobileScreen.addEventListener(`change`, () => {
    changeLogoVisibility();
    changePageState();
  });

  const changeMenuOpenState = () => {
    if (!menu.classList.contains(`mobile-menu`)) {
      return;
    }
    menu.classList.toggle(`hidden`);
    menuToggle.classList.toggle(`page-header__menu--open`);
    menuToggle.classList.toggle(`page-header__menu--close`);
    isMenuOpened = menuToggle.classList.contains(`page-header__menu--close`) ? true : false;
    changeLogoVisibility();
    changePageState();
  };

  menuToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    changeMenuOpenState();
  });

  menu.addEventListener(`click`, (evt) => {
    if (evt.target.tagName !== `A`) {
      return;
    }
    changeMenuOpenState();
  });
})();
