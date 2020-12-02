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
					title='Dashboard'
					className='float-right'
				>
					<Item key='setting:1'>Option 1</Item>
					<Item key='setting:2'>Option 2</Item>
					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
