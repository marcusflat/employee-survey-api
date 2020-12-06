import { getClient } from '../../db';


export const create = async (userId:string, answersId: Array<string>) => {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    for (const answerId of answersId) {
      try {
        const query = `INSERT INTO answers (user_id, question_option_id) VALUES($1, $2)`;
        const values = [userId, answerId];

        await client.query(query, values);
      } catch (error) {
        throw error;
      }
      
    }

    await client.query(`UPDATE users SET answered = true WHERE id = $1`, [userId]);
    await client.query('COMMIT');
    return `Answers inserted`;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error 
    
  } finally {
    client.release();
  }

}
