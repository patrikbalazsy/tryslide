import { neon } from '@netlify/neon';

const sql = neon();

export default async (req, context) => {
  try {
    const { name, age } = await req.json();

    const [row] = await sql`
      INSERT INTO test_data (name, age)
      VALUES (${name}, ${age})
      RETURNING *;
    `;

    return Response.json({ success: true, row });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
};
