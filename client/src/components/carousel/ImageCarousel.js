/** @format */

import React from 'react';
import { Card } from 'antd';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Broken from '../../images/broken.jpg';

const ImageCarousel = ({ images }) => {
	return images && images.length > 0 ? (
		<Carousel showArrows autoPlay infiniteLoop>
			{images.map((i) => (
				<img src={i.url} key={i.public_id}></img>
			))}
		</Carousel>
	) : (
		<Card
			cover={<img src={Broken} alt='Broken' className='mb-3 card-image'></img>}
		></Card>
	);
};

export default ImageCarousel;
