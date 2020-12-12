/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount, deleteProduct } from '../../../actions/product';
import { LoadingOutlined } from '@ant-design/icons';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { toast } from 'react-toastify';
import axios from 'axios';

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState([false]);
	const { user } = useSelector((state) => ({ ...state }));

	const authtoken = (user && user.token) || '';

	const removeImage = (public_id) => {
		setLoading(true);
		axios.post(
			`${process.env.REACT_APP_API}/image`,
			{ public_id },
			{
				headers: {
					authtoken,
				},
			}
		);
	};
	const handleDelete = (slug) => {
		if (
			window.confirm(
				'Clicking OK will delete the product. This action can not be undone. Are you sure you want to Delete Product?'
			)
		) {
			deleteProduct(slug, authtoken)
				.then((res) => {
					toast.success(`${res.data.title} is deleted`);
					if (res.data.images && res.data.images.length) {
						res.data.images.forEach((image) => {
							removeImage(image.public_id);
						});
					}
					loadProducts();
				})
				.catch((err) => {
					console.log(err);
					if (err.response.status === 400) toast.error(err.response.data);
				});
		}
	};

	const loadProducts = useCallback(async () => {
		setLoading(true);
		getProductsByCount(10)
			.then((res) => {
				setLoading(false);
				setProducts(res.data);
			})
			.catch((err) => {
				setLoading(false);
				console.log('error fetching products', err);
			});
	}, []);
	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				{loading ? (
					<LoadingOutlined className='text-danger' />
				) : (
					<>
						<div className='col'>
							<h4>All Products</h4>
							<div className='row'>
								{products.map((product) => (
									<div key={product._id} className='col-md-4 pb-3'>
										<AdminProductCard
											product={product}
											handleDelete={handleDelete}
										/>
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default AllProducts;
