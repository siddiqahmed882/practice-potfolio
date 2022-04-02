import { useState } from 'react';

import { client } from '../../client';

import { images } from '../../constants';

import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';

import './footer.scss';

const Footer = () => {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		const contact = {
			_type: 'contact',
			name: formData.name,
			email: formData.email,
			message: formData.message,
		};

		client
			.create(contact)
			.then(() => {
				setIsLoading(false);
				setIsFormSubmitted(true);
			})
			.catch((err) => console.log(err.message));

		setIsLoading(false);
	};
	return (
		<>
			<h2 className="head-text">Take a coffee and chat with me</h2>
			<div className="app__footer-cards">
				<div className="app__footer-card">
					<img src={images.email} alt="email" />
					<a href="mailto:siddiqahmed882@gmail.com" className="p-text">
						siddiqahmed882@gmail.com
					</a>
				</div>
				<div className="app__footer-card">
					<img src={images.mobile} alt="" />
					<a href="tel: +923048349985" className="p-text">
						03048349985
					</a>
				</div>
			</div>
			{!isFormSubmitted ? (
				<div className="app__footer-form app__flex">
					<form onSubmit={handleSubmit}>
						<div className="app__flex">
							<input
								className="p-text"
								type="text"
								name="name"
								aria-label="Please Enter Your Name"
								placeholder="Please Enter Your Name"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="app__flex">
							<input
								className="p-text"
								type="email"
								name="email"
								aria-label="Please Enter Your Email"
								placeholder="Please Enter Your Email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<textarea
								className="p-text"
								name="message"
								aria-label="Please Enter Your Message"
								placeholder="Please Enter Your Message"
								value={formData.message}
								onChange={handleInputChange}
							/>
						</div>
						<button type="submit" className="p-text">
							{isLoading ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				</div>
			) : (
				<div>
					<h3 className="head-text">Thank you for getting in touch</h3>
				</div>
			)}
		</>
	);
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');
