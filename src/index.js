
import React from 'react'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const ReactDOM = require('react-dom')

ReactDOM.render(
  <React.StrictMode>
    <App data={this} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

/**
 *
  increaseDetector (){
    console.log('10%')
    const image = this.state.rawImage
    const formData = new FormData();
    formData.append('image', image);

  //   const twoData = this.state.initialImageData.map( data => {

  //     var x = data._box._x
  //     x += x * 0.10;

  //     var y = data._box._y
  //     y += y * 0.10;

  //     var width = data._box._width
  //     width += width * 0.10;

  //     var height = data._box._height
  //     height += height * 0.10;

  //     var instant = data._box

  //     const box = {...instant, ...{ _y: y, _x: x , _width: width, _height: height}}

  //     return {...data, ...{_box : box}}
  //  })

     fetch('http://localhost:1800/api/face/adjustFaceData',
      {
        method: 'POST',
        body: formData
      }).then(response => response.json())
      .then(data => {
         console.log(data)
      });
  }
 */
