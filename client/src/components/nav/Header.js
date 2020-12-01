/** @format */

import React, { Fragment, useState } from 'react';
import { Menu } from 'antd';
import { AppStoreOutlined, LoginOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Header = () => {
	const [current, setCurrent] = useState('mail');
	const handleClick = () => {
		setCurrent(e.key);
	};
	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Menu.Item key='mail' icon={<AppStoreOutlined />}>
				Home
			</Menu.Item>

			<SubMenu key='SubMenu' icon={<LoginOutlined />} title='Register'>
				<Menu.Item key='setting:1'>Option 1</Menu.Item>
				<Menu.Item key='setting:2'>Option 2</Menu.Item>
			</SubMenu>
		</Menu>
	);
};

export default Header;
