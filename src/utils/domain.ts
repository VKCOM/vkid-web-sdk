const ALLOWED_DOMAINS = [
  '.vk.com',
  '.vk.ru',
];

export const isDomainAllowed = (origin: string): boolean => !!ALLOWED_DOMAINS.find((domain) => origin.endsWith(domain));
