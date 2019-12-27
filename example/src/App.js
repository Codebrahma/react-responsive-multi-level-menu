import React from "react";

import ExampleComponent from "cb-react-menubar";
import { Switch, Route } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const App = (props) => {
  const menuItems = [
    {
      value: "Fashion",
      items: [
        {
          value: "Men",
          items: [
            {
              value: "Shirts"
            }
          ]
        },
        {
          value: "Women",
          items: [
            {
              value: "Jackets"
            },
            {
              value: "T-Shirts"
            },
            {
              value: "Underwear"
            }
          ]
        },
        {
          value: "Children"
        }
      ]
    },
    {
      value: "Electronics",
      clickHandler:()=>{
        alert("hai")
      }
    },
    {
      value: "Furnitures",
      items: [],
    },
    {
      value: "Jewelery&watches",
      items: []
    }
  ];
  // const backgroundColor = 'green'
  // const textColor = 'white'
  const animation = ["slideIn", "slideOut"];

  return (
    <div style={{ marginLeft: 100 }} className="Main">
      <h1>Hello google</h1>
      <ExampleComponent data={menuItems} animation={animation} />
    </div>
  );
};
export default App;
