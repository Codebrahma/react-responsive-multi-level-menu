import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropleft } from 'react-icons/io';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem/MenuItem';

const MenuItems = ({
  Data,
  animation,
  showMenuItems,
  color,
  textColor,
  width,
  height,
}) => {
  const [style, setStyle] = useState(null);
  const notificationRef = useRef(null);
  useEffect(() => {
    if (
      notificationRef.current
      && notificationRef.current.offsetParent.offsetLeft
        > notificationRef.current.offsetParent.offsetWidth
    ) {
      setStyle('right');
    } else if (
      notificationRef.current
      && notificationRef.current.offsetParent.offsetLeft
        < (notificationRef.current.offsetParent.offsetWidth)
    ) {
      setStyle('left');
    } else {
      setStyle(style);
    }
  });

  const [itemsToShow, setItemsToShow] = useState(Data);
  const [itemsStack, setItemsStack] = useState([Data]);
  const [id, setId] = useState(Data.id);
  const [move, changeMove] = useState('next');

  const moveToNext = (value) => {
    const newItems = itemsToShow.items.find((item) => item.value === value);

    if (
      newItems !== undefined
      && 'items' in newItems
      && newItems.items.length > 0
    ) {
      setItemsToShow(newItems);
      setId(newItems.id);
      setItemsStack([...itemsStack, itemsToShow]);
      changeMove('next');
    }
  };

  const moveToPrevious = () => {
    const newItemsStack = [...itemsStack];
    const newItemsToShow = newItemsStack.pop();

    if (newItemsToShow !== undefined) {
      setItemsToShow(newItemsToShow);
      setId(newItemsToShow.id);
      setItemsStack(newItemsStack);
      changeMove('prev');
    }
  };

  const childFactoryCreator = (classNames) => (child) => React.cloneElement(child, { classNames });

  return (
    <TransitionGroup
      childFactory={childFactoryCreator(
        move === 'next' ? animation[0] : animation[1],
      )}
    >
      <CSSTransition timeout={300} in appear classNames="slideOut" key={id}>
        <div
          className={[
            'MenuItems',
            showMenuItems ? 'ShowMenuItems' : 'HideMenuItems',
          ].join(' ')}
          ref={notificationRef}
          onClick={(event) => {
            event.stopPropagation();
          }}
          style={
            style === 'right'
              ? {
                backgroundColor: color,
                width,
                maxHeight: height,
                right: 0,
              }
              : {
                backgroundColor: color,
                width,
                maxHeight: height,
                left: 0,
              }
          }
        >
          {itemsToShow.items.map((item) => {
            const checkItem = item.value.toUpperCase();
            if (checkItem === 'BACK') {
              return (
                <div
                  className="Back"
                  key={item.id}
                  onClick={() => moveToPrevious()}
                >
                  <p className="BackArrow">
                    <IoMdArrowDropleft />
                  </p>
                  <p
                    className="backButton"
                    style={{
                      color: textColor,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              );
            }
            return (
              <MenuItem
                key={item.id}
                textColor={textColor}
                value={item.value}
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
  Data: PropTypes.object,
  animation: PropTypes.array,
  showMenuItems: PropTypes.bool,
  color: PropTypes.any,
  textColor: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
};

export default MenuItems;
