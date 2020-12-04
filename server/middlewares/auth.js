/** @format */

import admin from '../firebase/index.js';
import User from '../models/User.js';

export const authCheck = async (req, res, next) => {
	//console.log(req.headers); //token
	try {
		const firebaseUser = await admin
			.auth()
			.verifyIdToken(req.headers.authtoken);
		console.log('authCheck user -->', firebaseUser);
		req.user = firebaseUser;
		next();
	} catch (err) {
		res.status(401).json({
			err: 'Invalid or expired token',
		});
	}
};

export const adminCheck = async (req, res, next) => {
	const { email } = req.user;
	const adminUser = await User.findOne({ email }).exec();
	if (adminUser.role !== 'admin') {
		res.status(403).json({
			err: 'Admin resource. Access Denied',
		});
	} else {
		next();
	}
};
