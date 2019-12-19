import React from 'react'
import PropTypes from 'prop-type'
import { IoMdArrowDropright } from 'react-icons/io'

const MenuItem = props => {
  return (
    <div className='MenuItem' onClick={() => props.moveToNext(props.value)}>
      <p className='Value' style={{ color: props.textColor ? props.textColor : 'white' }}>
        {props.value}
      </p>
      <p
        className='NextArrow'
        style={{ display: props.nextValue ? 'block' : 'none' }}
      >
        {' '}
        <IoMdArrowDropright />
      </p>
    </div>
  )
}
MenuItem.propTypes = {
  value: PropTypes.any,
  nextValue: PropTypes.any,
  moveToNext: PropTypes.func,
  textColor: PropTypes.any
}

export default MenuItem
