import React from 'react'
import PropTypes from 'prop-type'

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
      onClick={event => props.showItemsHandler(event)}
      style={props.style ? null : { backgroundColor: props.color ? props.color : '#4dccc4' }}
    >
      <div className='line' />
      <div className='line' />
      <div className='line' />
    </div>
  )
}
BurgerMenu.propTypes = {
  showItemsHandler: PropTypes.any,
  color: PropTypes.any,
  style: PropTypes.string
}

export default BurgerMenu
