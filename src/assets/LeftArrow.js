import React from 'react'; // eslint-disable-line

const LeftArrow = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="16"
    viewBox="0 0 24 24"
    fill={color}
    opacity={0.5}
  >
    <path d="M3 12l18-12v24z" />
  </svg>
);

export default LeftArrow;
