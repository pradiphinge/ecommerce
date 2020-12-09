/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import ProductForm from '../../../components/forms/ProductForm';
import { createProduct } from '../../../actions/product';
import { getCategories } from '../../../actions/category';
import { getSubCategoriesOfCategory } from '../../../actions/subcategory';
import FileUpload from '../../../components/forms/FileUpload';
// import {
// 	getProducts,
// 	//createProduct,
// 	//removeProduct,
// } from '../../../actions/product';

const initialState = {
	title: '',
	description: '',
	price: '',
	categories: [],
	category: '',
	subcategories: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
	brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
	color: '',
	brand: '',
};

const ProductCreate = () => {
	const [formData, setFormData] = useState(initialState);
	const [subOptions, setSubOptions] = useState([]);
	const [showSubs, setShowSubs] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	const loadCategories = useCallback(
		() =>
			getCategories().then((c) =>
				setFormData((formData) => ({ ...formData, categories: c.data }))
			),
		[]
	);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleCategoryChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, subcategories: [], category: e.target.value });
		console.log(e.target.value);
		getSubCategoriesOfCategory(e.target.value)
			.then((res) => {
				console.log(res);
				setSubOptions(res.data);
				setShowSubs(true);
			})
			.catch((err) => {
				setShowSubs(false);
				if (err.response.status === 400) toast.error(err.response.data.err);
			});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Inside Product Create FE ==>', formData);

		createProduct(formData, user.token)
			.then((res) => {
				console.log(res);
				window.alert(`"${res.data.title}" is created`);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 400) toast.error(err.response.data.err);
			});
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Create Product</h4>
					<hr />
					{JSON.stringify(formData.images)}
					<div className='p-3'>
						<FileUpload
							formData={formData}
							setFormData={setFormData}
							setLoading={setLoading}
							loading={loading}
						/>
					</div>
					<ProductForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleCategoryChange={handleCategoryChange}
						formData={formData}
						showSubs={showSubs}
						subOptions={subOptions}
						setFormData={setFormData}
					/>
				</div>
			</div>
			∂
		</div>
	);
};

export default ProductCreate;
