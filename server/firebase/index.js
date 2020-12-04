/** @format */

import admin from 'firebase-admin';

// var serviceAccount = require('../config/fbServiceAccountKey.json');
import serviceAccount from '../config/fbServiceAccountKey.json';
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://ecommerce-f93f9.firebaseio.com',
});

export default admin;
