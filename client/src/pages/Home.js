/** @format */

import React from 'react';
import NewArrivals from '../components/home/NewArrivals';
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';
const Home = () => {
	return (
		<>
			<div className='jumbotron text-danger h1 font-weight-bold text-center'>
				<Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
			</div>

			<div className='jumbotron display-4 text-center p-3 mt-5 mb-5'>
				New Arrivals
			</div>
			<NewArrivals />

			<div className='jumbotron display-4 text-center p-3 mt-5 mb-5'>
				Best Sellers
			</div>
			<BestSellers />

			<br />
			<br />
		</>
	);
};

export default Home;
