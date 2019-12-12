import { hashSync, compareSync } from 'bcrypt';
import seedrandom from 'seedrandom';

export const isId = (value: unknown) => typeof value === 'string' && Number(value) > 0;

const SALT_ROUNDS = 11;

export const hashPassword = (password: string): string => hashSync(password, SALT_ROUNDS);

export const verifyPassword = (password: string, pwhash: string): boolean => compareSync(password, pwhash);

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomString: (length: number) => string = length => {
  const randomChars: string[] = [];
  const rng = seedrandom(`${process.pid}#${Date.now()}`);
  for (let i = 0; i < length; i++) {
    randomChars.push(ALPHABET.charAt(Math.floor(rng() * ALPHABET.length)));
  }
  return randomChars.join('');
};

export const generateToken: () => string = () => randomString(20);
