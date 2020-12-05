/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';

import { getCategory, updateCategory } from '../../../actions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	const loadCategory = useCallback(
		() => getCategory(match.params.slug).then((c) => setName(c.data.name)),
		[match.params.slug]
	);

	useEffect(() => {
		loadCategory(match.params.slug);
	}, [loadCategory, match.params.slug]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await updateCategory(match.params.slug, { name }, user.token);
			if (res) {
				console.log(res);
				setLoading(false);
				setName('');

				toast.success(`Category "${res.data.name}" updated!`);
				history.push('/admin/category');
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
					<h4>Update Category</h4>
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

export default CategoryUpdate;
