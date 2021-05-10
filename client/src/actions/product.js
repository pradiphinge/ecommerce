/** @format */

import api from '../utils/api';
export const createProduct = async (product, authtoken) => {
	return await api.post(`/product`, product, {
		headers: {
			authtoken,
		},
	});
};
export const getProductsByCount = async (count) => {
	return await api.get(`/products/${count}`);
};

export const deleteProduct = async (slug, authtoken) => {
	return await api.delete(`/product/${slug}`, {
		headers: {
			authtoken,
		},
	});
};

export const getProduct = async (slug) => {
	return await api.get(`/product/${slug}`);
};

export const updateProduct = async (slug, product, authtoken) => {
	return await api.put(`/product/${slug}`, product, {
		headers: {
			authtoken,
		},
	});
};

export const getProducts = async (sort, order, page) => {
	return await api.post(
		`/products`,
		{
			sort,
			order,
			page,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
};

export const getProductsCount = async () => {
	return await api.get(`/products`);
};
