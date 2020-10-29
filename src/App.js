import React, { Component } from 'react';
import './App.css';
import Navigation from '../src/Components/Navigation/navigation';
import Logo from '../src/Components/Logo/logo';
import ImageLinkForm from '../src/Components/ImageLinkForm/imagelinkform';
import Rank from '../src/Components/Rank/rank';
import Particles from 'react-particles-js';
import ParticleConfig from '../src/Components/Particles/particle';

import 'tachyons';


class App extends Component  {
  constructor(){
    super();
    this.state={
      input:'',
    }

  }

onInputChange=(event)=>{
    console.log(event.target.value);
}

onButtonSubmit=(event)=>{
  console.log('click')
}

  render(){
        return (
        <div className="App">
        <Particles className='particles'
        params={ParticleConfig} />

          <Navigation /> 
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          {/* 
          <FaceRecognition /> */}
        </div>
      );
    }
}

export default App;
