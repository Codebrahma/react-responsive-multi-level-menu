import React from "react"; // eslint-disable-line
import PropTypes from 'prop-types';

const MenuItem = ({ item, nextValue, moveToNext }) => (
  <div className="MenuItem" onClick={() => moveToNext(item)}>
    <p className="Value">{item.value}</p>
    <p className="NextArrow" style={{ display: nextValue ? 'block' : 'none' }}>
      {' '}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#44b7b1"
      >
        <path d="M6 0l12 12-12 12z" />
      </svg>
    </p>
  </div>
);
MenuItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  nextValue: PropTypes.bool.isRequired,
  moveToNext: PropTypes.func.isRequired
};

export default MenuItem;
