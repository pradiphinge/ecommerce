/** @format */

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: 'Name is required',
			minlength: [2, 'too short'],
			maxlength: [32, 'too long'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
	},
	{ timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
