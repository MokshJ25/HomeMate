import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Cleaning', image: '/images/cleaning.gif' },
  { name: 'Cooking', image: '/images/cooking.gif' },
  { name: 'Babysitting', image: '/images/babysitting.gif' },
  { name: 'Elderly Care', image: '/images/elderly-care.gif' },
];

const CategorySelection = () => {
  const navigate = useNavigate();

  const selectCategory = (category) => {
    navigate('/booking', { state: { category } });
  };

  return (
    <div style={{ padding: '50px 20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Select Service Category</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
        {categories.map(({ name, image }) => (
          <div
            key={name}
            className="card"
            onClick={() => selectCategory(name)}
            style={{ flex: '1 1 200px', cursor: 'pointer' }}
          >
            <img src={image} alt={`${name} service`} className="animated-image" />
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;