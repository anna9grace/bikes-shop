'use strict';

(function () {
  const menu = document.querySelector(`.main-nav`);
  const menuToggle = document.querySelector(`.page-header__menu`);
  const logo = document.querySelector(`.page-header__logo a`);
  const smallScreen = window.matchMedia(`(max-width: 1023px)`);
  const mobile = window.matchMedia(`(max-width: 767px)`);
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
    if (isMenuOpened && mobile.matches) {
      logo.classList.add(`visually-hidden`);
    } else {
      logo.classList.remove(`visually-hidden`);
    }
  };

  if (logo) {
    changeLogoVisibility();
    mobile.addEventListener(`change`, () => {
      changeLogoVisibility();
    });
  }


  const changeMenuOpenState = () => {
    menu.classList.toggle(`hidden`);
    menuToggle.classList.toggle(`page-header__menu--open`);
    menuToggle.classList.toggle(`page-header__menu--close`);
    isMenuOpened = menuToggle.classList.contains(`page-header__menu--close`) ? true : false;

    if (logo) {
      changeLogoVisibility();
    }
  };

  menuToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    changeMenuOpenState();
  }
  );

  menu.addEventListener(`click`, (evt) => {
    if (evt.target.tagName !== `A`) {
      return;
    }
    changeMenuOpenState();
  });
})();
