import { DemoStore } from '#demo/types';
import { createFloatingOneTap } from '#demo/utils/createModule';

export const initFloatingOneTap = (demoStore: DemoStore) => {
  let alreadyInsertedToDocument = !demoStore.enable_floatingOneTap;
  return () => {
    const htmlSeparator = (className: string) => `<div class="VkIdWebSdk__floating_separator ${className}">
  <svg width="168" height="80" viewBox="0 0 168 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M111.84 64H105.248V18.88H111.84V64ZM122.053 64V18.88H138.821C143.344 18.88 147.376 19.84 150.917 21.76C154.458 23.68 157.21 26.3467 159.173 29.76C161.178 33.1733 162.181 37.056 162.181 41.408C162.181 45.76 161.178 49.664 159.173 53.12C157.21 56.5333 154.458 59.2 150.917 61.12C147.376 63.04 143.344 64 138.821 64H122.053ZM138.821 57.92C142.064 57.92 144.922 57.2373 147.397 55.872C149.914 54.464 151.856 52.5227 153.221 50.048C154.629 47.5307 155.333 44.6507 155.333 41.408C155.333 38.208 154.629 35.3707 153.221 32.896C151.856 30.3787 149.914 28.4373 147.397 27.072C144.922 25.664 142.064 24.96 138.821 24.96H128.645V57.92H138.821Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.62355 5.62355C0 11.2471 0 20.2981 0 38.4V41.6C0 59.7019 0 68.7529 5.62355 74.3765C11.2471 80 20.2981 80 38.4 80H41.6C59.7019 80 68.7529 80 74.3765 74.3765C80 68.7529 80 59.7019 80 41.6V38.4C80 20.2981 80 11.2471 74.3765 5.62355C68.7529 0 59.7019 0 41.6 0H38.4C20.2981 0 11.2471 0 5.62355 5.62355ZM13.5001 24.3335C13.9335 45.1335 24.3334 57.6335 42.5667 57.6335H43.6002V45.7334C50.3002 46.4001 55.3665 51.3001 57.3999 57.6335H66.8668C64.2668 48.1668 57.4331 42.9334 53.1665 40.9334C57.4331 38.4668 63.4332 32.4668 64.8665 24.3335H56.2662C54.3996 30.9335 48.8669 36.9334 43.6002 37.5001V24.3335H35V47.4001C29.6666 46.0668 22.9334 39.6002 22.6334 24.3335H13.5001Z" fill="white"/>
  </svg>
<div>`;
    !alreadyInsertedToDocument && document.querySelector('.VkIdWebSdk__content')?.insertAdjacentHTML('afterbegin', htmlSeparator('top'));
    !alreadyInsertedToDocument && document.querySelector('#demo')?.insertAdjacentHTML('afterbegin', htmlSeparator('bottom'));
    alreadyInsertedToDocument = true;
    return createFloatingOneTap(demoStore);
  };
};
