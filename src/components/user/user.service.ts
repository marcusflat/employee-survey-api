import { getClient } from '../../db';


export const create = async (name: string, email: string, passwordHash: string) => {
  const client = await getClient();
  try {
    
    const text = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id';
    const values = [name, email, passwordHash];
    const response = await client.query(text, values) as any;
    const userId = response.rows[0].id;

    return { userId }

  } catch (error) {

    throw { code: error.code, message: 'Já existe um usuário com esse email' }
    
  } finally {
    client.release();
  }

}

export const getInfos = async (userId: string) => {
  const client = await getClient();
  try {
    
    const text = 'SELECT answered FROM users WHERE id = $1';
    const values = [userId];
    const response = await client.query(text, values);
    
    return response.rows[0];

  } catch (error) {

    throw error
    
  } finally {
    client.release();
  }

}

