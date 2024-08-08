import React from 'react';
import '../styles/AboutUsCardStyle.css';

const AboutUsCard: React.FC = () => {
  return (
    <div className="about-us-card">
      <div className="aboutus-card-body">
        <h2 className="header">We are,</h2>
        
        <p>
          Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
        </p>
        <p>
          Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <p>
          Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem.
        </p>
        <p>
          Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </p>
      </div>
    </div>
  );
};

export default AboutUsCard;
