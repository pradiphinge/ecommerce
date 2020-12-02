/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const RegisterComplete = ({ history }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const { email, password } = formData;

	const clearFormData = () => {
		setFormData({ email: '', password: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			toast.error('Both email and password are required');
			return;
		}
		if (password.trim().length < 6) {
			toast.error('Password should be atleast 6 characters long');
			return;
		}
		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			if (result.user.emailVerified) {
				window.localStorage.removeItem('emailForRegistration');
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
			}
		} catch (err) {
			toast.error(err.message);
		}
		clearFormData();
	};

	useEffect(() => {
		if (localStorage.emailForRegistration) {
			setFormData({
				email: localStorage.getItem('emailForRegistration'),
				password: '',
			});
		} else {
			history.push('/register');
		}
	}, [history]);

	const registrationForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<input
					type='email'
					className='form-control'
					name='email'
					placeholder='Email Address'
					value={email}
					disabled
				/>
			</div>
			<div className='form-group'>
				<input
					type='password'
					className='form-control'
					name='password'
					placeholder='Password (Minimum 6 characters)'
					value={password}
					onChange={(e) => onChange(e)}
					autoFocus
				/>
			</div>

			<br />
			<button type='submit' className='btn btn-raised'>
				Complete Registration
			</button>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Complete Registration</h4>

					{registrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
