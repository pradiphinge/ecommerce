/** @format */
import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				err: 'User not found',
			});
		}
	} catch (err) {
		res.status(500).send('Server Error');
	}
};

export const createOrUpdateUser = async (req, res) => {
	try {
		const { email, name, picture } = req.user;
		const user = await User.findOneAndUpdate(
			{ email },
			{ name, picture },
			{ new: true }
		);
		if (user) {
			res.status(201).json(user);
		} else {
			const newUser = await new User({
				name,
				email,
				picture,
			}).save();
			res.status(201).json(newUser);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			err: 'Server Error',
		});
	}
};
