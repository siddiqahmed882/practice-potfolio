const navItems = ['home', 'about', 'work', 'skills', 'testimonials', 'contact'];

const NavigationDots = ({ active }) => {
	return (
		<div className="app__navigation">
			{navItems.map((item, index) => (
				<a
					href={`#${item}`}
					key={item + index}
					className="app__navigation-dot"
					style={active === item ? { backgroundColor: '#313bac' } : {}}
					aria-label={`move to ${item} section`}
				>
					{' '}
				</a>
			))}
		</div>
	);
};

export default NavigationDots;
