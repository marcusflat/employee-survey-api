import { getClient } from '../../db';


export const getAll = async () => {
  const client = await getClient();
  try {
    
    const text = `
    SELECT q.id, q.question, q.type, q.props as "childProps", 
    array_agg(array[qo.id::text, qo.option::text]) as options
    FROM questions q
    JOIN questions_options qo ON q.id = qo.question_id
    GROUP BY q.id, q.question, q.type, q.props
    `;
    // const text = `
    //   SELECT q.id, q.question, q.type, q.props as "childProps", array_agg(qo.option, qo.id) as options
    //   FROM questions q
    //   JOIN questions_options qo ON q.id = qo.question_id
    //   GROUP BY q.id, q.question, q.type, q.props
    // `;
    const response = await client.query(text);

    return response.rows

  } catch (error) {

    throw { code: error.code, message: 'Já existe um usuário com esse email' }
    
  } finally {
    client.release();
  }

}
