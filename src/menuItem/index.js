import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import RightArrow from '../assets/RightArrow';

const MenuItem = ({ item, nextValue, moveToNext, textColor }) => (
  <div className="menuItem" onClick={() => moveToNext(item)}>
    <p className="value">{item.value}</p>
    <p className="nextArrow" style={{ display: nextValue ? 'block' : 'none' }}>
      <RightArrow color={textColor} />
    </p>
  </div>
);
MenuItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  nextValue: PropTypes.bool.isRequired,
  moveToNext: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired
};

export default MenuItem;
