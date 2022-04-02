import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { client, urlFor } from '../../client';
import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';

import './testimonials.scss';

const Testimonials = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const brandsQuery = '*[_type == "brands"]';
    const testimonialsQuery = '*[_type == "testimonials"]';

    client
      .fetch(brandsQuery)
      .then(setBrands)
      .catch(err => console.log(err.message));

    client
      .fetch(testimonialsQuery)
      .then(setTestimonials)
      .catch(err => console.log(err.message));
  }, []);

  const currTestimonial = testimonials.length ? testimonials[currentIndex] : undefined;

  const handleClick = (index) => setCurrentIndex(index);

  return (
    <>
      {currTestimonial && (
        <>
          <div className="app__flex app__testimonial-item">
            <img src={urlFor(currTestimonial.image)} alt={currTestimonial.name} />
            <div className="app__testimonial-content">
              <p className="p-text">{currTestimonial.feedback}</p>
              <div>
                <h4 className="bold-text">{currTestimonial.name}</h4>
                <p className="p-text">{currTestimonial.company}</p>
              </div>
            </div>
          </div>
          <div className="app__testimonial-btns app__flex">
            <HiChevronLeft
              className='testimonial-btn'
              role="button"
              aria-label="navigate to previous testimonial"
              onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
            />
            <HiChevronRight
              className='testimonial-btn'
              role="button"
              aria-label="navigate to next testimonial"
              onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
            />
          </div>
        </>
      )}
      <div className="app__testimonial-brands app__flex">
        {brands.map(brand => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonials, 'app__testimonial'),
  'testimonials',
  'app__primarbg',
);
