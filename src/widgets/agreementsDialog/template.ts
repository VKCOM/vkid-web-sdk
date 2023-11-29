export const getAgreementsDialogTemplate = (id: string) => {
  return `
<div id="${id}" data-test-id="agreements-dialog">
  <style>
    #${id} {
      position: fixed;
      top: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      z-index: 999999;
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
