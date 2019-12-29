import React, { useState, useRef, useEffect } from "react"; // eslint-disable-line
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem/MenuItem';

const MenuItems = ({
  Data,
  animation,
  showMenuItems,
  color,
  textColor,
  width
}) => {
  const [offset, setOffset] = useState(null);
  const menuItemsRef = useRef(null);
  console.log(animation)
  useEffect(() => {
    if (
      menuItemsRef.current &&
      menuItemsRef.current.offsetParent.offsetLeft >
        menuItemsRef.current.offsetParent.offsetWidth
    ) {
      setOffset('right');
    } else if (
      menuItemsRef.current &&
      menuItemsRef.current.offsetParent.offsetLeft <
        menuItemsRef.current.offsetParent.offsetWidth
    ) {
      setOffset('left');
    } else {
      setOffset(offset);
    }
  });

  const [itemsToShow, setItemsToShow] = useState(Data);
  const [itemsStack, setItemsStack] = useState([Data]);
  const [move, changeMove] = useState('next');

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
        setItemsToShow(newItems.items);
        setItemsStack([...itemsStack, itemsToShow]);
        changeMove('next');
      }
    } else if (targetItem.onClick) {
      targetItem.onClick();
    }
  };

  const moveToPrevious = () => {
    const newItemsStack = [...itemsStack];
    const newItemsToShow = newItemsStack.pop();

    if (newItemsToShow !== undefined) {
      setItemsToShow(newItemsToShow);
      setItemsStack(newItemsStack);
      changeMove('prev');
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
      <CSSTransition
        timeout={300}
        key={Math.random()
          .toString(36)
          .substr(2, 9)}
      >
        <div
          className={`MenuItems ${
            showMenuItems ? 'ShowMenuItems' : 'HideMenuItems'
          }`}
          ref={menuItemsRef}
          onClick={event => {
            event.stopPropagation();
          }}
          style={
            offset === 'right'
              ? {
                  backgroundColor: color,
                  width,
                  color: textColor,
                  right: 0
                }
              : {
                  backgroundColor: color,
                  width,
                  color: textColor,
                  left: 0
                }
          }
        >
          {itemsToShow.map(item => {
            const checkItem = item.value;
            if (checkItem === 'back') {
              return (
                <div
                  className="Back"
                  key={item.id}
                  onClick={() => moveToPrevious()}
                >
                  <p className="BackArrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
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
                key={item.id}
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
  Data: PropTypes.shape({}).isRequired,
  animation: PropTypes.array.isRequired,
  showMenuItems: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  width: PropTypes.any.isRequired
};

export default MenuItems;
