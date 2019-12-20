import React from 'react'

import ExampleComponent from 'cb-react-menubar'

require('react-dom')
window.React2 = require('react')
console.log(window.React1 === window.React2)

const App = () => {
  const menuItems = {
    value: 'menu-items',
    items: [
      {
        value: 'Fashion',
        items: [
          {
            value: 'back'
          },
          {
            value: 'Men',
            items: [
              {
                value: 'back'
              },
              {
                value: 'Shirts'
              }
            ]
          },
          {
            value: 'Women',
            items: [
              {
                value: 'back'
              },
              {
                value: 'Jackets'
              },
              {
                value: 'T-Shirts'
              },
              {
                value: 'Underwear'
              }
            ]
          },
          {
            value: 'Children'
          }
        ]
      },
      {
        value: 'Electronics',
        items: []
      },
      {
        value: 'Furnitures',
        items: []
      },
      {
        value: 'Jewelery&watches',
        items: []
      }
    ]
  }
  // const backgroundColor = 'green'
  // const textColor = 'white'
  const animation = ['slideIn', 'slideOut']

  return (
    <div style={{marginLeft: 100}} className='Main'>
      <h1>Hello google</h1>
      <ExampleComponent animation={animation} data={menuItems} menuItemsMaxHeight={300} menuItemsWidth={300} />
    </div>
  )
}
export default App
