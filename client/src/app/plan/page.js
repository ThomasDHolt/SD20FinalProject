'use client';

import { useState } from 'react';

import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';

export default function WorkoutForm() {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({});

	function nextStep(values) {
		setFormData({ ...formData, ...values });
		setCurrentStep(currentStep + 1);
	}

	function prevStep() {
		if (currentStep != 0) {
			setCurrentStep(currentStep - 1);
		}
	}

	function handleSubmit(values) {
		setFormData({ ...formData, ...values });

		console.log('Full form completed!', { ...formData, ...values });
	}

	// ! handleChange 2
	// function handleChange(values) {
	// 	setFormData({ ...formData, ...values });
	// }

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		console.log(formData);
	}

	const formSteps = [
		<StepOne
			nextStep={nextStep}
			data={formData}
			handleChange={handleChange}
			key={1}
		/>,
		<StepTwo
			nextStep={nextStep}
			data={formData}
			handleChange={handleChange}
			prevStep={prevStep}
			key={2}
		/>,
	];

	return (
		<main>
			<div className="bg-amber-800">{formSteps[currentStep]}</div>

			<p>{currentStep + 1} of 3</p>
		</main>
	);
}
