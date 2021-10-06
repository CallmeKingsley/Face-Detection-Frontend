import './Canvas.css';
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import myImage from '../Component/image.jpeg'

export default class  componentName  extends PureComponent {
   static propTypes = {
    imageUrl: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    cordinate: PropTypes.array
   } 

   static defaultProps = {
     imageUrl: 'https://www.nicesnippets.com/image/imgpsh_fullsize.png',
     height: 600,
     width: 500,
     cordinate: []
   }

   constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
   }

   componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
   
    // var background = new Image();
    // background.src = myImage;

    // background.onload = function(){
    // ctx.drawImage(background,0,0);   
    // }

    //console.log(this.props.cordinate)

    this.props.cordinate.map( face =>{
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'green';
        ctx.strokeRect(face._box._x, face._box._y, face._box._width,face._box._height)
    })
   }

   render (){
       const {height, width, imageUrl} = this.props
       
      return(
        <div style={{ height: height, width: width, position: 'relative' }}>
            <canvas width={width} height={height} ref={this.canvasRef} className="canvas"/>
            <img width={width} height={height} src ={imageUrl} className="image"/>
        </div>
      )
   }
}