import React from 'react';
import PropTypes from 'prop-types';

const BurgerMenu = ({ style , showItemsHandler , color , lineColor }) => {
  let classNames
  if (style) {
    classNames = style
  } else {
    classNames = 'BurgerMenu'
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
        className='line'
        style={{ backgroundColor: lineColor}}
      />
      <div
        className='line'
        style={{ backgroundColor: lineColor}}
      />
      <div
        className='line'
        style={{ backgroundColor: lineColor}}
      />
    </div>
  )
}
BurgerMenu.propTypes = {
  showItemsHandler: PropTypes.any,
  color: PropTypes.any,
  style: PropTypes.string,
  lineColor: PropTypes.string
}

export default BurgerMenu
