
# react-responsive-multi-level-menu

A react library which provides flexible and cool animated menubar with an easy to use API and a bunch of awesome features . Give it a try and you will love it for sure.


<p align="center"><img src="demo1.gif" alt="demo"></p>

## Install

```bash
npm install --save react-responsive-multi-level-menu
```

## Usage


### 1.Define the data

* Define the data(menu items) as per the given format , which you want to render in the Menubar.

```js
const menuItems = [
  { value: "Fashion", 
    items: [
            { value: "Men",
              items: [{ value: "Shirts" }] 
            }
           ] 
  },
  { value: "Electronics", items: [] },
  { value: "Furnitures", items: [] },
  { value: "Jewelery&watches", items: [] }
];
export default MenuItems;

```


### 2. Use the Menubar component anywhere in your code

Use the Menubar component anywhere and pass the props.

```js

import Menubar from "react-responsive-multi-level-menu";
import MenuItems from "../path/where/menuItems/present";

const app = () => {
  
  const animation=['slideIn' , 'slideOut']
  <div>
    <h1>This is Animated Menu-bar</h1>
    <Menubar data={MenuItems} animation={animation} color="#FF5733" className="menubar"/>
  </div>;
};


```

## Guide And Documentation

For the complete documentation . Click <a style="color:#cc3a38" href="https://react-responsive-multi-level-menu-docs.netlify.com/src-introduction">here.

## Live Preview

<a style="color:#cc3a38" href="https://react-responsive-multi-level-menu-demo.netlify.com/">Demo is worth thousand words</a>

