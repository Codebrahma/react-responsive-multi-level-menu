import React from "react"; // eslint-disable-line
import PropTypes from 'prop-types';
import RightArrow from '../Assets/RightArrow';

const MenuItem = ({ item, nextValue, moveToNext }) => (
  <div className="menuItem" onClick={() => moveToNext(item)}>
    <p className="value">{item.value}</p>
    <p className="nextArrow" style={{ display: nextValue ? 'block' : 'none' }}>
      <RightArrow />
    </p>
  </div>
);
MenuItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  nextValue: PropTypes.bool.isRequired,
  moveToNext: PropTypes.func.isRequired
};

export default MenuItem;
