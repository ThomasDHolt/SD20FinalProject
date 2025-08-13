import { db } from '@/utils/db_conn';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
	try {
		const categories = (await db.query(`SELECT * FROM exercise_category`))
			.rows;

		// console.log(categories);
		return NextResponse.json({ categories });
	} catch (err) {
		return NextResponse.json({ error: err.message });
	}
}

export async function POST(req) {
	// create a table in DB for user created workout plans
	// replace values
	try {
		const { values } = await req.body;
		const formData = await db.query(
			'INSERT INTO plan (values) VALUES ($1)',
			[values]
		);

		return NextResponse.json({ formData });
	} catch (err) {
		return NextResponse.json({ error: 'Failed to POST data' });
	}
}
