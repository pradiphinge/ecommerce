/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
	console.log(product);
	const {
		price,
		category,
		subcategories,
		shipping,
		sold,
		color,
		quantity,
		brand,
	} = product;
	return (
		<ul className='list-group'>
			<li className='list-group-item'>
				Price{' '}
				<span className='label label-default label-pill pull-xs-right'>
					₹ {price}
				</span>
			</li>
			{category && (
				<li className='list-group-item'>
					Category{' '}
					<Link
						to={`/category/${category.slug}`}
						className='label label-default label-pill pull-xs-right'
					>
						{category.name}
					</Link>
				</li>
			)}
			{subcategories && (
				<li className='list-group-item'>
					{' '}
					Sub Categories
					{subcategories.map((s) => (
						<Link
							className='label label-default label-pill pull-xs-right'
							key={s._id}
							to={`/subcategory/${s.slug}`}
						>
							{s.name}
						</Link>
					))}
				</li>
			)}
			<li className='list-group-item'>
				Shipping{' '}
				<span className='label label-default label-pill pull-xs-right'>
					{shipping}
				</span>
			</li>
			<li className='list-group-item'>
				Color{' '}
				<span className='label label-default label-pill pull-xs-right'>
					{color}
				</span>
			</li>
			<li className='list-group-item'>
				Brand{' '}
				<span className='label label-default label-pill pull-xs-right'>
					{brand}
				</span>
			</li>
			<li className='list-group-item'>
				Available{' '}
				<span className='label label-default label-pill pull-xs-right'>
					{quantity}
				</span>
			</li>
			<li className='list-group-item'>
				Sold{' '}
				<span className='label label-default label-pill pull-xs-right'>
					{sold}
				</span>
			</li>
		</ul>
	);
};

export default ProductListItems;
