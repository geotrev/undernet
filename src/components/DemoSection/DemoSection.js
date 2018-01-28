import React from 'react';
import './DemoSection.scss';

const DemoSection = (props) => {
  return (
    <div className="demo-section-wrapper grid">
      <div className="row">
        <div className="collapsed column">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default DemoSection;
