import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

let lockCount = 0;

export default (context, inject) => {
  inject('bodyLock', {
    lock(target, disablePadding = false) {
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;
      const needGap = document.querySelectorAll('[body-scroll-lock-gap]');

      if (lockCount === 0 && !disablePadding) {
        needGap.forEach((el) => {
          el.style.paddingRight = `${scrollBarWidth}px`;
        });
      }

      disableBodyScroll(target, {
        reserveScrollBarGap: true,
        allowTouchMove: (el) => {
          while (el && el !== document.body) {
            if (el.getAttribute('body-scroll-lock-ignore') !== null) {
              return true;
            }

            el = el.parentElement;
          }
          return false;
        },
      });

      lockCount++;
    },
    unlock(target) {
      const needGap = document.querySelectorAll('[body-scroll-lock-gap]');

      if (lockCount === 1) {
        needGap.forEach((el) => {
          el.style.paddingRight = null;
        });
      }

      enableBodyScroll(target);

      if (lockCount > 0) lockCount--;
    },
    unlockAll() {
      clearAllBodyScrollLocks();
    },
  });
};
