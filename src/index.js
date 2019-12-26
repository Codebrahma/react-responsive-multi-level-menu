import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MenuItems from './MenuItems/MenuItems';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import './styles.css';

const MenuBar = ({
  data,
  backgroundColor,
  textColor,
  burgerIconLineColor,
  burgerIconStyle,
  style,
  animation,
  menuItemsWidth,
  menuItemsMaxHeight,
  fontSize,
}) => {
  const [showMenuItems, changeShowMenuItems] = useState(false);

  function handleClickOutside(event, ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenuItems(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event, menubarRef));
  });

  const Data = {
    value: 'MenuItems',
    items: data,
  };

  const generateId = (passedData, level) => {
    passedData.id = `_${ // eslint-disable-line
      Math.random()
        .toString(36)
        .substr(2, 9)}`;
    if (level > 0) {
      if (passedData.items) {
        if (passedData.items[0]) {
          if (passedData.items[0].value !== 'back') {
            passedData.items.unshift({
              value: 'back',
            });
          }
        }
      }
    }
    level += 1;
    for (let i = 0; data.items && i < data.items.length; i++) {
      generateId(data.items[i], level);
    }
  };
  generateId(Data, 0);

  const showItemsHandler = (event) => {
    event.stopPropagation();

    changeShowMenuItems(!showMenuItems);
  };

  const closeItemsHandler = () => {
    changeShowMenuItems(false);
  };

  let classNames = '';
  if (style) {
    classNames = [style, 'menu'].join(' ');
  } else {
    classNames = 'menu';
  }

  const menubarRef = useRef(null);

  return (
    <div
      className={classNames}
      ref={menubarRef}
      onClick={closeItemsHandler}
      style={{ fontSize: fontSize || 16 }}
    >
      <BurgerMenu
        showItemsHandler={showItemsHandler}
        color={backgroundColor}
        style={burgerIconStyle}
        lineColor={burgerIconLineColor}
      />

      <MenuItems
        showMenuItems={showMenuItems}
        animation={animation}
        color={backgroundColor}
        Data={Data}
        textColor={textColor}
        width={menuItemsWidth}
        height={menuItemsMaxHeight}
      />
    </div>
  );
};

MenuBar.defaultProps = {
  data: [
    {
      value: 'Send',
      items: [
        {
          value: 'Data Props',
          items: [
            {
              value: 'To Edit this',
            },
          ],
        },
      ],
    },
    {
      value: 'The',
    },
    { value: 'Data' },
    { value: 'Props' },
  ],
  animation: ['slideIn', 'slideOut'],
  backgroundColor: '#4dccc4',
  textColor: 'white',
  burgerIconLineColor: 'white',
  menuItemsWidth: 300,
  menuItemsMaxHeight: 300,
};

MenuBar.propTypes = {
  data: PropTypes.array,
  backgroundColor: PropTypes.string,
  animation: PropTypes.array,
  textColor: PropTypes.any,
  menuItemsWidth: PropTypes.any,
  menuItemsMaxHeight: PropTypes.any,
  burgerIconStyle: PropTypes.string,
  burgerIconLineColor: PropTypes.string,
  style: PropTypes.any,
  fontSize: PropTypes.any,
};

export default MenuBar;
