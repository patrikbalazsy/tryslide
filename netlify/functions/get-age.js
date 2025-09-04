import { neon } from '@netlify/neon';

const sql = neon();

export default async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) return Response.json({ error: "Missing ?name parameter" }, { status: 400 });

    const rows = await sql`
      SELECT * FROM test_data WHERE name = ${name};
    `;

    return Response.json({ rows });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
