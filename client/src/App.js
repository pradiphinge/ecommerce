/** @format */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

import Home from './pages/Home';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import Header from './components/nav/Header';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';

import { auth } from './firebase';
import { LOGGED_IN_USER } from './actions/types';
import { getCurrentUser } from './actions/auth';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				const res = await getCurrentUser(idTokenResult.token);
				dispatch({
					type: LOGGED_IN_USER,
					payload: {
						email: res.data.email,
						name: res.data.name,
						picture: res.data.picture,
						role: res.data.role,
						token: idTokenResult.token,
						_id: res.data._id,
					},
				});
			}
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);
	return (
		<>
			<Header />
			<ToastContainer />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/register/complete' component={RegisterComplete} />
				<Route exact path='/forgot/password' component={ForgotPassword} />
				<UserRoute exact path='/user/history' component={History} />
				<UserRoute exact path='/user/password' component={Password} />
				<UserRoute exact path='/user/wishlist' component={Wishlist} />
				<AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
				<AdminRoute exact path='/admin/category' component={CategoryCreate} />
				<AdminRoute
					exact
					path='/admin/category/:slug'
					component={CategoryUpdate}
				/>
			</Switch>
		</>
	);
};

export default App;
