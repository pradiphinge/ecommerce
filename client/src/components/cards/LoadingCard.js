/** @format */

import React from 'react';
import { Card, Skeleton } from 'antd';
const LoadingCard = ({ count }) => {
	const cards = () => {
		let totalCards = [];
		for (let index = 0; index < count; index++) {
			totalCards.push(
				<Card key={index} className='col-md-4'>
					<Skeleton active></Skeleton>
				</Card>
			);
		}
		return totalCards;
	};

	return <div className='row pb-5'>{cards()}</div>;
};

export default LoadingCard;
