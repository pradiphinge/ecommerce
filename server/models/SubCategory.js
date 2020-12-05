/** @format */

import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
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
		parent: {
			type: mongoose.ObjectId,
			ref: 'Category',
			required: true,
		},
	},
	{ timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subcategorySchema);

export default SubCategory;
