'use server'; # delete

import { db } from '@/utils/db_conn';

export default async function FetchOne() {
	return await db.query(`SELECT * FROM exercise_type`).rows;
}
