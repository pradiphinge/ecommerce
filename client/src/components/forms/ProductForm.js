/** @format */

import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const ProductForm = ({
	handleSubmit,
	handleChange,
	formData,
	setFormData,
	handleCategoryChange,
	subOptions,
	showSubs,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Title</label>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label>Description</label>
				<input
					type='text'
					name='description'
					value={formData.description}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label>Category</label>
				<select
					name='category'
					onChange={handleCategoryChange}
					className='form-control'
					required
				>
					<option value=''>Please Select</option>
					{formData.categories.length > 0 &&
						formData.categories.map((c) => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			<div>
				<label>Sub Categories</label>
				<Select
					mode='multiple'
					style={{ width: '100%' }}
					placeholder='Please select'
					value={formData.subcategories}
					onChange={(value) =>
						setFormData({ ...formData, subcategories: value })
					}
				>
					{subOptions.length &&
						subOptions.map((s) => (
							<Option key={s._id} value={s._id}>
								{s.name}
							</Option>
						))}
				</Select>
			</div>

			<div className='form-group'>
				<label>Price</label>
				<input
					type='number'
					name='price'
					value={formData.price}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label>Shipping</label>
				<select
					name='shipping'
					onChange={handleChange}
					className='form-control'
					required
				>
					<option value=''>Please Select</option>
					<option value='No'>No</option>
					<option value='Yes'>Yes</option>
				</select>
			</div>
			<div className='form-group'>
				<label>Quantity</label>
				<input
					type='number'
					name='quantity'
					value={formData.quantity}
					onChange={handleChange}
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label>Color</label>
				<select
					name='color'
					onChange={handleChange}
					className='form-control'
					required
				>
					<option value=''>Please Select</option>
					{formData.colors.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>
			<div className='form-group'>
				<label>Brand</label>
				<select
					name='brand'
					onChange={handleChange}
					className='form-control'
					required
				>
					<option>Please Select</option>
					{formData.brands.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
				{subOptions ? subOptions.length : 'no subs yet'}
			</div>
			<button className='btn btn-outline-info'>Save</button>
		</form>
	);
};

export default ProductForm;
