/**
 * События, используемые для обозначения успешности введения капчи
 */
export enum CaptchaInternalEvents {
  /**
   * Событие, возникающее при верно введенной копче
   */
  CAPTCHA_SUCCESS = 'VKSDKAuthCaptchaSuccess',
  /**
   * Событие, возникающее при неверно введенной капче
   */
  CAPTCHA_FAIL = 'VKSDKAuthCaptchaFail',
}
