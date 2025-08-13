import { db } from '@/utils/db_conn';

export async function GET(res) {
	try {
		const categories = (await db.query(`SELECT * FROM exercise_type`)).rows;
		res.status(200).json({ categories });
	} catch (err) {
		res.status(500).json({ error: 'Failed to connect to database' });
	}
}

export async function POST(req) {
	const category = await req.json;

	// create a table in DB for user created workout plans
	try {
		const entries = await db.query(
			'INSERT INTO plan (category) VALUES ($1)',
			[category]
		);

		res.status(201).send({ entries });
	} catch (err) {
		res.status(500).send({ error: 'Failed to POST data' });
	}
}

// try {
// 	const { name, image, creators, aliases, partnerships } = req.body;
// 	const formData = await db.query(
// 		`INSERT INTO heroes (name, image, creators, aliases, partnerships) VALUES ($1, $2, $3, $4, $5)`,
// 		[name, image, creators, aliases, partnerships]
// 	);
// 	res.status(201).json('New post created');
// } catch (err) {
// 	res.status(500).json({ error: err });
// }
