/** @format */

import React from 'react';
import { Card } from 'antd';
import broken from '../../images/broken.jpg';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const AdminProductCard = ({ product, handleDelete }) => {
	return (
		<Card
			cover={
				<img
					src={
						product.images && product.images.length
							? product.images[0].url
							: broken
					}
					style={{ height: '150px', objectFit: 'cover' }}
					className='p-1'
					alt={product.title}
				/>
			}
			actions={[
				<Link to={`/admin/product/${product.slug}`}>
					<EditOutlined className='text-warning' />
				</Link>,
				<DeleteOutlined
					onClick={() => handleDelete(product.slug)}
					className='text-danger'
				/>,
			]}
		>
			<Meta
				title={product.title}
				description={`${
					product.description && product.description.substring(0, 40)
				}...`}
			/>
		</Card>
	);
};

export default AdminProductCard;
