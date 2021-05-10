/** @format */

import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';
import { getAdmin } from '../../actions/auth';

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [ok, setOk] = useState(false);

	useEffect(() => {
		if (user && user.token) {
			getAdmin(user.token)
				.then((res) => {
					//console.log('current Admin res', res);
					setOk(true);
				})
				.catch((err) => {
					//console.log('admin route err', err);
					setOk(false);
				});
		}
	}, [user]);

	return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
