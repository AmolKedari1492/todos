// require('normalize.css/normalize.css');
require('../styles/App.css');

import React from 'react';

import Pencil from '../images/pencil.png';

class AppComponent extends React.Component {

  constructor() {
    // this.imageRef = new Ref();
    super();
    this.state = {
      url: null,
      coordinates: []
    }
  }

  onChange = () => {
    // const files = Array.from(e.target.files);
    const files = this.refs.file.files;
    let file = files[0];
    // let reader = new FileReader();
    // let url = reader.readAsDataURL(file);
    let url = URL.createObjectURL(file);
    this.setState({
      url
    })
  }

  getCoordinates = (event, that) => {
    let x = event.pageX //- that.offsetLeft;
    let  y = event.pageY //- that.offsetTop;
    let coordinates = this.state.coordinates;
    let coordinate = {x, y, height: 30, width: 30};
    coordinates.push(coordinate);
    // this.displayPointCb(coordinate, coordinates.length - 1);
    this.setState({
      coordinates
    });
  }
 
  displayPointCb = (coordinate, i) => {
      // var span = document.createElement("span");
      // span.className = 'overlay-item';
      // span.id = `overlayItem-${ i }`;   
      // // span.style.left = coordinate.x - 10 + "px";
      // // span.style.top = coordinate.y - 10 + "px";
      // span.style.width = coordinate.height + 'px';
      // span.style.height = coordinate.width + 'px';
      // span.style.background = 'white';
      // span.style.display = 'inline';
      // document.getElementById("container").appendChild(span);
  }


  play = () => {
    let elem = document.getElementById("pencil");
    let i = 0;
    let coordinates = this.state.coordinates;
    this.interval = setInterval(()=> {
      if(coordinates.length - i === 1) {
        clearInterval(this.interval);
      }
      let x = coordinates[i].x;
      let y = coordinates[i].y;
      let overlayItem = document.getElementById(`overlayItem-${ i }`);
      overlayItem.style.display = 'none';
      elem.style.left = x + 'px';
      elem.style.top = y + 'px';
      i++;
    }, 100);

  }

  displayPoint = () => {
    let coordinates = this.state.coordinates;
    coordinates.forEach( item => item.display = 'none' )
    this.setState({
      coordinates
    });
    // for(let i = 0; i < coordinates.length; i++) {
    //   // let dx = Math.abs(coordinates[i].x - coordinates[i + 1].x);
    //   // let dy = Math.abs(coordinates[i].y - coordinates[i + 1].y);
    //   var span = document.createElement("span");
    //   span.className = 'overlay-item';
    //   span.id = `overlayItem-${ i }`;   
    //   span.style.left = coordinates[i].x - 10 + "px";
    //   span.style.top = coordinates[i].y - 10 + "px";
    //   span.style.width = '30px';
    //   span.style.height = '30px';
    //   span.style.background = 'white';
    //   span.style.display = 'inline';
    //   document.getElementById("container").appendChild(span);
    // }
  }

  getStyle = (coordinate) => {
    let style = {};
    style.left = coordinate.x - 10 + "px";
    style.top = coordinate.y - 10 + "px";
    style.width = coordinate.width + 'px';
    style.height = coordinate.height + 'px';
    style.background = 'white';
    style.display = 'inline';
    return style;
  }

  clearPoints = () => {
    this.setState({
      coordinates: []
    })
  }

  updateCoordinates = (index, prop) => {
    let coordinates = this.state.coordinates;
    coordinates[index][prop.target.name] = prop.target.value;
    this.setState({
      coordinates
    });
  }

  render() {
    return (
      <div className="">
      <div>
      Upload image
       <input ref="file" 
              type='file' 
              id='multi' 
              onChange={ this.onChange } 
              multiple />
        <button onClick={ this.play }>Play</button>
        <button onClick={ this.displayPoint }>Remove Selected point</button>
        <button onClick={ this.clearPoints }>Clear</button>
      </div>
        <span id="container">
          <img id="pencil" src={ Pencil } />
            {
              this.state.url && 
              <img src={ this.state.url } 
                    id="item"
                    onClick={ this.getCoordinates }
                    height="500" 
                    width="500" />
            }
            {
              this.state.coordinates.map((item, index) => {
                let style = this.getStyle(item);
                let id = `overlayItem-${ index }`;
                return <span className="overlay-item" id={ id } key={ index }  style={ style }></span>
              })
            }
          </span>
          <span>
            <h6>Points</h6>
            {
              this.state.coordinates.map((item, index) => {
                return <div key={ index }>
                  <span>height
                    <input type="number" 
                            name="height"
                            value={ item.height } 
                            onChange={ this.updateCoordinates.bind(this, index) } />
                  </span>
                  <span>width
                    <input type="number" 
                            name="width"
                            value={ item.width } 
                            onChange={ this.updateCoordinates.bind(this, index) } />
                  </span>
                  <span>MarginLeft
                    <input type="number" 
                            name="marginLeft"
                            value={ item.marginLeft } 
                            onChange={ this.updateCoordinates.bind(this, index) } />
                  </span>
                  <span>MarginRight
                    <input type="number" 
                            name="marginRight"
                            value={ item.marginRight } 
                            onChange={ this.updateCoordinates.bind(this, index) } />
                  </span>
                </div>
              })
            }
          </span>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
