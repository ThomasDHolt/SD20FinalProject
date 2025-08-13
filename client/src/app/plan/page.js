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
		setCurrentStep(currentStep - 1);
	}

	function handleSubmit(values) {
		setFormData({ ...formData, ...values });

		console.log('Full form completed!', { ...formData, ...values });
	}

	const formSteps = [
		<>
			<StepOne nextStep={nextStep} data={formData} />
			<StepTwo nextStep={nextStep} data={formData} prevStep={prevStep} />
		</>,
	];

	return (
		<main>
			<p>{currentStep} of 3</p>
			{formSteps[currentStep]}
		</main>
	);
}
