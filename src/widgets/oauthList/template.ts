import { WidgetParams } from '#/core/widget';
import { Languages } from '#/types';

import { OAuthNameText } from './constants';
import { linkTextLang, singleButtonText } from './lang';
import { OAuthListStyles, OAuthName } from './types';

const spinnerSvg = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>
  </svg>
`;

const OAuthIconMap = {
  [OAuthName.VK]: (size: 24 | 28) => `
<svg width="${size + 1}" height="${size}" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.33331 13.56C3.33331 8.58197 3.33331 6.09295 4.87979 4.54648C6.42627 3 8.91528 3 13.8933 3H14.7733C19.7513 3 22.2404 3 23.7868 4.54648C25.3333 6.09295 25.3333 8.58197 25.3333 13.56V14.44C25.3333 19.418 25.3333 21.907 23.7868 23.4535C22.2404 25 19.7513 25 14.7733 25H13.8933C8.91528 25 6.42627 25 4.87979 23.4535C3.33331 21.907 3.33331 19.418 3.33331 14.44V13.56Z" fill="#0077FF" style="fill:#0077FF;fill:color(display-p3 0.0000 0.4667 1.0000);fill-opacity:1;"/>
  <path d="M15.0398 18.9C10.0174 18.9 7.15269 15.4466 7.03333 9.70001H9.54912C9.63175 13.9178 11.4864 15.7044 12.9555 16.0728V9.70001H15.3245V13.3376C16.7752 13.1811 18.2992 11.5234 18.8134 9.70001H21.1823C20.7875 11.9471 19.1348 13.6047 17.9595 14.2862C19.1348 14.8387 21.0171 16.2846 21.7333 18.9H19.1256C18.5655 17.1503 17.17 15.7965 15.3245 15.6123V18.9H15.0398Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>
  `,
  [OAuthName.OK]: (size: 24 | 28) => `
<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.67554 3.67638C2 5.36482 2 8.09045 2 13.5176V14.4824C2 19.9216 2 22.6352 3.68759 24.3236C5.37519 26 8.09944 26 13.5238 26H14.4882C19.9126 26 22.6489 26 24.3245 24.3236C26 22.6352 26 19.9095 26 14.4824V13.5176C26 8.09045 26 5.35276 24.3245 3.67638C22.6369 2 19.9126 2 14.4882 2H13.5239C8.08739 2 5.37519 2 3.67554 3.67638Z" fill="#EE8208" style="fill:#EE8208;fill:color(display-p3 0.9333 0.5098 0.0314);fill-opacity:1;"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1157 12.621C16.3239 13.4108 15.218 13.9122 13.999 13.9122C12.7926 13.9122 11.6741 13.4108 10.8823 12.621C10.0906 11.8313 9.58793 10.7407 9.58793 9.51224C9.58793 8.28377 10.0906 7.18065 10.8823 6.40345C11.6741 5.61372 12.78 5.1123 13.999 5.1123C15.218 5.1123 16.3239 5.61372 17.1157 6.40345C17.9074 7.19319 18.4101 8.2963 18.4101 9.51224C18.4101 10.7282 17.9074 11.8313 17.1157 12.621ZM14.0116 7.49404C13.4586 7.49404 12.9559 7.71967 12.5915 8.0832C12.2396 8.44673 12.0008 8.94814 12.0008 9.4997C12.0008 10.0513 12.227 10.5527 12.5915 10.9162C12.9559 11.2797 13.446 11.5054 14.0116 11.5054C14.5645 11.5054 15.0672 11.2797 15.4317 10.9162C15.7961 10.5527 16.0223 10.0638 16.0223 9.4997C16.0223 8.94814 15.7961 8.44673 15.4317 8.0832C15.0672 7.71967 14.5771 7.49404 14.0116 7.49404Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
  <path d="M18.6614 13.9247L19.9558 15.6922C20.0312 15.7799 20.0187 15.8927 19.8553 15.968C18.762 16.8705 17.4927 17.4471 16.1731 17.7605L18.9128 22.5741C18.9882 22.7246 18.9002 22.8875 18.7368 22.8875H16.06C15.9721 22.8875 15.8967 22.8248 15.8715 22.7496L13.9613 18.4876L12.0511 22.7496C12.026 22.8374 11.9506 22.8875 11.8626 22.8875H9.1858C9.03499 22.8875 8.93445 22.712 9.00986 22.5741L11.7495 17.7605C10.4299 17.4471 9.16066 16.8454 8.06732 15.968C7.99192 15.8927 7.97935 15.7799 8.04219 15.6922L9.3366 13.9247C9.412 13.8369 9.56281 13.8244 9.65078 13.8996C10.8824 14.9401 12.3779 15.617 13.999 15.617C15.6202 15.617 17.1282 14.9401 18.3472 13.8996C18.4352 13.8119 18.586 13.8244 18.6614 13.9247Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>
  `,
  [OAuthName.MAIL]: (size: 24 | 28) => `
<svg width="${size + 1}" height="${size}" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_217_2730)">
  <path d="M14.6667 28C22.3987 28 28.6667 21.732 28.6667 14C28.6667 6.26801 22.3987 0 14.6667 0C6.9347 0 0.666687 6.26801 0.666687 14C0.666687 21.732 6.9347 28 14.6667 28Z" fill="#005FF9" style="fill:#005FF9;fill:color(display-p3 0.0000 0.3725 0.9765);fill-opacity:1;"/>
  <path d="M17.2957 14C17.2957 14.52 17.1415 15.0283 16.8526 15.4606C16.5637 15.8929 16.1531 16.2299 15.6728 16.4289C15.1924 16.6279 14.6638 16.6799 14.1538 16.5785C13.6438 16.477 13.1754 16.2267 12.8077 15.859C12.44 15.4913 12.1896 15.0229 12.0882 14.5129C11.9868 14.0029 12.0388 13.4743 12.2378 12.9939C12.4368 12.5135 12.7738 12.1029 13.2061 11.8141C13.6384 11.5252 14.1467 11.371 14.6667 11.371C15.3637 11.3718 16.0319 11.649 16.5248 12.1419C17.0177 12.6348 17.2949 13.303 17.2957 14ZM14.6667 5.259C13.2982 5.25874 11.9487 5.57982 10.7269 6.19638C9.50514 6.81295 8.44522 7.70778 7.63246 8.80882C6.81971 9.90987 6.27684 11.1864 6.04756 12.5356C5.81828 13.8847 5.909 15.2689 6.31241 16.5766C6.71581 17.8844 7.42064 19.0791 8.37015 20.0646C9.31966 21.0502 10.4873 21.799 11.7791 22.2509C13.0709 22.7027 14.4507 22.8449 15.8075 22.666C17.1643 22.4871 18.4601 21.9922 19.5907 21.221L19.6157 21.203L18.4377 19.834L18.4187 19.847C17.0632 20.7181 15.4476 21.092 13.8472 20.9048C12.2469 20.7177 10.7611 19.9811 9.64324 18.8207C8.52539 17.6603 7.84476 16.1481 7.71745 14.5419C7.59015 12.9357 8.02406 11.3351 8.94516 10.0131C9.86627 8.69111 11.2175 7.72965 12.7684 7.29274C14.3192 6.85582 15.9736 6.97052 17.4494 7.61725C18.9251 8.26399 20.1308 9.40269 20.8606 10.8391C21.5905 12.2756 21.7994 13.9207 21.4517 15.494C21.4123 15.8149 21.2547 16.1096 21.0097 16.3206C20.7647 16.5315 20.4499 16.6436 20.1267 16.635C19.9786 16.6249 19.834 16.5855 19.7013 16.5189C19.5686 16.4524 19.4505 16.3602 19.3538 16.2476C19.2571 16.135 19.1838 16.0042 19.1381 15.863C19.0924 15.7218 19.0753 15.5729 19.0877 15.425V14C19.089 12.975 18.7346 11.9813 18.085 11.1885C17.4354 10.3957 16.5308 9.85284 15.5255 9.6526C14.5203 9.45236 13.4768 9.60713 12.5729 10.0905C11.6691 10.5739 10.961 11.3559 10.5694 12.3032C10.1779 13.2504 10.1272 14.3042 10.4259 15.2847C10.7247 16.2651 11.3544 17.1116 12.2076 17.6795C13.0609 18.2475 14.0847 18.5018 15.1045 18.399C16.1244 18.2962 17.0769 17.8428 17.7997 17.116C18.0374 17.4875 18.3585 17.7985 18.7375 18.0241C19.1164 18.2498 19.5428 18.384 19.9827 18.416C20.0607 18.423 20.1397 18.426 20.2187 18.426C20.8595 18.4243 21.4824 18.2136 21.9927 17.826C22.5342 17.4031 22.9298 16.8212 23.1237 16.162C23.1577 16.051 23.2237 15.795 23.2237 15.794V15.784C23.3539 15.1985 23.4156 14.5998 23.4077 14C23.405 11.6826 22.4833 9.46079 20.8446 7.82211C19.2059 6.18342 16.9841 5.26165 14.6667 5.259Z" fill="#FF9E00" style="fill:#FF9E00;fill:color(display-p3 1.0000 0.6196 0.0000);fill-opacity:1;"/>
  </g>
  <defs>
  <clipPath id="clip0_217_2730">
  <rect width="28" height="28" fill="white" style="fill:white;fill:white;fill-opacity:1;" transform="translate(0.666687)"/>
  </clipPath>
  </defs>
</svg>
  `,
};

const defaultStylesParams: Required<OAuthListStyles> = {
  height: 44,
  borderRadius: 8,
};

type OAuthListTemplateParams = Pick<WidgetParams, 'scheme' | 'lang'> & Pick<OAuthListStyles, 'borderRadius' | 'height'> & {
  oauthList: OAuthName[];
};

export const getOAuthListTemplate = (params: OAuthListTemplateParams) => (id: string) => {
  const lang = params.lang || Languages.RUS;
  const scheme = params.scheme || 'light';
  const borderRadius = params.borderRadius || defaultStylesParams.borderRadius;
  const height = params.height || defaultStylesParams.height;

  const isonSize = height < 40 ? 24 : 28;
  const paddingSize = height < 40 ? 6 : height < 48 ? 8 : 12;

  const oauthListItems = params.oauthList.map((oauth: OAuthName) => {
    const singleButtonTextLang = lang === Languages.RUS ?
      singleButtonText[lang][oauth] :
      `${singleButtonText[lang].replace('{provider}', OAuthNameText[oauth])}`;
    return `
      <div class="VkIdSdk_oauth_item" data-oauth="${oauth}">
        ${OAuthIconMap[oauth](isonSize)}
        <div class="VkIdSdk_oauth_button_text">${singleButtonTextLang}</div>
      </div>
    `;
  }).join('');

  const handleLoaded = () => {
    const textDiv = document.querySelector(`#${id} .VkIdSdk_oauth_button_text`);
    const oauthItemDiv = document.querySelector(`#${id} .VkIdSdk_oauth_item`);

    if (!textDiv || !oauthItemDiv) {
      return;
    }

    const shouldHideText = textDiv.clientWidth >= oauthItemDiv.clientWidth - isonSize * 2 - 32 - paddingSize * 2;
    if (shouldHideText) {
      document.querySelector(`#${id} .VkIdSdk_oauth_list`)?.removeAttribute('data-single-mode');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleLoaded);
  } else {
    setTimeout(handleLoaded, 0);
  }

  const isSingleMode = params.oauthList.length === 1 ? 'data-single-mode' : '';
  const linkText = linkTextLang[lang];

  return `
    <div id="${id}" class="VkIdSdk_oauth_container" data-test-id="oauthList" data-scheme="${scheme}">
      <style>
        #${id}.VkIdSdk_oauth_container {
          position: relative;
        }

        #${id} .VkIdSdk_oauth_list {
          display: flex;
          height: ${height}px;
        }

        #${id} .VkIdSdk_oauth_item {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: ${paddingSize}px;
          margin-right: 12px;
          width: 100%;
          border: 1px solid var(--vkui--color_field_border_alpha);
          border-radius: ${borderRadius}px;
          cursor: pointer;
        }
        #${id}[data-scheme=dark] .VkIdSdk_oauth_item {
         border: 1px solid var(--vkui--color_field_border_alpha--dark);
        }

        #${id} .VkIdSdk_oauth_item:last-child {
          margin-right: 0;
        }

        #${id} .VkIdSdk_oauth_link_text {
          display: flex;
          font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
          color: var(--vkui-light-text-secondary);
          font-size: 13px;
          line-height: 16px;
          margin-bottom: 16px;
          justify-content: center;
          text-align: center;
        }
        #${id}[data-scheme=dark] .VkIdSdk_oauth_link_text {
         color: var(--vkui--color_text_secondary--dark);
        }

        #${id} .VkIdSdk_spinner {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #fff;
        }

        #${id}[data-state=loaded] .VkIdSdk_spinner {
          transition: .2s;
          opacity: 0;
          pointer-events: none;
        }

        #${id} .VkIdSdk_spinner > svg {
          animation: vkIdSdkButtonSpinner 0.7s linear infinite;
        }

        #${id} .VkIdSdk_oauth_button_text {
          display: none;
          font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
        }
        #${id}[data-scheme=dark] .VkIdSdk_oauth_button_text {
         color: var(--vkui--color_text_primary--dark);
        }

        #${id} .VkIdSdk_oauth_list[data-single-mode] .VkIdSdk_oauth_item svg {
          position: absolute;
          left: 16px;
        }

        #${id} .VkIdSdk_oauth_list[data-single-mode] .VkIdSdk_oauth_button_text {
          display: block;
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
      <div class="VkIdSdk_spinner">
        ${spinnerSvg}
      </div>
      <div class="VkIdSdk_oauth_link_text">${linkText}</div>
      <div class="VkIdSdk_oauth_list" ${isSingleMode}>${oauthListItems}</div>
    </div>
  `;
};
