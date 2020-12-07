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

export const getAll = async () => {
  const client = await getClient();
  try {
    
    const text = `
      SELECT 
        q.id as "questionId", 
        q.chart_props as "chartProps",
        q.question, qo.id as "optionId", 
        qo.option, 
        COUNT(a.question_option_id) as quantidade
      FROM questions_options qo
      JOIN questions q ON q.id = qo.question_id
      LEFT JOIN answers a ON a.question_option_id = qo.id
      GROUP BY q.id, q.question, qo.id, qo.option
      ORDER BY q.id, qo.id;
    `;
    
    const response = await client.query(text);

    return response.rows;

  } catch (error) {
    throw error 
    
  } finally {
    client.release();
  }

}


