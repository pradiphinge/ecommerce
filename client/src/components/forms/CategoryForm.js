/** @format */

import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName, loading }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='name'
					className='form-control'
					value={name}
					onChange={(e) => setName(e.target.value)}
					disabled={loading}
					required
				/>
				<br />
				<button
					type='submit'
					className='btn btn-outline-primary'
					disabled={!name || loading}
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default CategoryForm;
