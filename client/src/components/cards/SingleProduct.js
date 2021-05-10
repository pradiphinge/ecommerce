/** @format */

import React from 'react';
import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ImageCarousel from '../carousel/ImageCarousel';
import ProductListItems from '../cards/ProductListItems';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
	const { title, images, description } = product;
	return (
		<>
			<div className='col-md-7'>
				<ImageCarousel images={images} />
				<Tabs type='card'>
					<TabPane tab='Description' key='1'>
						{description && description}
					</TabPane>
					<TabPane tab='More' key='2'>
						"Contact us at xxxx-xxx-xxx"
					</TabPane>
				</Tabs>
			</div>
			<div className='col-md-5'>
				<h1 className='bg-info p-3'> {title}</h1>
				<Card
					actions={[
						<>
							<HeartOutlined className='text-success' /> <br />
							Add to Cart
						</>,
						<Link to='/'>
							<ShoppingCartOutlined className='text-info' />
							<br />
							Add To Wishlist
						</Link>,
					]}
				>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
