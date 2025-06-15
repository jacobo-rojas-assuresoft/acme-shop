import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string, round: number): Promise<string> => {
  const result = await hash(password, round);
  if (typeof result !== 'string') {
    throw new Error('Error hashing password');
  }
  return result;
};

export const verifyPasswords = async (plain: string, hashed: string): Promise<boolean> => {
  const result = await compare(plain, hashed);
  if (typeof result !== 'boolean') {
    throw new Error('Error verifying passwords');
  }
  return result;
};
