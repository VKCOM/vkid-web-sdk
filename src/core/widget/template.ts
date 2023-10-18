export const getWidgetTemplate = (id: string) => {
  return `
<div id="${id}" data-test-id="widget">
  <style>
    #${id} {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }

    #${id} iframe {
      border: none;
      color-scheme: auto;
    }

    #${id} .loader,
    #${id} .error {
      display: none;
      width: 100%;
      height: 100%;
      text-align: center;
    }
  </style>
  <div class="loader"></div>
  <div class="error"></div>
  <iframe width="100%" height="100%"></iframe>
</div>
  `;
};
