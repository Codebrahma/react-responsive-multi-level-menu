import React, { useState, useRef, useEffect } from 'react'; //eslint-disable-line
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';

const MenuItems = ({
  Data,
  animation,
  showMenuItems,
  color,
  textColor,
  width,
  onClick
}) => {
  const [offset, setOffset] = useState(null);
  const menuItemsRef = useRef(null);
  useEffect(() => {
    if (
      menuItemsRef.current &&
      menuItemsRef.current.offsetParent.offsetLeft >
        menuItemsRef.current.offsetWidth
    ) {
      setOffset('right');
    } else if (
      menuItemsRef.current &&
      menuItemsRef.current.offsetParent.offsetLeft <
        menuItemsRef.current.offsetWidth
    ) {
      setOffset('left');
    }
  });

  const [itemsToShow, setItemsToShow] = useState(Data);
  const [itemsStack, setItemsStack] = useState([Data]);
  const [move, changeMove] = useState('next');
  const [id, setId] = useState(null);

  const changeMenuItems = (
    newItemsToShow,
    newItemsStack,
    updatedMove,
    updatedId
  ) => {
    setItemsToShow(newItemsToShow);
    setItemsStack(newItemsStack);
    changeMove(updatedMove);
    setId(updatedId);
  };

  const moveToNext = targetItem => {
    if (targetItem.items && targetItem.items.length > 0) {
      const newItems = itemsToShow.find(
        item => item.value === targetItem.value
      );

      if (
        newItems !== undefined &&
        'items' in newItems &&
        newItems.items.length > 0
      ) {
        changeMenuItems(
          newItems.items,
          [...itemsStack, itemsToShow],
          'next',
          Math.random()
            .toString(36)
            .substr(2, 9)
        );
      }
    } else if (onClick) {
      onClick(targetItem);
    }
  };

  const moveToPrevious = () => {
    const newItemsStack = [...itemsStack];
    const newItemsToShow = newItemsStack.pop();

    if (newItemsToShow !== undefined) {
      changeMenuItems(
        newItemsToShow,
        newItemsStack,
        'prev',
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    }
  };
  const childFactoryCreator = classNames => child =>
    React.cloneElement(child, { classNames });
  return (
    <TransitionGroup
      childFactory={childFactoryCreator(
        move === 'next' ? animation[0] : animation[1]
      )}
    >
      <CSSTransition timeout={300} key={id}>
        <div
          className={`menuItems ${
            showMenuItems ? 'showMenuItems' : 'hideMenuItems'
          }`}
          ref={menuItemsRef}
          onClick={event => {
            event.stopPropagation();
          }}
          style={{
            backgroundColor: color,
            width,
            color: textColor,
            right: offset === 'right' ? 0 : 'unset',
            left: offset === 'left' ? 0 : 'unset'
          }}
        >
          {itemsToShow.map(item => {
            const checkItem = item.value;
            if (checkItem === 'back') {
              return (
                <div
                  className="back"
                  key={Math.random()
                    .toString(36)
                    .substr(2, 9)}
                  onClick={() => moveToPrevious()}
                >
                  <p className="backArrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="rgba(212, 204, 198, 0.6)"
                    >
                      <path d="M3 12l18-12v24z" />
                    </svg>
                  </p>
                  <p className="backButton">{item.value}</p>
                </div>
              );
            }
            return (
              <MenuItem
                key={Math.random()
                  .toString(36)
                  .substr(2, 9)}
                textColor={textColor}
                item={item}
                moveToNext={moveToNext}
                nextValue={
                  item.hasOwnProperty('items') && item.items.length > 0
                }
              />
            );
          })}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

MenuItems.propTypes = {
  Data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  animation: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMenuItems: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default MenuItems;
