/** @format */

import axios from 'axios';
import { LOGGED_IN_USER } from './types';
import { toast } from 'react-toastify';

export const createOrUpdateUser = (authToken, history) => async (dispatch) => {
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API}/auth`,
			{},
			{
				headers: {
					authToken,
				},
			}
		);
		dispatch({
			type: LOGGED_IN_USER,
			payload: {
				email: res.data.email,
				name: res.data.name,
				picture: res.data.picture,
				role: res.data.role,
				token: authToken,
				_id: res.data._id,
			},
		});
		if (res.data.role === 'admin') {
			history.push('/admin/dashboard');
		} else {
			history.push('/user/history');
		}
	} catch (err) {
		console.log(err);
		toast.error('Server went bananas!');
	}
};

export const getCurrentUser = async (authToken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/auth/currentUser`,
		{},
		{
			headers: {
				authToken,
			},
		}
	);
};
export const getAdmin = async (authToken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/auth/admin`,
		{},
		{
			headers: {
				authToken,
			},
		}
	);
};
