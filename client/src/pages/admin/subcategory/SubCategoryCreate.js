/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';

import CategoryItem from '../category/CategoryItem';
import {
	getSubCategories,
	createSubCategory,
	removeSubCategory,
} from '../../../actions/subcategory';

import { getCategories } from '../../../actions/category';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCategoryCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [subCategories, setSubCategories] = useState([]);

	const loadCategories = useCallback(
		() => getCategories().then((c) => setCategories(c.data)),
		[]
	);
	const loadSubCategories = () =>
		getSubCategories().then((s) => setSubCategories(s.data));

	useEffect(() => {
		loadCategories();
		loadSubCategories();
	}, []);

	const handleRemove = async (slug) => {
		if (
			window.confirm(
				'This will permanently delete this category.Do you want to proceed ? '
			)
		) {
			setLoading(true);
			removeSubCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.success(`Sub Category "${res.data.name}"  is deleted`);
					loadSubCategories();
				})
				.catch((err) => {
					if (err.response.status === 400) {
						setLoading(false);
						toast.error(err.response.data);
					}
				});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await createSubCategory(
				{ name, parent: category },
				user.token
			);
			if (res) {
				console.log(res);
				setLoading(false);
				setName('');
				loadSubCategories();
				toast.success(`Sub Category "${res.data.name}" created!`);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
			if (err.response.status === 400) toast.error(err.response.data);
			else if (err.response.status === 500)
				toast.error('Server Failed to respond.');
		}
	};

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4>Create Sub Category</h4>
					<div className='form-group'>
						<label htmlFor=''>
							Parent Category <span className='text-danger'>*</span>
						</label>
						<select
							name='category'
							id=''
							className='form-control'
							onChange={(e) => setCategory(e.target.value)}
						>
							<option>Please Select Parent Category </option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</div>
					<CategoryForm
						loading={loading}
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					{subCategories.filter(searched(keyword)).map((c) => (
						<CategoryItem
							key={c._id}
							item={c}
							removeItem={handleRemove}
							link='/admin/subcategory'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubCategoryCreate;
