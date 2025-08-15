"use client";

import { useState } from 'react';
import { redirect, RedirectType } from 'next/navigation';

import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';

/*
	{
		category_id: 1,
		exercise_array: [1,2,3] (array of ids)
	}
*/
export default function WorkoutForm() {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({
		categoryId: null,
		exercises: [],
	});

	function nextStep(values) {
		setFormData({ ...formData, ...values });
		setCurrentStep(currentStep + 1);
	}

	function prevStep() {
		if (currentStep != 0) {
			setCurrentStep(currentStep - 1);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const res = await fetch(`/api/two`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		});

		if (!res.ok) {
			throw new Error(`HTTP error: ${res.status}`);
		}

		console.log('Full form completed!', { ...formData });

		redirect('/dashboard', RedirectType.push);

		// setFormData({ ...formData, ...values });
		// alreadyh have this??
		// submit something to the database
		console.log('Full form completed!', { ...formData });
	}

	// ! handleChange 2
	function handleChange(values) {
		setFormData((prev) => ({ ...prev, ...values }));
	}

	const formSteps = [
		<StepOne
			nextStep={nextStep}
			formData={formData}
			handleChange={handleChange}
			setFormData={setFormData}
			key={1}
		/>,
		<StepTwo
			nextStep={nextStep}
			data={formData}
			handleChange={handleChange}
			prevStep={prevStep}
			key={2}
			finish={handleSubmit}
		/>,
	];

	return (
		<main>
			<div className="bg-amber-800">{formSteps[currentStep]}</div>

			<p>{currentStep + 1} of 3</p>
		</main>
	);
}
