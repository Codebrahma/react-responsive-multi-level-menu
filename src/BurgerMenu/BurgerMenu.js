import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

const BurgerMenu = ({
  style, showItemsHandler, color, lineColor,
}) => {
  let classNames;
  if (style) {
    classNames = style;
  } else {
    classNames = 'BurgerMenu';
  }
  return (
    <div
      className={classNames}
      onClick={showItemsHandler}
      style={
        style
          ? null
          : { backgroundColor: color }
      }
    >
      <div
        className="line"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="line"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="line"
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
};
BurgerMenu.propTypes = {
  showItemsHandler: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  lineColor: PropTypes.string.isRequired,
};

export default BurgerMenu;
