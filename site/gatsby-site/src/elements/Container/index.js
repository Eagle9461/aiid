import React from 'react';

export default function Container(props) {
  return (
    <>
      <div {...props} className={`tw-main-container ${props.classNames || ''}`}>
        {props.children}
      </div>
    </>
  );
}
