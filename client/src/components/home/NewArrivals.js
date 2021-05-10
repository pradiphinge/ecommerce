/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from 'antd';

import { getProducts, getProductsCount } from '../../actions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
const NewArrivals = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState('');
	const [productsCount, SetProductsCount] = useState(0);
	const [page, setPage] = useState(1);

	const loadProducts = useCallback(() => {
		setLoading(true);
		getProducts('createdAt', 'desc', page)
			.then((res) => {
				setLoading(false);
				setProducts(res.data);
			})
			.catch((err) => {
				setLoading(false);
				console.log('error fetching products', err);
			});
	}, [page]);
	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	useEffect(() => {
		getProductsCount().then((res) => SetProductsCount(res.data));
	}, []);

	return (
		<>
			<div className='container'>
				{loading ? (
					<LoadingCard count={3} />
				) : (
					<div className='row'>
						{products.map((product) => (
							<div key={product._id} className='col-md-4'>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				)}
			</div>
			<div className='row'>
				<div className='col-md-4 offset-md-4 text-center pt-5 p-3'>
					<Pagination
						current={page}
						total={(productsCount / 3) * 10}
						onChange={(value) => setPage(value)}
					/>
				</div>
			</div>
		</>
	);
};

export default NewArrivals;

// /** @format */

// import React, { useState } from 'react';

// import { Pagination } from 'antd';
// import ProductCard from '../cards/ProductCard';

// import LoadingCard from '../cards/LoadingCard';
// import usePaginationData from '../customHooks/usePaginationData';
// const NewArrivals = () => {
// 	const [page, setPage] = useState(1);

// 	let paginationData = usePaginationData({
// 		sortOn: 'createdAt',
// 		order: 'desc',
// 		page,
// 	});

// 	const { loading, productsCount, products } = paginationData;
// 	console.log('paginationData', paginationData);
// 	return (
// 		<>
// 			<div className='container'>
// 				{loading ? (
// 					<LoadingCard count={3} />
// 				) : (
// 					<div className='row'>
// 						{products.map((product) => (
// 							<div key={product._id} className='col-md-4'>
// 								<ProductCard product={product} />
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 			<div className='row'>
// 				<div className='col-md-4 offset-md-4 text-center pt-5 p-3'>
// 					<Pagination
// 						current={page}
// 						total={(productsCount / 3) * 10}
// 						onChange={(value) => setPage(value)}
// 					/>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default NewArrivals;
