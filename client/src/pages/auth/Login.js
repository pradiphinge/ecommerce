/** @format */

import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { createOrUpdateUser } from '../../actions/auth';

const Login = ({ history, createOrUpdateUser }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const { email, password } = formData;

	// const clearFormData = () => {
	// 	setFormData({ email: '', password: '' });
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			toast.error('Both email and password are required');
			return;
		}
		try {
			setLoading(true);
			const result = await auth.signInWithEmailAndPassword(email, password);

			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			await createOrUpdateUser(idTokenResult.token, history);

			//clearFormData();
		} catch (err) {
			setLoading(false);
			console.log(err);
			toast.error(err.message);
		}
	};

	const handleKeypress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			console.log('enter key pressed');
			handleSubmit(e);
		}
	};
	const googleLogin = async () => {
		const result = await auth.signInWithPopup(googleAuthProvider);
		const { user } = result;
		const idTokenResult = await user.getIdTokenResult();

		await createOrUpdateUser(idTokenResult.token, history);

		//clearFormData();
	};

	const loginForm = () => (
		<form>
			<div className='form-group'>
				<input
					type='email'
					className='form-control'
					name='email'
					placeholder='Your Email'
					value={email}
					onChange={(e) => onChange(e)}
					autoFocus
					onKeyDown={(e) => handleKeypress(e)}
				/>
			</div>
			<div className='form-group'>
				<input
					type='password'
					className='form-control'
					name='password'
					placeholder='Password'
					value={password}
					onChange={(e) => onChange(e)}
					onKeyDown={(e) => handleKeypress(e)}
				/>
			</div>

			<br />
			<Button
				onClick={handleSubmit}
				className='mb-3'
				type='primary'
				block
				shape='round'
				icon={<MailOutlined />}
				disabled={!email || !password || loading}
			>
				Login with Email and Password
			</Button>
			<Button
				onClick={googleLogin}
				className='mb-3'
				type='danger'
				block
				shape='round'
				icon={<GoogleOutlined />}
			>
				Login with Google
			</Button>
			<Link to='/forgot/password' className='float-right text-primary'>
				Forgot Password ?
			</Link>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Login</h4>

					{loginForm()}
				</div>
			</div>
		</div>
	);
};
Login.propTypes = {
	createOrUpdateUser: PropTypes.func.isRequired,
};

export default connect(null, { createOrUpdateUser })(Login);
