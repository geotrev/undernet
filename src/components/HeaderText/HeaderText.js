import React from 'react';
import './HeaderText.scss';

const HeaderText = (props) => {
  return (
    <div className="header-text-wrapper xsmall-12 collapsed columns">
      <h3 className="section-header">
        {props.children}
      </h3>
    </div>
  );
}

export default HeaderText;
