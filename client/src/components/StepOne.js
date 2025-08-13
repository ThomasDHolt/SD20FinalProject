'use client';

import { useEffect, useState } from 'react';

export default function StepOne({ nextStep, data, handleChange }) {
	const [options, setOptions] = useState([]);
	// check to match DB (into a user made workout plan -- make new table)

	// fetch from different api routes for different data for each step
	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`http://localhost:3000/api`);
			const categories = await res.json();
			setOptions(categories);
		}

		fetchData();
	}, []);

	return (
		<form onSubmit={nextStep}>
			<div>
				{options.map((op) => (
					// check again to match DB or create a table
					// ! value = id ?? match DB
					<div key={op.id}>
						<input
							type="radio"
							name="type"
							aria-label={op.type}
							value={op.type}
							onChange={handleChange}
						/>
						<label htmlFor={op.type}>{op.type}</label>
					</div>
				))}
			</div>

			<button type="submit">Next</button>
		</form>
	);
}
