/** @format */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: 'product title is required',
			minlength: [2, 'too short'],
			maxlength: [32, 'too long'],
			text: true,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		description: {
			type: String,
			trim: true,
			text: true,
			maxlength: 2000,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
			text: true,
			maxlength: 32,
		},
		category: {
			type: mongoose.ObjectId,
			ref: 'Category',
		},
		subcategories: [
			{
				type: mongoose.ObjectId,
				ref: 'SubCategory',
			},
		],
		quantity: Number,
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		shipping: {
			type: String,
			enum: ['Yes', 'No'],
		},
		color: {
			type: String,
			enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
		},
		brand: {
			type: String,
			enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
		},
		ratings: [
			{
				star: Number,
				postedBy: {
					type: mongoose.ObjectId,
					ref: 'User',
				},
			},
		],
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
