import './App.css';
import React, { Component } from "react";
import ConvasComponent from './Component/Canvas'
import {increase_Head,prediction_image,subjectPrediction} from './Helper'


function RenderImage ({onClickFunc,  displayText, imageUrl,height, width,cordinate, showBtn =false , btnText ='prediction'   }) {
    return(
      <div>
           <h3>{displayText}</h3>
           <ConvasComponent 
            imageUrl = {imageUrl}
            height = {height}
            width  = {width}
            cordinate  = {cordinate}
          />
          {showBtn && <button onClick={() => onClickFunc()}> {btnText}</button>}
      </div>
    )
}
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      showInitial: false,
      showInitialResult: false,
      showPredictions: false,
      showBigHead: false,
      rawImage: null,
      data: null
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.increaseDetector = this.increaseDetector.bind(this);
    this.predictionDetector = this.predictionDetector.bind(this);
  }

  
  onImageChange = event => {
    const formData = new FormData();
    
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
        rawImage: img
      });
      formData.append('image', img);
   
      fetch('http://localhost:1800/api/face/findFaceData',
      { 
        method: 'POST',
        body: formData
      }).then(response => response.json())
      .then(data => {
         this.setState({
          showInitialResult: true,
          initialImage: data.data.url,
          data: increase_Head(data.data.data)
         })
      });
    }
  }

  increaseDetector (){
    prediction_image(this.state.data)
    subjectPrediction(this.state.data)
    this.setState({
      showBigHead: true,
     })
  }
 
  predictionDetector(){
    this.setState({
      showPredictions: true,
     })
  }

  render(){
    const {showInitialResult,showBigHead, data,image, showPredictions} = this.state

    var height  = 0
    var width = 0

    if(data){
        height = data[0]._imageDims._height
        width = data[0]._imageDims._width
    }
  
    return (
      <div className="App">
        <div>
          <div className="upload-btn-dv">
            <input type="file" className="file-input" name="ImageStyle" onChange={this.onImageChange}/>
          </div>
          <div className="display-img-dv">
          <h3>original Image</h3>
            <img src={image} />
          </div>
        </div>
        { showInitialResult && 
        <div>
          <div>
          <h3>Face Detection</h3>
             <img src={this.state.initialImage} />
          </div>
          <div>
             <button onClick={this.increaseDetector}> increase head</button>
          </div>
        </div>
        }
        { showBigHead && 
          <RenderImage 
          displayText = {'increased heads'}
          imageUrl ={image}
          height ={height} 
          width ={width} 
          cordinate ={data}
          onClickFunc = {this.predictionDetector}
          showBtn ={true}
          />
        
        }
        { showPredictions && 
          <RenderImage 
          displayText = {'Relative'}
          imageUrl ={image}
          height ={height} 
          width ={width} 
          cordinate ={prediction_image(data)}
          />
        }

      { showPredictions && 
          <RenderImage 
          displayText = {'Subjective'}
          imageUrl ={image}
          height ={height} 
          width ={width} 
          cordinate ={subjectPrediction(data)}
          />
        }

      { showPredictions &&
        <RenderImage 
          displayText = {'Subjective square'}
          imageUrl ={image}
          height ={height} 
          width ={width} 
          cordinate ={prediction_image(subjectPrediction(data))}
        />
      }
      </div>
    );
  }
}

export default App;
