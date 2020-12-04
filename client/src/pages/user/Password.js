/** @format */

import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await auth.currentUser.updatePassword(password);
			setLoading(false);
			setPassword('');
			toast.success('Password updated Successfully');
		} catch (err) {
			setLoading(false);
			console.log(err);
			toast.error(err.message);
		}
	};
	const passwordUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='pass'>New Password</label>
				<input
					type='password'
					id='pass'
					name='password'
					placeholder='New Password'
					className='form-control'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={loading}
				/>
				<br />
				<button
					type='submit'
					className='btn btn-primary'
					disabled={!password || loading}
				>
					Submit
				</button>
			</div>
		</form>
	);
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col'>
					<h4>Update Password</h4>
					{passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
