import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

/**
 * Генерация code challenge для нового oauth
 */
export const generateCodeChallenge = (codeVerifier: string): string => {
  const hash = sha256(codeVerifier);
  const base64 = Base64.stringify(hash);

  return base64
    .replace(/=*$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};
