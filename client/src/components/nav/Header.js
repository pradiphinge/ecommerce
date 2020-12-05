/** @format */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { Menu } from 'antd';
import {
	AppstoreOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
	UserOutlined,
} from '@ant-design/icons';

import { LOGOUT } from '../../actions/types';

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState('home');
	const handleClick = (e) => {
		setCurrent(e.key);
	};
	const history = useHistory();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: LOGOUT,
			payload: null,
		});
		history.push('/login');
	};
	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Item key='home' icon={<AppstoreOutlined />}>
				<Link to='/'>Home</Link>
			</Item>

			{!user && (
				<Item key='register' icon={<UserAddOutlined />} className='float-right'>
					<Link to='/register'>Register</Link>
				</Item>
			)}

			{!user && (
				<Item key='login' icon={<UserOutlined />} className='float-right'>
					<Link to='/login'>Login</Link>
				</Item>
			)}
			{user && (
				<SubMenu
					key='SubMenu'
					icon={<LoginOutlined />}
					title={(user.name && user.name) || (user.email && user.email)}
					className='float-right'
				>
					{user && user.role === 'admin' && (
						<Item>
							<Link to='/admin/dashboard'>Dashboard</Link>
						</Item>
					)}
					{user && user.role === 'subscriber' && (
						<Item>
							<Link to='/user/history'>Dashboard</Link>
						</Item>
					)}

					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
