import { DemoStore } from '#demo/types';
import { createOneTap } from '#demo/utils/createModule';

export const initOneTap = (demoStore: DemoStore) => {
  let alreadyInsertedToDocument = !demoStore.enable_oneTap;
  return () => {
    const html = `<!-- OneTap  -->
<section class="oneTap">
  <h1>OneTap Button</h1>
  <div id="oneTap"></div>
</section>
`;
    !alreadyInsertedToDocument && document.querySelector('.VkIdWebSdk__content')?.insertAdjacentHTML('beforeend', html);
    alreadyInsertedToDocument = true;
    return createOneTap(demoStore);
  };
};
