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
