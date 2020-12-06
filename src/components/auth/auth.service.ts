import { query } from '../../db';

export const login = async (email: string) => {

  try {
    const text = 'SELECT id, name, password, answered FROM users WHERE email = $1';
    const values = [email];
    const response = await query(text, values) as any;

    if(response.rowCount < 1) throw Error('');
    return response.rows?.[0]

  } catch (error) {
    throw new error('User and/or password is not correct.');
  }

}