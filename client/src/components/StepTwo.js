'use client';

import { useEffect, useState } from 'react';

export default function StepTwo({ nextStep, data, handleChange, prevStep }) {
	const [options, setOptions] = useState([]);

	// fetch from different api routes for different data for each step
	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/two`);
			const { exercises } = await res.json();
			setOptions(exercises);

			console.log(exercises);
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
							name="name"
							aria-label={op.name}
							value={data.name}
							onChange={handleChange}
							multiple
							max={5}
						/>
						<label htmlFor={op.name}>{op.name}</label>
					</div>
				))}
			</div>

			<button type="submit">Next</button>

			<button type="button" onClick={prevStep}>
				Back
			</button>
		</form>
	);
}
