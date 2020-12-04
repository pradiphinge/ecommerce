/** @format */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: String,
		picture: String,
		email: {
			type: String,
			required: true,
			index: true,
		},
		role: {
			type: String,
			default: 'subscriber',
		},
		cart: {
			type: Array,
			default: [],
		},
		address: String,
		wishlist: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Product',
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
