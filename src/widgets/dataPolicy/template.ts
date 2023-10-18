export const getDataPolicyTemplate = (id: string) => {
  return `
<div id="${id}" data-test-id="data-policy">
  <style>
    #${id} {
      position: fixed;
      top: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      z-index: 999;
    }

    #${id} iframe {
      border: none;
      color-scheme: auto;
    }
  </style>
  <iframe width="100%" height="100%" />
</div>
  `;
};
