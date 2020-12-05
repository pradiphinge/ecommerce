/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';

import CategoryItem from './CategoryItem';
import {
	getCategories,
	createCategory,
	removeCategory,
} from '../../../actions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [keyword, setKeyword] = useState('');
	const loadCategories = useCallback(
		() => getCategories().then((c) => setCategories(c.data)),
		[]
	);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	const handleRemove = async (slug) => {
		if (
			window.confirm(
				'This will permanently delete this category.Do you want to proceed ? '
			)
		) {
			setLoading(true);
			removeCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.success(`Category "${res.data.name}"  is deleted`);
					loadCategories();
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
			const res = await createCategory({ name }, user.token);
			if (res) {
				console.log(res);
				setLoading(false);
				setName('');
				loadCategories();
				toast.success(`Category "${res.data.name}" created!`);
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
					<h4>Create Category</h4>
					<CategoryForm
						loading={loading}
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					{categories.filter(searched(keyword)).map((c) => (
						<CategoryItem key={c._id} item={c} removeItem={handleRemove} />
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
