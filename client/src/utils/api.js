/** @format */

import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';
import firebase from 'firebase/app';
const api = axios.create({
	baseURL: `${process.env.REACT_APP_API}`,
	headers: {
		'Content-Type': 'application/json',
	},
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response.status === 401) {
			firebase.auth().signOut();
			store.dispatch({ type: LOGOUT, payload: null });
		}
		return Promise.reject(err);
	}
);

export default api;
