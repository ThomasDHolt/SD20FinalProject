import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_CONN,
});

export async function GET() {
  const { rows } = await pool.query("SELECT * FROM events ORDER BY start ASC");
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const ev = await req.json();
  await pool.query(
    `INSERT INTO events (id, title, start, "end", "allDay")
     VALUES ($1, $2, $3, $4, $5)`,
    [ev.id, ev.title, ev.start, ev.end, ev.allDay]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await pool.query("DELETE FROM events WHERE id = $1", [id]);
  return NextResponse.json({ success: true });
}
