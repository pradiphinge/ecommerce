/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';

import { getProduct, updateProduct } from '../../../actions/product';
import { getCategories } from '../../../actions/category';
import { getSubCategoriesOfCategory } from '../../../actions/subcategory';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
// import {
// 	getProducts,
// 	//createProduct,
// 	//removeProduct,
// } from '../../../actions/product';

const initialState = {
	title: '',
	description: '',
	price: '',

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
const ProductUpdate = ({ history, match }) => {
	const [formData, setFormData] = useState(initialState);
	const [categories, setCategories] = useState([]);
	const [subOptions, setSubOptions] = useState([]);
	const [arrSubs, setArrSubs] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const { slug } = match.params;
	const authtoken = user.token ? user.token : '';

	const loadProduct = useCallback(() => {
		getProduct(slug).then((p) => {
			if (p) {
				setFormData((formData) => ({ ...formData, ...p.data }));
				getSubCategoriesOfCategory(p.data.category._id).then((res) => {
					if (res.data.length) {
						setSubOptions(res.data);
					} else {
						setSubOptions([]);
					}
				});
				let arr = [];
				p.data.subcategories.length &&
					p.data.subcategories.map((subcategory) => arr.push(subcategory._id));
				setArrSubs((prev) => arr);
			} else {
				console.log('no product found!');
			}
		});
	}, [slug]);

	const loadCategories = useCallback(
		() => getCategories().then((c) => setCategories(c.data)),
		[]
	);

	useEffect(() => {
		loadProduct();
		loadCategories();
	}, [loadProduct, loadCategories]);

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleCategoryChange = (e) => {
		e.preventDefault();
		setSelectedCategory(e.target.value);
		getSubCategoriesOfCategory(e.target.value).then((res) => {
			console.log(res);
			if (res.data.length) {
				setSubOptions(res.data);
			} else {
				setSubOptions([]);
			}
		});

		if (formData.category._id === e.target.value) {
			let arr = [];
			formData.subcategories.length &&
				formData.subcategories.map((subcategory) => arr.push(subcategory._id));
			setArrSubs((prev) => arr);
		} else {
			setArrSubs([]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		formData.subcategories = arrSubs;
		formData.category = selectedCategory ? selectedCategory : formData.category;
		updateProduct(formData.slug, formData, authtoken)
			.then((res) => {
				setLoading(false);
				toast.success(`${res.data.title} updated successfully.`);
				history.push('/admin/products');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				toast.error(err.response.data.err);
			});
	};
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Update Product</h4>
					<hr />
					<div className='p-3'>
						<FileUpload
							formData={formData}
							setFormData={setFormData}
							setLoading={setLoading}
							loading={loading}
						/>
					</div>
					<ProductUpdateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						setFormData={setFormData}
						formData={formData}
						categories={categories}
						subOptions={subOptions}
						handleCategoryChange={handleCategoryChange}
						arrSubs={arrSubs}
						setArrSubs={setArrSubs}
						selectedCategory={selectedCategory}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;
