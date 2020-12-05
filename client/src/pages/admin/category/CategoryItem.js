/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CategoryItem = ({ item, removeItem }) => {
	return (
		<div className='alert alert-secondary'>
			{item.name}
			<span
				className='btn btn-sm float-right'
				onClick={() => removeItem(item.slug)}
			>
				<DeleteOutlined className='text-danger' />
			</span>
			<Link to={`/admin/category/${item.slug}`}>
				<span className='btn btn-sm float-right'>
					<EditOutlined className='text-warning' />
				</span>
			</Link>
		</div>
	);
};

export default CategoryItem;
