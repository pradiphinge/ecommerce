/** @format */

import api from '../utils/api';

export const getCategories = async () => {
	return await api.get(`/categories`);
};

export const getCategory = async (slug) => {
	return await api.get(`/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
	return await api.delete(`/category/${slug}`, {
		headers: {
			authtoken,
		},
	});
};
export const updateCategory = async (slug, category, authtoken) => {
	return await api.put(`/category/${slug}`, category, {
		headers: {
			authtoken,
		},
	});
};

export const createCategory = async (category, authtoken) => {
	return await api.post(`/category`, category, {
		headers: {
			authtoken,
		},
	});
};
