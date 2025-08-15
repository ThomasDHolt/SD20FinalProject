'use client';

import { useEffect, useState } from 'react';

import DetailsModal from './DetailsModal';

export default function StepTwo({ finish, data, handleChange, prevStep }) {
	const [options, setOptions] = useState([]);
	const [modal, setModal] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

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

	function handleClick(index) {
		setModal(!modal);
		setCurrentIndex(index);
	}

	function toggleexercises(id) {
		const hasExercise = data.exercises.includes(id); // already selected?
		const nextArr = hasExercise
			? data.exercises.filter((x) => x !== id) // remove it
			: [...data.exercises, id]; // add it to selected exercies
		handleChange({ exercises: nextArr });
	}

	let selected = options[currentIndex];

	return (
		<form onSubmit={finish}>
			<div>
				{options.map((op, index) => (
					<div key={index}>
						<input
							type="checkbox"
							name="exercises"
							aria-label={op.name}
							checked={data.exercises.includes(op.id)}
							value={op.name}
							onChange={() => toggleexercises(op.id)}
							onClick={() => handleClick(index)}
						/>
						<label htmlFor={op.name}>{op.name}</label>
					</div>
				))}
			</div>

			{modal ? (
				<DetailsModal exercise={selected.name} save={handleChange} />
			) : null}

			<button type="submit">Next</button>

			<button type="button" onClick={prevStep}>
				Back
			</button>
		</form>
	);
}
