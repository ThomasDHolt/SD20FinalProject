export default function DetailsModal({ exercise, save }) {
	return (
		<div className="bg-gray-900">
			<fieldset className="flex flex-col">
				<legend className='text-3xl ml-[20px]'>{exercise}</legend>
				<label className='text-2xl ml-[20px] m-[5px]'>
					Sets
					<input
						className="bg-gray-700 ml-[20px]"
						type="number"
						name="sets"
						aria-label={'Enter a number of sets'}
						required
					/>
				</label>

				<label className='text-2xl ml-[20px] m-[5px]'>
					Reps
					<input
						className="bg-gray-700 ml-[20px]"
						type="number"
						name="reps"
						aria-label={'Enter a number of reps'}
						required
					/>
				</label>
				<div className="flex justify-center">
					<button className='bg-green-400 hover:bg-green-300 text-2xl text-black p-[10px] w-[100px] m-[20px] rounded-3xl' type="button" aria-label="Save entries" onClick={save}>Save</button>
				</div>
			</fieldset>
		</div>
	);
}
