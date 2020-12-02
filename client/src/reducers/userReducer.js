/** @format */
import { LOGGED_IN_USER, LOGOUT } from '../actions/types';

const userReducer = (state = null, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGOUT:
			return payload;
		case LOGGED_IN_USER:
			return payload;
		default:
			return state;
	}
};
export default userReducer;
