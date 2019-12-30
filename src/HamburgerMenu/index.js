import React from "react"; // eslint-disable-line
import PropTypes from 'prop-types';

const HamBurgerMenu = ({ style, showItemsHandler, color, lineColor }) => (
  <div
    className={`burger-menu ${style}`}
    onClick={showItemsHandler}
    style={{ backgroundColor: color }}
  >
    <div className="line" style={{ backgroundColor: lineColor }} />
    <div className="line" style={{ backgroundColor: lineColor }} />
    <div className="line" style={{ backgroundColor: lineColor }} />
  </div>
);
HamBurgerMenu.propTypes = {
  showItemsHandler: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  lineColor: PropTypes.string.isRequired
};

export default HamBurgerMenu;
