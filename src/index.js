import React, { useState, useEffect, useRef } from 'react'
import MenuItems from './MenuItems/MenuItems'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import './styles.css'
import PropTypes from 'prop-type'

const MenuBar = props => {
  useEffect(() => {
    document.addEventListener('mousedown', event =>
      handleClickOutside(event, menubarRef)
    )
  })

  function handleClickOutside(event, ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenuItems(false)
    }
  }

  const [showMenuItems, changeShowMenuItems] = useState(false)

  const menuItems = {
    value: 'menuItems',
    items: [
      {
        value: 'Send',
        items: [
          {
            value: 'Back'
          },
          {
            value: 'Data Props',
            items: [
              {
                value: 'Back'
              },
              {
                value: 'To Edit this'
              }
            ]
          }
        ]
      },
      {
        value: 'The',
        items: []
      },
      { value: 'Data' },
      { value: 'Props' }
    ]
  }

  let Data = {}
  if (props.data) {
    Data = props.data
  } else {
    Data = menuItems
  }

  const generateId = data => {
    data.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    for (let i = 0; data.items && i < data.items.length; i++) {
      generateId(data.items[i])
    }
  }
  generateId(Data)

  const showItemsHandler = event => {
    event.stopPropagation()

    changeShowMenuItems(!showMenuItems)
  }

  const closeItemsHandler = () => {
    changeShowMenuItems(false)
  }

  let classNames = ''
  if (props.style) {
    classNames = props.style
  } else {
    classNames = 'menu'
  }

  const menubarRef = useRef(null)

  return (
    <div className={classNames} ref={menubarRef} onClick={closeItemsHandler}>
      <BurgerMenu
        showItemsHandler={showItemsHandler}
        color={props.backgroundColor}
        style={props.burgerIconStyle}
        lineColor={props.burgerIconLineColor}
      />

      <MenuItems
        showMenuItems={showMenuItems}
        animation={props.animation}
        color={props.backgroundColor}
        Data={Data}
        textColor={props.textColor}
        width={props.menuItemsWidth}
        height={props.menuItemsMaxHeight}
      />
    </div>
  )
}

MenuBar.propTypes = {
  data: PropTypes.object,
  backgroundColor: PropTypes.string,
  animation: PropTypes.array,
  textColor: PropTypes.any,
  menuItemsWidth: PropTypes.any,
  menuItemsMaxHeight: PropTypes.any,
  burgerIconStyle: PropTypes.string,
  burgerIconLineColor: PropTypes.string,
  style: PropTypes.any
}

export default MenuBar
