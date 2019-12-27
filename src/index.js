import React, { useState, useEffect, useRef } from "react"; // eslint-disable-line
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
  fontSize,
}) => {
  const [showMenuItems, changeShowMenuItems] = useState(false);

  function handleClickOutside(event, ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenuItems(false);
    }
  }
  const menubarRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event, menubarRef));
    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutside(event, menubarRef));
    };
  });

  const Data = {
    value: 'MenuItems',
    items: data,
  };

  const generateId = (passedData, level) => {
    passedData.id = `_${
      Math.random()
        .toString(36)
        .substr(2, 9)
    }`;

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
    for (let i = 0; passedData.items && i < passedData.items.length; i += 1) {
      generateId(passedData.items[i], level);
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

  return (
    <div
      className={classNames}
      ref={menubarRef}
      onClick={closeItemsHandler}
      style={{ fontSize }}
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
  style: '',
  burgerIconStyle: '',
  fontSize: 16,
};

MenuBar.propTypes = {
  data: PropTypes.array,
  backgroundColor: PropTypes.string,
  animation: PropTypes.array,
  textColor: PropTypes.string,
  menuItemsWidth: PropTypes.any,
  burgerIconStyle: PropTypes.string,
  burgerIconLineColor: PropTypes.string,
  style: PropTypes.string,
  fontSize: PropTypes.number,
};

export default MenuBar;
