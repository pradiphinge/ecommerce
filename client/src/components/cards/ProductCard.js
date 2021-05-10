/** @format */

import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import broken from '../../images/broken.jpg';

const { Meta } = Card;

const ProductCard = ({ product }) => {
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
				<Link to={`/product/${product.slug}`}>
					<EyeOutlined className='text-warning' />
					<br />
					View Product
				</Link>,
				<>
					<ShoppingCartOutlined className='text-danger' />
					<br />
					Add to Cart
				</>,
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

export default ProductCard;
