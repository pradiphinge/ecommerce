/** @format */

import api from '../utils/api';
export const getSubCategories = async () => {
	return await api.get(`/subcategories`);
};
export const getSubCategoriesOfCategory = async (c_id) => {
	return await api.get(`/subcategories/category/${c_id}`);
};
export const getSubCategory = async (slug) => {
	return await api.get(`/subcategory/${slug}`);
};

export const removeSubCategory = async (slug, authtoken) => {
	return await api.delete(`/subcategory/${slug}`, {
		headers: {
			authtoken,
		},
	});
};
export const updateSubCategory = async (
	slug,
	subcategory,

	authtoken
) => {
	return await api.put(
		`/subcategory/${slug}`,
		subcategory,

		{
			headers: {
				authtoken,
			},
		}
	);
};

export const createSubCategory = async (subcategory, authtoken) => {
	return await api.post(`/subcategory/`, subcategory, {
		headers: {
			authtoken,
		},
	});
};
