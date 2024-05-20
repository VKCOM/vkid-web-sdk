import { debounce } from '@vkontakte/vkjs';
import ResizeObserver from 'resize-observer-polyfill';

import { WidgetParams } from '#/core/widget';
import { Languages } from '#/types';
import { getButtonFontSize, getButtonLogoSize, getButtonPadding } from '#/utils/styles';
import { OAuthListParams, OAuthName } from '#/widgets/oauthList';
import { longLang, providerLang, shortLang } from '#/widgets/oneTap/lang';

import { OneTapStatsButtonType } from './analytics';
import { OneTapParams, OneTapStyles } from './types';

type OneTapTemplateParams = Required<OneTapStyles> & Pick<OneTapParams, 'skin'> & Pick<WidgetParams, 'scheme' | 'lang'> & {
  login?: VoidFunction;
  iframeHeight?: number;
  renderOAuthList: (params: OAuthListParams) => void;
  providers?: OAuthName[];
  setStatsButtonType: (type: OneTapStatsButtonType) => void;
};

const logoSvg = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="logoBg" fill-rule="evenodd" clip-rule="evenodd" d="M4.2653 4.2653C3 5.5306 3 7.56707 3 11.64V12.36C3 16.4329 3 18.4694 4.2653 19.7347C5.5306 21 7.56706 21 11.64 21H12.36C16.4329 21 18.4694 21 19.7347 19.7347C21 18.4694 21 16.4329 21 12.36V11.64C21 7.56707 21 5.5306 19.7347 4.2653C18.4694 3 16.4329 3 12.36 3H11.64C7.56706 3 5.5306 3 4.2653 4.2653Z" fill="white"/>
    <path id="logoIcon" d="M12.6095 16C8.55576 16 6.09636 13.1823 6 8.5H8.05309C8.1171 11.9395 9.67903 13.397 10.8764 13.6967V8.5H12.8439V11.4683C13.9988 11.3401 15.2076 9.98991 15.614 8.5H17.5505C17.2406 10.3321 15.9246 11.6823 14.9948 12.2392C15.9253 12.6895 17.4225 13.8682 18 16H15.8714C15.4219 14.5749 14.321 13.4712 12.8446 13.3213V16H12.6095Z" fill="#0077FF"/>
  </svg>
`;

const spinnerSvg = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>
  </svg>
`;

export const getOneTapTemplate = ({
  width,
  height,
  iframeHeight,
  borderRadius,
  login,
  skin,
  scheme,
  lang = Languages.RUS,
  renderOAuthList,
  providers,
  setStatsButtonType,
}: OneTapTemplateParams) => (id: string) => {
  let textIconLimit = 0;
  let textLongLimit = 0;
  let textShortWidth = 0;
  let textLongWidth = 0;
  const initialText = shortLang[lang];
  const shortText = providerLang;
  const longText = longLang[lang];
  const textPadding = 8;
  const padding = getButtonPadding(height);
  const fontSize = getButtonFontSize(height);
  const logoSize = getButtonLogoSize(height);

  const containerEl = document.createElement('div');

  const buttonEl = document.createElement('button');
  setTimeout(() => {
    buttonEl.classList.add(`VkIdWebSdk__button_animation_${id}`);
  }, 100);
  buttonEl.classList.add(`VkIdWebSdk__button_${id}`);
  buttonEl.classList.add(`VkIdWebSdk__button_reset_${id}`);
  login && (buttonEl.onclick = login);

  const btnInEl = document.createElement('span');
  btnInEl.classList.add(`VkIdWebSdk__button_in_${id}`);

  const contentEl = document.createElement('span');
  contentEl.classList.add(`VkIdWebSdk__button_content_${id}`);

  const logoEl = document.createElement('span');
  logoEl.classList.add(`VkIdWebSdk__button_logo_${id}`);
  logoEl.innerHTML = logoSvg;

  const textContainerEl = document.createElement('span');
  textContainerEl.classList.add(`VkIdWebSdk__button_text_${id}`);

  const textEl = document.createElement('span');
  textEl.innerText = initialText;

  const textLongEl = document.createElement('span');
  textLongEl.innerText = longText;

  const textShortEl = document.createElement('span');
  textShortEl.innerText = shortText;

  const spinnerEl = document.createElement('span');
  spinnerEl.classList.add(`VkIdWebSdk__button_spinner_${id}`);
  spinnerEl.innerHTML = spinnerSvg;

  const oauthListEl = document.createElement('div');
  oauthListEl.classList.add(`VkIdWebSdk__oauthList_container_${id}`);

  const getTextWidth = (clientWidth: number) => {
    return clientWidth + 2 * textPadding + 2 * padding + 2 * logoSize;
  };

  const handleLoaded = () => {
    let ANIMATION_TIMEOUT = 0;
    const observeCallback = () => {
      const hasTextContainer = contentEl.contains(textContainerEl);
      const hasShortText = textContainerEl.contains(textShortEl);
      const hasLongText = textContainerEl.contains(textLongEl);
      const containerWidth = containerEl.clientWidth;

      if (hasTextContainer && containerWidth < textIconLimit) {
        setStatsButtonType('icon');
        buttonEl.setAttribute('style', `width: ${height}px;`);
        textContainerEl.remove();
        spinnerEl.remove();
      }

      if (!hasTextContainer && containerWidth >= textIconLimit) {
        buttonEl.removeAttribute('style');
        contentEl.appendChild(textContainerEl);
        contentEl.appendChild(spinnerEl);
      }

      if (!hasShortText && containerWidth < textLongLimit) {
        textContainerEl.style.width = `${textShortWidth}px`;
        textLongEl.dataset.active = '';
        textShortEl.dataset.active = 'true';
        setTimeout(() => {
          // Дожидаемся анимации и меняем элементы
          textLongEl.remove();
          textContainerEl.appendChild(textShortEl);
        }, ANIMATION_TIMEOUT);
      }

      if (!hasLongText && containerWidth >= textLongLimit) {
        textContainerEl.style.width = `${textLongWidth}px`;
        textShortEl.dataset.active = '';
        textLongEl.dataset.active = 'true';
        setTimeout(() => {
          // Дожидаемся анимации и меняем элементы
          textShortEl.remove();
          textContainerEl.appendChild(textLongEl);
        }, ANIMATION_TIMEOUT);
      }

      setStatsButtonType('default');
    };
    const observer = new ResizeObserver(debounce(observeCallback, 500));
    observer.observe(containerEl);

    const oneTap = document.getElementById(id);
    if (oneTap) {
      oneTap.appendChild(containerEl);
      containerEl.appendChild(buttonEl);

      if (providers?.length) {
        containerEl.appendChild(oauthListEl);
        renderOAuthList({
          lang,
          scheme,
          container: oauthListEl,
          oauthList: providers,
          styles: {
            borderRadius,
            height,
          },
        });
      }
      buttonEl.appendChild(btnInEl);
      btnInEl.appendChild(contentEl);
      contentEl.appendChild(logoEl);
      contentEl.appendChild(textContainerEl);
      contentEl.appendChild(spinnerEl);
      textContainerEl.appendChild(textEl);
      textContainerEl.appendChild(textLongEl);
      textContainerEl.appendChild(textShortEl);

      textShortWidth = textShortEl.clientWidth;
      textLongWidth = textLongEl.clientWidth;
      textIconLimit = getTextWidth(textEl.clientWidth);
      textLongLimit = getTextWidth(textLongWidth);
      textEl.remove();
      textLongEl.remove();
      textShortEl.remove();
      observeCallback();
      ANIMATION_TIMEOUT = 250;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleLoaded);
  } else {
    setTimeout(handleLoaded, 0);
  }

  return `
<div id="${id}" data-test-id="oneTap" data-scheme="${scheme}" data-skin="${skin}">
  <style>
    :root #${id} {
      --onetap--button_background: #0077FF;
      --onetap--button_border: none;
      --onetap--background_hover: #0071F2;
      --onetap--text_and_spinner: #FFF;
      --onetap--logo_icon: #0077FF;
      --onetap--logo_background: #FFF;
    }

    :root #${id}[data-scheme=light][data-skin=primary] {
      --onetap--background_hover: #0071F2;
      --onetap--background_active: #0069E1;
    }

    :root #${id}[data-scheme=dark][data-skin=primary] {
      --onetap--background_hover: #097EFF;
      --onetap--background_active: #1385FF;
    }

    :root #${id}[data-scheme=light][data-skin=secondary] {
      --onetap--button_background: rgba(255, 255, 255, 0.12);
      --onetap--button_border: 1px solid rgba(0, 0, 0, 0.12);
      --onetap--background_hover: #F5F5F7;
      --onetap--background_active: #EBECEF;
      --onetap--text_and_spinner: #000;
      --onetap--logo_icon: #FFF;
      --onetap--logo_background: #0077FF;
    }

    :root #${id}[data-scheme=dark][data-skin=secondary] {
      --onetap--button_background: transparent;
      --onetap--button_border: 1px solid rgba(255, 255, 255, 0.12);
      --onetap--background_hover: rgba(255, 255, 255, 0.06);
      --onetap--background_active: rgba(255, 255, 255, 0.1);
      --onetap--logo_icon: #FFF;
      --onetap--logo_background: #0077FF;
    }

    #${id} {
      position: relative;
      width: ${width ? `${width}px` : '100%'};
      min-width: ${height}px;
    }

    #${id}[data-state=loaded] {
      height: ${iframeHeight}px;
    }

    #${id} iframe {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      border: none;
      color-scheme: auto;
    }

    #${id} .VkIdWebSdk__button_reset_${id} {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;
    }

    #${id} .VkIdWebSdk__button_${id} {
      padding: ${padding}px;
      height: ${height}px;
      width: 100%;
      border-radius: ${borderRadius}px;
      box-sizing: border-box;
      overflow: hidden;
    }

    #${id} .VkIdWebSdk__button_animation_${id} {
      transition: .2s ease;
    }

    #${id} .VkIdWebSdk__button_${id}:hover {
      cursor: pointer;
    }

    #${id} .VkIdWebSdk__button_${id} {
      background: var(--onetap--button_background);
      border: var(--onetap--button_border);
    }

    #${id} .VkIdWebSdk__button_${id}:focus,
    #${id} .VkIdWebSdk__button_${id}:hover {
      background: var(--onetap--background_hover);
    }

    #${id} .VkIdWebSdk__button_${id}:active {
      background: var(--onetap--background_active);
    }

    #${id} .VkIdWebSdk__button_in_${id} {
      display: inline-block;
      width: 100%;
      height: 100%;
      min-width: max-content;
      transition: width 0.5s;
    }

    #${id} .VkIdWebSdk__button_content_${id} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    #${id} .VkIdWebSdk__button_logo_${id},
    #${id} .VkIdWebSdk__button_spinner_${id},
    #${id} .VkIdWebSdk__button_logo_${id} > svg,
    #${id} .VkIdWebSdk__button_spinner_${id} > svg {
      width: ${logoSize}px;
      height: ${logoSize}px;
    }

    #${id} .VkIdWebSdk__button_spinner_${id} > svg {
      position: absolute;
      right: ${padding}px;
      animation: vkIdSdkButtonSpinner 0.7s linear infinite;
    }

    #${id} .VkIdWebSdk__button_text_${id} {
      font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
      font-weight: 500;
      font-size: ${fontSize}px;
      transition: .2s;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    #${id} .VkIdWebSdk__button_text_${id} > span {
      opacity: 0;
      display: inline-block;
      padding: 0 ${textPadding}px;
      transition: .5s;
    }

    #${id} .VkIdWebSdk__button_text_${id} > span[data-active=true] {
      opacity: 1;
    }

    #${id} .VkIdWebSdk__button_text_${id},
    #${id} .VkIdWebSdk__button_spinner_${id} {
      color: var(--onetap--text_and_spinner);
    }

    .VkIdWebSdk__oauthList_container_${id} {
      margin-top: 16px;
    }

    #${id} #logoBg {
      fill: var(--onetap--logo_background);
    }

    #${id} #logoIcon {
      fill: var(--onetap--logo_icon);
    }

    #${id}[data-state=not_loaded] .VkIdWebSdk__button_in_${id} {
      width: 0;
    }

    #${id}[data-state=not_loaded] .VkIdWebSdk__button_spinner_${id} {
      transition: .2s;
      opacity: 0;
      pointer-events: none;
      width: 0;
    }

    #${id}[data-state=loaded] .VkIdWebSdk__oauthList_container_${id} {
      display: none;
    }

    #${id}[data-state=loaded] iframe {
      position: initial;
      opacity: 100;
      pointer-events: all;
    }

    #${id}[data-state=loaded] .VkIdWebSdk__button_${id} {
      display: none;
    }

    @keyframes vkIdSdkButtonSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <iframe width="100%" height="100%" />
</div>
  `;
};
