import React from 'react'
import PropTypes from 'prop-types'

const BurgerMenu = props => {
  let classNames
  if (props.style) {
    classNames = props.style
  } else {
    classNames = 'BurgerMenu'
  }
  return (
    <div
      className={classNames}
      onClick={props.showItemsHandler}
      style={
        props.style
          ? null
          : { backgroundColor: props.color ? props.color : '#4dccc4' }
      }
    >
      <div
        className='line'
        style={{ backgroundColor: props.lineColor ? props.lineColor : 'white' }}
      />
      <div
        className='line'
        style={{ backgroundColor: props.lineColor ? props.lineColor : 'white' }}
      />
      <div
        className='line'
        style={{ backgroundColor: props.lineColor ? props.lineColor : 'white' }}
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
