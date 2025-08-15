'use client';

import { useEffect, useState } from 'react';

export default function StepOne({ nextStep, formData, handleChange }) {
	const [options, setOptions] = useState([]);

	// fetch from different api routes for different data for each step
	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/one`);
			const { categories } = await res.json();
			setOptions(categories);

			console.log(categories);
		}

		fetchData();
	}, []);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				nextStep();
			}}
		>
			<div>
				{options.map((op) => (
					<div key={op.id}>
						<input
							type="radio"
							name="category"
							aria-label={op.type}
							value={op.id}
							onChange={(e) =>
								handleChange({
									categoryId: Number(e.target.value),
								})
							}
							checked={formData.categoryId === op.id}
							required
						/>
						<label htmlFor={op.type}>{op.type}</label>
					</div>
				))}
			</div>

			<button type="submit">Next</button>
		</form>
	);
}
