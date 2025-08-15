import { db } from '@/utils/db_conn';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const exercises = (await db.query(`SELECT * FROM abs_exercises`)).rows;

		// console.log(exercises);
		return NextResponse.json({ exercises });
	} catch (err) {
		return NextResponse.json({ error: err.message });
	}
}

export async function POST(req) {
	try {
		const data = await req.body;
		const { categoryId, exercises } = data;

		console.log(`Data from the form: `, data);

		const result = await db.query(
			'INSERT INTO workout_plan (category_id, exercises_arr) VALUES ($1, $2)',
			[categoryId, exercises]
		);

		return NextResponse.json({
			formData: result.rows[0],
			message: 'Data has been successfuly POSTed',
		});
	} catch (err) {
		return NextResponse.json({ error: err.message });
	}
}
