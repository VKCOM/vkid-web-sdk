import { WidgetParams } from '#/core/widget';
import { getTitleLang, getButtonLang, getDescriptionLang } from '#/widgets/floatingOneTap/langs';
import { FloatingOneTapParams } from '#/widgets/floatingOneTap/types';
import { OAuthListParams, OAuthName } from '#/widgets/oauthList';

type FloatingOneTapTemplateParams = Required<
Pick<FloatingOneTapParams, 'indent' | 'contentId' | 'appName'> &
Pick<WidgetParams, 'scheme' | 'lang'>
> & {
  openFullAuth?: VoidFunction;
  close?: VoidFunction;
  renderOAuthList: (params: OAuthListParams) => void;
  providers?: OAuthName[];
};

const logoVkIdSvg = `
  <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 13H21.6479V3.5H20V13Z" fill="var(--floating--color_text_primary)"/>
    <path d="M23.7801 13H27.474C30.4127 13 32.5 11.0326 32.5 8.24326C32.5 5.46738 30.4127 3.5 27.474 3.5H23.7801V13ZM25.4279 11.5177V4.98227H27.474C29.4377 4.98227 30.7835 6.31631 30.7835 8.24326C30.7835 10.1837 29.4377 11.5177 27.474 11.5177H25.4279Z" fill="var(--floating--color_text_primary)"/>
    <path d="M0 7.68C0 4.05961 0 2.24942 1.12471 1.12471C2.24942 0 4.05961 0 7.68 0H8.32C11.9404 0 13.7506 0 14.8753 1.12471C16 2.24942 16 4.05961 16 7.68V8.32C16 11.9404 16 13.7506 14.8753 14.8753C13.7506 16 11.9404 16 8.32 16H7.68C4.05961 16 2.24942 16 1.12471 14.8753C0 13.7506 0 11.9404 0 8.32V7.68Z" fill="#0077FF"/>
    <path d="M8.56331 11.66C4.91665 11.66 2.83667 9.16 2.75 5H4.57666C4.63666 8.05333 5.9833 9.34333 7.04997 9.61V5H8.77002V7.63C9.82335 7.51667 10.9299 6.32 11.3032 5H13.0233C12.7366 6.62667 11.5366 7.82667 10.6833 8.32C11.5366 8.72 12.9033 9.76667 13.4233 11.66H11.5299C11.1233 10.3933 10.11 9.41333 8.77002 9.28V11.66H8.56331Z" fill="white"/>
  </svg>
`;

const logoVkSvg = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2653 4.2653C3 5.5306 3 7.56707 3 11.64V12.36C3 16.4329 3 18.4694 4.2653 19.7347C5.5306 21 7.56706 21 11.64 21H12.36C16.4329 21 18.4694 21 19.7347 19.7347C21 18.4694 21 16.4329 21 12.36V11.64C21 7.56707 21 5.5306 19.7347 4.2653C18.4694 3 16.4329 3 12.36 3H11.64C7.56706 3 5.5306 3 4.2653 4.2653Z" fill="white"/>
    <path d="M12.6095 16C8.55576 16 6.09636 13.1823 6 8.5H8.05309C8.1171 11.9395 9.67903 13.397 10.8764 13.6967V8.5H12.8439V11.4683C13.9988 11.3401 15.2076 9.98991 15.614 8.5H17.5505C17.2406 10.3321 15.9246 11.6823 14.9948 12.2392C15.9253 12.6895 17.4225 13.8682 18 16H15.8714C15.4219 14.5749 14.321 13.4712 12.8446 13.3213V16H12.6095Z" fill="#0077FF"/>
  </svg>
`;

const closeSvg = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.71967 4.71969C5.01256 4.42679 5.48744 4.42679 5.78033 4.71969L10 8.93935L14.2197 4.71969C14.5126 4.42679 14.9874 4.42679 15.2803 4.71969C15.5732 5.01258 15.5732 5.48745 15.2803 5.78035L11.0607 10L15.2803 14.2197C15.5732 14.5126 15.5732 14.9875 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L10 11.0607L5.78033 15.2803C5.48744 15.5732 5.01256 15.5732 4.71967 15.2803C4.42678 14.9875 4.42678 14.5126 4.71967 14.2197L8.93934 10L4.71967 5.78035C4.42678 5.48745 4.42678 5.01258 4.71967 4.71969Z" fill="currentColor"/>
  </svg>
`;

const spinnerSvg = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>
  </svg>
`;

const INTERNAL_INDENT = 12;
const getIndent = (value?: number) => {
  if (!value || value <= INTERNAL_INDENT) {
    return 0;
  }

  return value - INTERNAL_INDENT;
};

export const getFloatingOneTapTemplate = ({
  scheme,
  indent,
  openFullAuth,
  close,
  lang,
  contentId,
  appName,
  providers,
  renderOAuthList,
}: FloatingOneTapTemplateParams) => (id: string) => {
  const titleText = getTitleLang(contentId, lang, appName);
  const descriptionText = getDescriptionLang(lang);
  const buttonText = getButtonLang(contentId, lang);

  const floatingEl = document.createElement('div');
  floatingEl.classList.add(`VkIdWebSdk__floating_${id}`);

  const containerEl = document.createElement('div');
  containerEl.classList.add(`VkIdWebSdk__floating_container_${id}`);

  const headerEl = document.createElement('div');
  headerEl.classList.add(`VkIdWebSdk__floating_header_${id}`);
  headerEl.innerHTML = logoVkIdSvg;

  const headerAppNameEl = document.createElement('span');
  headerAppNameEl.classList.add(`VkIdWebSdk__floating_appName_${id}`);
  headerAppNameEl.innerText = `\u00A0·\u00A0${appName}`;

  const headerCloseEl = document.createElement('div');
  headerCloseEl.classList.add(`VkIdWebSdk__floating_close_${id}`);

  const headerCloseButtonEl = document.createElement('button');
  headerCloseButtonEl.classList.add(`VkIdWebSdk__floating_button_reset_${id}`);
  headerCloseButtonEl.classList.add(`VkIdWebSdk__floating_close_btn_${id}`);
  headerCloseButtonEl.innerHTML = closeSvg;
  close && (headerCloseButtonEl.onclick = close);

  const contentEl = document.createElement('div');
  contentEl.classList.add(`VkIdWebSdk__floating_content_${id}`);

  const titleEl = document.createElement('div');
  titleEl.classList.add(`VkIdWebSdk__floating_title_${id}`);
  titleEl.innerText = titleText;

  const descriptionEl = document.createElement('div');
  descriptionEl.classList.add(`VkIdWebSdk__floating_description_${id}`);
  descriptionEl.innerText = descriptionText;

  const actionEl = document.createElement('div');

  const buttonEl = document.createElement('button');
  buttonEl.classList.add(`VkIdWebSdk__floating_button_reset_${id}`);
  buttonEl.classList.add(`VkIdWebSdk__floating_button_${id}`);
  openFullAuth && (buttonEl.onclick = openFullAuth);

  const buttonContentEl = document.createElement('div');
  buttonContentEl.classList.add(`VkIdWebSdk__floating_button_content_${id}`);

  const buttonLogoEl = document.createElement('span');
  buttonLogoEl.classList.add(`VkIdWebSdk__floating_button_logo_${id}`);
  buttonLogoEl.innerHTML = logoVkSvg;

  const buttonTextEl = document.createElement('span');
  buttonTextEl.classList.add(`VkIdWebSdk__floating_button_text_${id}`);
  buttonTextEl.innerText = buttonText;

  const buttonSpinnerEl = document.createElement('span');
  buttonSpinnerEl.classList.add(`VkIdWebSdk__floating_button_spinner_${id}`);
  buttonSpinnerEl.innerHTML = spinnerSvg;

  const oauthListEl = document.createElement('div');
  oauthListEl.classList.add(`VkIdWebSdk__oauthList_container_${id}`);

  const handleLoaded = () => {
    const floatingOneTap = document.getElementById(id);

    if (floatingOneTap) {
      floatingOneTap.appendChild(floatingEl);
      floatingEl.appendChild(containerEl);

      containerEl.appendChild(headerEl);
      containerEl.appendChild(contentEl);
      containerEl.appendChild(actionEl);

      headerEl.appendChild(headerCloseEl);
      headerEl.appendChild(headerAppNameEl);
      headerCloseEl.appendChild(headerCloseButtonEl);

      contentEl.appendChild(titleEl);
      contentEl.appendChild(descriptionEl);

      actionEl.appendChild(buttonEl);
      buttonEl.appendChild(buttonContentEl);
      buttonContentEl.appendChild(buttonLogoEl);
      buttonContentEl.appendChild(buttonTextEl);
      buttonContentEl.appendChild(buttonSpinnerEl);
      if (providers?.length) {
        containerEl.appendChild(oauthListEl);

        renderOAuthList({
          lang,
          scheme,
          container: oauthListEl,
          oauthList: providers,
          styles: {
            borderRadius: 8,
            height: 36,
          },
        });
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleLoaded);
  } else {
    setTimeout(handleLoaded, 0);
  }

  return `
<div id="${id}" data-test-id="floatingOneTap" data-scheme="${scheme}">
  <style>
    :root #${id} {
      --floating--contaner_padding: 16px;
      --floating--container_box_shadow: 0px 0px 2px rgba(0,0,0,.08),0px 4px 16px rgba(0,0,0,.08);
      --floating--font_family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;
      --floating--close_button_color_transparent--hover: rgba(0,16,61,.04);
      --floating--close_button_color_transparent--active: rgba(0,16,61,.08);
      --floating--button_text_color: #FFFFFF;
      --floating--button_background_color: #0077ff;
    }

    :root #${id}[data-scheme=light] {
      --floating--color_background_modal: #ffffff;
      --floating--color_icon_medium: #818c99;
      --floating--color_text_primary: #000000;
      --floating--color_text_secondary: #818c99;
      --floating--button_background_color--hover: #0071F2;
      --floating--button_background_color--focus: #0071F2;
      --floating--button_background_color--active: #0069E1;
    }

    :root #${id}[data-scheme=dark] {
      --floating--color_background_modal: #2c2d2e;
      --floating--color_icon_medium: #b0b1b6;
      --floating--color_text_primary: #e1e3e6;
      --floating--color_text_secondary: #76787a;
      --floating--button_background_color--hover: #097EFF;
      --floating--button_background_color--focus: #097EFF;
      --floating--button_background_color--active: #1385FF;
      --floating--close_button_color_transparent--hover: hsla(0,0%,100%,.04);
      --floating--close_button_color_transparent--active: hsla(0,0%,100%,.08);
    }

    #${id} {
      position: fixed;
      z-index: 99999;
    }

    #${id} iframe {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      border: none;
      color-scheme: auto;
    }

    #${id} .VkIdWebSdk__floating_button_reset_${id} {
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

    #${id} .VkIdWebSdk__floating_${id} {
      padding: 12px;
    }

    #${id} .VkIdWebSdk__floating_container_${id} {
      background: var(--floating--color_background_modal);
      border-radius: 12px;
      padding: var(--floating--contaner_padding);
      box-shadow: var(--floating--container_box_shadow);
      box-sizing: border-box;
    }

    #${id} .VkIdWebSdk__floating_header_${id} {
      display: flex;
      align-items: center;
      position: relative;
      padding: 2px 0;
    }

    #${id} .VkIdWebSdk__floating_appName_${id} {
      font-family: var(--floating--font_family);
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      color: var(--floating--color_text_secondary);
    }

    #${id} .VkIdWebSdk__floating_close_${id} {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -4px;
      right: -4px;
      height: 28px;
      width: 28px;
      color: var(--floating--color_icon_medium);
    }

    #${id} .VkIdWebSdk__floating_close_btn_${id} {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .15s;
    }

    #${id} .VkIdWebSdk__floating_close_btn_${id}:hover {
      cursor: pointer;
      background: var(--floating--close_button_color_transparent--hover);
    }

    #${id} .VkIdWebSdk__floating_close_btn_${id}:active {
      background: var(--floating--close_button_color_transparent--active);
    }

    #${id} .VkIdWebSdk__floating_content_${id} {
      padding: 36px 32px;
      text-align: center;
      font-family: var(--floating--font_family);
    }

    #${id} .VkIdWebSdk__floating_title_${id} {
      color: var(--floating--color_text_primary);
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
    }

    #${id} .VkIdWebSdk__floating_description_${id} {
      color: var(--floating--color_text_secondary);
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      margin-top: 8px;
    }

    #${id} .VkIdWebSdk__floating_button_${id} {
      height: 36px;
      width: 100%;
      border-radius: 8px;
      color: var(--floating--button_text_color);
      transition: .15s;
      cursor: pointer;
      background: var(--floating--button_background_color);
    }

    #${id} .VkIdWebSdk__floating_button_${id}:hover {
      background: var(--floating--button_background_color--hover);
    }

    #${id} .VkIdWebSdk__floating_button_${id}:focus {
      background: var(--floating--button_background_color--focus);
    }

    #${id} .VkIdWebSdk__floating_button_${id}:active {
      background: var(--floating--button_background_color--active);
    }

    #${id} .VkIdWebSdk__floating_button_content_${id} {
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 0 6px;
    }

    #${id} .VkIdWebSdk__floating_button_logo_${id},
    #${id} .VkIdWebSdk__floating_button_spinner_${id} {
      display: inline-flex;
    }

    #${id} .VkIdWebSdk__floating_button_spinner_${id} {
      width: 24px;
      animation: vkIdSdkButtonSpinner 0.7s linear infinite;
    }

    #${id} .VkIdWebSdk__floating_button_text_${id} {
      font-weight: 500;
      line-height: 20px;
      font-family: var(--floating--font_family);
      font-size: 15px;
      transition: .5s;
      min-width: max-content;
      margin-left: 6px;
      text-align: center;
    }

    #${id} .VkIdWebSdk__oauthList_container_${id} {
      margin-top: 16px;
    }

    #${id}[data-state=loaded] iframe {
      position: initial;
      opacity: 100;
      pointer-events: all;
    }

    #${id}[data-state=loaded] .VkIdWebSdk__floating_${id} {
      display: none;
    }

    #${id}[data-state=not_loaded] .VkIdWebSdk__floating_button_spinner_${id} {
      transition: .2s;
      opacity: 0;
      pointer-events: none;
      width: 0;
    }

    #${id}[data-state=loading] .VkIdWebSdk__floating_button_text_${id} {
      flex: 1;
    }

    @media (max-width: 480px) {
      #${id} {
        display: flex;
        align-items: flex-end;
        left: 0;
        right: 0;
        bottom: ${getIndent(indent.bottom)}px;
        width: 100%;
        height: 340px;
      }
    }
    @media (min-width: 481px) {
      #${id} {
        top: ${getIndent(indent.top)}px;
        right: ${getIndent(indent.right)}px;
        width: 384px;
        height: 360px;
      }
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
