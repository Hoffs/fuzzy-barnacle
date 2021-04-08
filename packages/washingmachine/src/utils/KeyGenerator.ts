import crypto from 'crypto';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function generateKey(length: number): string {
  const data = new Array<string>(length);
  for (let i = 0; i < length; i++) {
    data[i] = characters[crypto.randomInt(characters.length)];
  }

  return data.join('');
}
