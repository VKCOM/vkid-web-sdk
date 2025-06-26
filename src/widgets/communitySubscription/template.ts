export const getCommunitySubscriptionTemplate = () => (id: string) => {
  return `
<div id="${id}" data-test-id="communitySubscription">
  <style>
    #${id} iframe {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      border: none;
      color-scheme: auto;
    }
      #${id}[data-state=loaded] iframe {
      position: fixed;
      opacity: 100;
      pointer-events: all;
      z-index: 99999;
    }
  </style>
  <iframe width="100%" height="100%" />
</div>`;
};

