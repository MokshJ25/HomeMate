import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '50px 20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>About HomeMate</h2>
      <p>
        HomeMate is your trusted partner for home services. We connect you with verified and experienced maids for cleaning, cooking, babysitting, and elderly care.
      </p>
      <img
        src="/images/team-portrait.png"
        alt="Team of professional maids"
        className="animated-image"
        style={{ marginTop: '20px', maxWidth: '100%' }}
      />
    </div>
  );
};

export default About;