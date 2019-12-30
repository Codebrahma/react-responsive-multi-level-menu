import React, { useState, useEffect, useRef } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import MenuItems from './MenuItems';
import HamburgerMenu from './HamburgerMenu';
import './Style.scss';

const MenuBar = ({
  data,
  backgroundColor,
  textColor,
  iconColor,
  hamBurgerClassName,
  className,
  animation,
  optionContainerWidth
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
      handleClickOutside(event, menubarRef)
    );
    return () => {
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event, menubarRef)
      );
    };
  });

  const generateBack = (passedData, level) => {
    if (level > 0 && passedData[0].value !== 'back') {
      passedData.unshift({
        value: 'back'
      });
    }
    for (let i = 0; i < passedData.length; i += 1) {
      if (passedData[i].items && passedData[i].items.length > 0) {
        generateBack(passedData[i].items, (level += 1));
      }
    }
  };
  generateBack(data, 0);

  const showItemsHandler = event => {
    event.stopPropagation();
    changeShowMenuItems(!showMenuItems);
  };

  const closeItemsHandler = () => {
    changeShowMenuItems(false);
  };

  return (
    <div
      className={`menu ${className}`}
      ref={menubarRef}
      onClick={closeItemsHandler}
    >
      <HamburgerMenu
        showItemsHandler={showItemsHandler}
        color={backgroundColor}
        style={hamBurgerClassName}
        lineColor={iconColor}
      />

      <MenuItems
        showMenuItems={showMenuItems}
        animation={animation}
        Data={data}
        color={backgroundColor}
        textColor={textColor}
        width={optionContainerWidth}
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
  iconColor: 'white',
  optionContainerWidth: 300,
  className: '',
  hamBurgerClassName: ''
};

MenuBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  animation: PropTypes.arrayOf(PropTypes.string),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  optionContainerWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  hamBurgerClassName: PropTypes.string,
  iconColor: PropTypes.string,
  className: PropTypes.string
};

export default MenuBar;
