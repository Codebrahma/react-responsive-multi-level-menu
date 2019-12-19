import React, { useState } from 'react'
import MenuItems from './MenuItems/MenuItems'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import './styles.css'
import PropTypes from 'prop-type'

const MenuBar = props => {
  // props.Data.id='_' + Math.random().toString(36).substr(2, 9);

  const [showMenuItems, changeShowMenuItems] = useState(false)
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
  generateId(props.data)

  const showItemsHandler = event => {
    event.stopPropagation()
    changeShowMenuItems(!showMenuItems)
  }

  let classNames = ''
  if (props.style) {
    classNames = props.style
  } else {
    classNames = 'menu'
  }

  return (
    <div className={classNames}>
      <BurgerMenu showItemsHandler={showItemsHandler} color={props.backgroundColor} style={props.burgerIconStyle} />

      <MenuItems
        showMenuItems={showMenuItems}
        animation={props.animation}
        color={props.backgroundColor}
        Data={props.data}
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
  style: PropTypes.any
}

export default MenuBar
