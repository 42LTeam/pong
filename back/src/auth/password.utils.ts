import * as bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function checkPassword(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  const match = await bcrypt.compare(plainTextPassword, hashedPassword);
  return match;
}
