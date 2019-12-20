import React, { useState, useRef, useEffect } from 'react'
import { IoMdArrowDropleft } from 'react-icons/io'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import MenuItem from '../MenuItem/MenuItem'
import PropTypes from 'prop-type'

const MenuItems = props => {
  useEffect(() => {
    if (
      notificationRef.current &&
      notificationRef.current.offsetParent.offsetLeft >
        notificationRef.current.offsetParent.offsetWidth
    ) {
      setStyle('right')
    } else if (
      notificationRef.current &&
      notificationRef.current.offsetParent.offsetLeft <
        notificationRef.current.offsetParent.offsetWidth
    ) {
      setStyle('left')
    } else {
      setStyle(style)
    }
  })

  const [itemsToShow, setItemsToShow] = useState(props.Data)
  const [itemsStack, setItemsStack] = useState([props.Data])
  const [id, setId] = useState(props.Data.id)
  const [move, changeMove] = useState('next')
  const [style, setStyle] = useState(null)

  const notificationRef = useRef(null)

  const moveToNext = value => {
    const newItems = itemsToShow.items.find(item => item.value === value)

    if (
      newItems !== undefined &&
      'items' in newItems &&
      newItems.items.length > 0
    ) {
      setItemsToShow(newItems)
      setId(newItems.id)
      setItemsStack([...itemsStack, itemsToShow])
      changeMove('next')
    } else {
    }
  }

  const moveToPrevious = () => {
    const newItemsStack = [...itemsStack]
    const newItemsToShow = newItemsStack.pop()

    if (newItemsToShow !== undefined) {
      setItemsToShow(newItemsToShow)
      setId(newItemsToShow.id)
      setItemsStack(newItemsStack)
      changeMove('prev')
    }
  }

  const childFactoryCreator = classNames => child =>
    React.cloneElement(child, { classNames })

  const animation = []

  if (props.animation) {
    animation[0] = props.animation[0] ? props.animation[1] : 'slideIn'
    animation[1] = props.animation[0] ? props.animation[1] : 'slideOut'
  } else {
    animation[0] = 'slideIn'
    animation[1] = 'slideOut'
  }
  return (
    <TransitionGroup
      childFactory={childFactoryCreator(
        move === 'next' ? animation[0] : animation[1]
      )}
    >
      <CSSTransition
        timeout={300}
        in={true}
        appear={true}
        classNames='slideOut'
        key={id}
      >
        <div
          className={[
            'MenuItems',
            props.showMenuItems ? 'ShowMenuItems' : 'HideMenuItems'
          ].join(' ')}
          ref={notificationRef}
          onClick={event => {
            event.stopPropagation()
          }}
          style={
            style === 'right'
              ? {
                backgroundColor: props.color ? props.color : '#08cbc4',
                width: props.width ? props.width : 300,
                maxHeight: props.height ? props.height : 300,
                right: 0
              }
              : {
                backgroundColor: props.color ? props.color : '#08cbc4',
                width: props.width ? props.width : 500,
                maxHeight: props.height ? props.height : 300,
                left: 0
              }
          }
        >
          {itemsToShow.items.map(item => {
            if (item.value === 'back') {
              return (
                <div
                  className='Back'
                  onClick={() => moveToPrevious()}
                  id={item.id}
                >
                  <p className='BackArrow'>
                    <IoMdArrowDropleft />
                  </p>
                  <p
                    className='backButton'
                    style={{
                      color: props.textColor ? props.textColor : 'white'
                    }}
                  >
                    back
                  </p>
                </div>
              )
            } else {
              return (
                <MenuItem
                  id={item.id}
                  textColor={props.textColor}
                  value={item.value}
                  moveToNext={moveToNext}
                  nextValue={
                    item.hasOwnProperty('items') && item.items.length > 0
                  }
                />
              )
            }
          })}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

MenuItems.propTypes = {
  Data: PropTypes.object,
  animation: PropTypes.array,
  showMenuItems: PropTypes.boolean,
  color: PropTypes.any,
  textColor: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any
}

export default MenuItems
