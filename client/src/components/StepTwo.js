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
						<label className='text-2xl ml-[20px]' htmlFor={op.name}>{op.name}</label>
					</div>
				))}
			</div>

			{modal ? (
				<DetailsModal exercise={selected.name} save={handleChange} />
			) : null}

			<div className='flex justify-center'>
				<button className='bg-green-400 hover:bg-green-300 text-2xl text-black p-[10px] min-w-[100px] mr-[2px] rounded-l-4xl' type="submit">Next</button>
				<button className='bg-red-400 hover:bg-red-300 text-2xl text-black p-[10px] min-w-[100px] ml-[2px] rounded-r-4xl' type="button" onClick={prevStep}>Back</button>
			</div>
		</form>
	);
}
