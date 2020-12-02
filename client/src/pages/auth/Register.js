/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const Register = ({ history }) => {
	const [formData, setFormData] = useState({
		email: '',
	});

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const { email } = formData;
	const clearFormData = () => {
		setFormData({ email: '' });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('env ==>', process.env.REACT_APP_REGISTER_REDIRECT_URL);
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		try {
			await auth.sendSignInLinkToEmail(email, config);
			toast.success(`${email} has received a sign In link. Thank you.`);
			//save user email in localStorage
			window.localStorage.setItem('emailForRegistration', email);
			clearFormData();
		} catch (err) {
			if (err.code === 'auth/invalid-email') {
				toast.warning(err.message);
			}
		}
	};

	const registrationForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				className='form-control'
				name='email'
				placeholder='Email Address'
				value={email}
				onChange={(e) => onChange(e)}
				autoFocus
			/>
			<br />
			<button type='submit' className='btn btn-raised'>
				Register
			</button>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register</h4>

					{registrationForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
