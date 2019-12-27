import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { IoMdArrowDropright } from 'react-icons/io';

const MenuItem = ({
  item, nextValue, moveToNext,
}) => (
  <div className="MenuItem" onClick={() => moveToNext(item)}>
    <p className="Value">
      {item.value}
    </p>
    <p className="NextArrow" style={{ display: nextValue ? 'block' : 'none' }}>
      {' '}
      <IoMdArrowDropright />
    </p>
  </div>
);
MenuItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  nextValue: PropTypes.bool.isRequired,
  moveToNext: PropTypes.func.isRequired,
};

export default MenuItem;
