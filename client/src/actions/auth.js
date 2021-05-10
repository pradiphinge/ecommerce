/** @format */

import { LOGGED_IN_USER, LOGOUT } from './types';
import { toast } from 'react-toastify';
import firebase from 'firebase/app';
import api from '../utils/api';

export const createOrUpdateUser = (authToken) => async (dispatch) => {
	try {
		const res = await api.post(
			'/auth',
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
		// if (res.data.role === 'admin') {
		// 	history.push('/admin/dashboard');
		// } else {
		// 	history.push('/user/history');
		// }
	} catch (err) {
		console.log(err);
		toast.error('Server went bananas!');
	}
};

export const getCurrentUser = async (authToken) => {
	return await api.post(
		`/auth/currentUser`,
		{},
		{
			headers: {
				authToken,
			},
		}
	);
};
export const getAdmin = async (authToken) => {
	return await api.post(
		`/auth/admin`,
		{},
		{
			headers: {
				authToken,
			},
		}
	);
};

export const logout = () => async (dispatch) => {
	firebase.auth().signOut();
	dispatch({
		type: LOGOUT,
		payload: null,
	});
};
