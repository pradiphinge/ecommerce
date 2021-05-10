/** @format */

import { useState, useEffect, useCallback } from 'react';

import { getProducts, getProductsCount } from '../../actions/product';
const initialState = {
	productsCount: 0,
	products: [],

	loading: true,
};

const usePaginationData = (sortCriteria) => {
	const { sortOn, order, page } = sortCriteria;
	const [paginationData, setPaginationData] = useState(initialState);

	const loadProducts = useCallback(() => {
		getProducts(sortOn, order, page)
			.then((res) => {
				console.log('inside custom hook');
				setPaginationData((paginationData) => ({
					...paginationData,
					products: res.data,
					loading: false,
				}));
			})
			.catch((err) => {
				console.log('error fetching products', err);
				setPaginationData((paginationData) => ({
					...paginationData,
					loading: false,
				}));
			});
	}, [sortOn, order, page]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	useEffect(() => {
		getProductsCount().then((res) =>
			setPaginationData((paginationData) => ({
				...paginationData,
				productsCount: res.data,
			}))
		);
	}, []);

	return paginationData;
};

export default usePaginationData;
