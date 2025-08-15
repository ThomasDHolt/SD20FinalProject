export default function DetailsModal({ exercise, save }) {
	return (
		<fieldset>
			<legend>{exercise}</legend>
			<label>
				Sets
				<input
					type="number"
					name="sets"
					aria-label={'Enter a number of sets'}
					required
				/>
			</label>

			<br />

			<label>
				Reps
				<input
					type="number"
					name="reps"
					aria-label={'Enter a number of reps'}
					required
				/>
			</label>

			<button type="button" aria-label="Save entries" onClick={save}>
				Save
			</button>
		</fieldset>
	);
}
