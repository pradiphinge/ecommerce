/** @format */

import React from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FileUpload = ({ formData, setFormData, setLoading, loading }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const fileUploadAndResize = (e) => {
		console.log(e.target.files);
		let files = e.target.files;
		let allUploadedImages = formData.images;
		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					'JPEG',
					100,
					0,
					(uri) => {
						console.log(uri);
						axios
							.post(
								`${process.env.REACT_APP_API}/images`,
								{ image: uri },
								{
									headers: {
										authtoken: user ? user.token : '',
									},
								}
							)
							.then((res) => {
								console.log('image upload res data=>', res.data);
								setLoading(false);
								allUploadedImages.push(res.data);
								setFormData({ ...formData, images: allUploadedImages });
							})
							.catch((err) => {
								console.log('Cloudinary Upload Error', err);
								setLoading(false);
							});
					},
					'base64'
				);
			}
		}
	};

	const removeImage = (public_id) => {
		setLoading(true);
		axios
			.post(
				`${process.env.REACT_APP_API}/image`,
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : '',
					},
				}
			)
			.then((res) => {
				setLoading(false);
				let filteredImages = formData.images.filter(
					(item) => item.public_id !== public_id
				);
				setFormData({ ...formData, images: filteredImages });
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	return (
		<>
			<div className='row'>
				{formData.images &&
					formData.images.map((image) => {
						return (
							<Badge
								count='X'
								key={image.public_id}
								onClick={() => removeImage(image.public_id)}
								style={{
									cursor: 'pointer',
								}}
							>
								<Avatar
									src={image.url}
									size={100}
									shape='square'
									className='ml-3'
								/>
							</Badge>
						);
					})}
			</div>
			<div className='row'>
				{loading ? (
					<LoadingOutlined className='text-danger h1' />
				) : (
					<label className='btn btn-primary'>
						Choose File
						<input
							type='file'
							multiple
							accept='image/*'
							hidden
							onChange={fileUploadAndResize}
							disabled={loading}
						/>
					</label>
				)}
			</div>
		</>
	);
};

export default FileUpload;
