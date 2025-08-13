import FetchOne from '@/actions/FetchOne';

export default function StepOne({ nextStep, data }) {
	const { categories } = FetchOne();

	return (
		<form>
			<div>
				{categories.map((category) => (
					<div key={category.id}>
						<input
							type="radio"
							name="type"
							aria-label={category.type}
							value={data.type}
						/>
						<label for={category.type}>{category.type}</label>
					</div>
				))}
			</div>

			<button type="submit" onClick={nextStep}>
				Next
			</button>
		</form>
	);
}
