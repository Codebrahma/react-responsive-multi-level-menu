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
  fontSize
}) => {
  const [showMenuItems, changeShowMenuItems] = useState(false);

  function handleClickOutside(event, ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenuItems(false);
    }
  }
  const menubarRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', event =>
      handleClickOutside(event, menubarRef));
    return () => {
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event, menubarRef));
    };
  });

  const generateId = (passedData, level) => {
    if (level > 0 && passedData[0].value !== 'back') {
      passedData.unshift({
        value: 'back'
      });
    }
    for (let i = 0; i < passedData.length; i += 1) {
      passedData[i].id = Math.random()
        .toString(36)
        .substr(2, 9);
      if (passedData[i].items && passedData[i].items.length > 0) {
        generateId(passedData[i].items, (level += 1));
      }
    }
  };
  generateId(data, 0);

  const showItemsHandler = event => {
    event.stopPropagation();
    changeShowMenuItems(!showMenuItems);
  };

  const closeItemsHandler = () => {
    changeShowMenuItems(false);
  };

  return (
    <div
      className={`menu ${style}`}
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
        Data={data}
        textColor={textColor}
        width={menuItemsWidth}
      />
    </div>
  );
};

MenuBar.defaultProps = {
  data: [
    {
      value: 'No data found'
    }
  ],
  animation: ['slideIn', 'slideOut'],
  backgroundColor: '#4dccc4',
  textColor: 'white',
  burgerIconLineColor: 'white',
  menuItemsWidth: 300,
  style: '',
  burgerIconStyle: '',
  fontSize: 16
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
  fontSize: PropTypes.number
};

export default MenuBar;
