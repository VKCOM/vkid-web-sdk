export const getButtonPadding = (height: number) => {
  const res = (height - 30) / 2 + 3;
  if (height < 40) {
    return res;
  }
  return res - 2;
};

export const getButtonFontSize = (height: number) => {
  if (height < 40) {
    return 14;
  }

  if (height > 47) {
    return 17;
  }

  return 16;
};

export const getButtonLogoSize = (height: number) => {
  if (height < 40) {
    return 24;
  }

  return 28;
};
