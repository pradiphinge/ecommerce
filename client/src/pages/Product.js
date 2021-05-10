/** @format */

import React, { useEffect, useState, useCallback } from 'react';
import { getProduct } from '../actions/product';
import SingleProduct from '../components/cards/SingleProduct';

const Product = ({ match }) => {
	const [product, setProduct] = useState({});
	const { slug } = match.params;

	const loadSingleProduct = useCallback(() => {
		getProduct(slug).then((res) => setProduct(res.data));
	}, [slug]);
	useEffect(() => {
		loadSingleProduct();
	}, [loadSingleProduct]);

	return (
		<div className='container-fluid'>
			<div className='row pt-4'>
				<SingleProduct product={product} />
			</div>

			<div className='row'>Related Products</div>
		</div>
	);
};

export default Product;
