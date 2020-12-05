/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';

import CategoryItem from '../category/CategoryItem';
import {
	getSubCategory,
	updateSubCategory,
} from '../../../actions/subcategory';

import { getCategories } from '../../../actions/category';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCategoryUpdate = ({ match, history }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	const [category, setCategory] = useState('');

	const loadCategories = useCallback(
		() => getCategories().then((c) => setCategories(c.data)),
		[]
	);
	const loadSubCategory = useCallback(
		() =>
			getSubCategory(match.params.slug).then((s) => {
				setName(s.data.name);
				setCategory(s.data.parent);
			}),
		[]
	);

	useEffect(() => {
		loadCategories();
		loadSubCategory(match.params.slug);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await updateSubCategory(
				match.params.slug,
				{ name, parent: category },
				user.token
			);
			if (res) {
				console.log(res);
				setLoading(false);
				setName('');
				history.push('/admin/subcategory');
				toast.success(`Sub Category "${res.data.name}" updated!`);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
			if (err.response.status === 400) toast.error(err.response.data);
			else if (err.response.status === 500)
				toast.error('Server Failed to respond.');
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4>Update Sub Category</h4>
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
									<option
										key={c._id}
										value={c._id}
										selected={c._id === category}
									>
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
				</div>
			</div>
		</div>
	);
};

export default SubCategoryUpdate;
