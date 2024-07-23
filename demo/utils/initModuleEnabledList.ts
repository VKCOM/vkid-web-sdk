const enabledModulesOptions = [
  { value: 'enable_basicAuth', text: 'Basic Auth' },
  { value: 'enable_oneTap', text: 'OneTap Button' },
  { value: 'enable_floatingOneTap', text: 'Floating OneTap' },
  { value: 'enable_oauthList', text: 'OauthList' },
];

export const initModuleEnabledList = (store: Record<string, any>) => {
  const html = `<details>
  <summary>Включение модулей</summary>
  <div class="enableModule">
    ${enabledModulesOptions.map(({ text, value }) => `<label for="${value}">
        <input ${store[value] ? 'checked' : ''} type="checkbox" name="${value}" id="${value}">${text}</label><br />`).join('')}
  </div>
  <button onclick="window.location.reload()">Применить</button>
</details>`;
  document.querySelector('.VkIdWebSdk_controls')?.insertAdjacentHTML('beforeend', html);
};
