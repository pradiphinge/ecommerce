/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const config = {
				url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
				handleCodeInApp: true,
			};
			await auth.sendPasswordResetEmail(email.trim(), config);
			toast.success(`Password reset link has been sent to ${email}`);
			setEmail('');
			setLoading(false);
		} catch (err) {
			console.log(err);
			toast.error(err.message);
			setLoading(false);
		}
	};
	return (
		<div className='container col-md-6 offset-md-3 p-5'>
			<h4>Forgot Passoword</h4>
			<br />
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='email'
						className='form-control'
						name='email'
						placeholder='Your Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoFocus
					/>
				</div>
				<br />
				<button
					type='submit'
					className='btn btn-raised'
					disabled={!email || loading}
				>
					Send Me Password Reset Link
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
