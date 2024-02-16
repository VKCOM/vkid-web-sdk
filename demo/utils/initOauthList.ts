import { DemoStore } from '#demo/types';
import { createOAuthList } from '#demo/utils/createModule';

export const initOauthList = (demoStore: DemoStore) => {
  let alreadyInsertedToDocument = !demoStore.enable_oauthList;
  return () => {
    const html = `<!-- OAuthList  -->
<section class="oauthList">
  <h1>OAuth List</h1>
  <div id="oauthList"></div>
</section>
`;
    !alreadyInsertedToDocument && document.querySelector('.VkIdWebSdk__content')?.insertAdjacentHTML('beforeend', html);
    alreadyInsertedToDocument = true;
    return createOAuthList(demoStore);
  };
};
