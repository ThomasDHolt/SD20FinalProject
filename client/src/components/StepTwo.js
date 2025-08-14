'use client';

import { useEffect, useState } from 'react';

import DetailsModal from './DetailsModal';

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

	const [modal, setModal] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	function handleClick(index) {
		setModal(!modal);
		setCurrentIndex(index);
	}

	let selected = options[currentIndex];

	return (
		<form onSubmit={nextStep}>
			<div>
				{options.map((op, index) => (
					// check again to match DB or create a table
					// ! value = id ?? match DB
					<div key={index}>
						<input
							type="checkbox"
							name="name"
							aria-label={op.name}
							value={data.name}
							onClick={() => handleClick(index)}
							// onChange={handleChange}
							// onChange={() => handleClick()}
						/>
						<label htmlFor={op.name}>{op.name}</label>
					</div>
				))}
			</div>

			{modal ? <DetailsModal exercise={selected.name} /> : null}

			<button type="submit">Next</button>

			<button type="button" onClick={prevStep}>
				Back
			</button>
		</form>
	);
}
