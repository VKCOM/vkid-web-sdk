import { DemoStore } from '#demo/types';
import { createCommunitySubscription } from '#demo/utils/createModule';

export const initCommunitySubscription = (demoStore: DemoStore) => {
  let alreadyInsertedToDocument = !demoStore.enable_oauthList;
  return () => {
    const html = `<!-- СommunitySubscription  -->
<section class="communitySubscription">
  <h1>OAuth List</h1>
  <div id="communitySubscription"></div>
</section>
`;
    !alreadyInsertedToDocument && document.querySelector('.VkIdWebSdk__content')?.insertAdjacentHTML('beforeend', html);
    alreadyInsertedToDocument = true;
    return createCommunitySubscription(demoStore);
  };
};
