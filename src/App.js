import React, { Component } from 'react';
import './App.css';
import Register from '../src/Components/Register/register';
import SignIn from "../src/Components/SignIn/signin";
import Clarifai from 'clarifai';
import Navigation from '../src/Components/Navigation/navigation';
import Logo from '../src/Components/Logo/logo';
import FaceRecognition from "../src/Components/FaceRecogn/facerecog";
import ImageLinkForm from '../src/Components/ImageLinkForm/imagelinkform';
import Rank from '../src/Components/Rank/rank';
import Particles from 'react-particles-js';
import ParticleConfig from '../src/Components/Particles/particle';

import 'tachyons';

const app = new Clarifai.App({
  apiKey: '4248fb4e992845b991a01a2295d999dd'
 });



class App extends Component  {
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      user:{
        id:'128',
        name:'',
        email:'',
        password:'',
        entries:0,
        joined:''
        
      }
    }

  }

          loadUsers=(data)=>{
            this.setState({user:{
              id:data.id,
              name:data.name,
              email:data.email,
              password:data.password,
              entries:data.entries,
              joined:data.joined
            }})
          }

       
            calculateFaceLocation=(data)=>
            {
                    const boundingbox=data.outputs[0].data.regions[0].region_info.bounding_box;
                    const image=document.getElementById('inputimg');
                    const width=Number(image.width);
                    const height=Number(image.height);

                    return{
                          leftCol:boundingbox.left_col * width,
                          topRow:boundingbox.top_row *height,
                          rightCol:width -(boundingbox.right_col * width),
                          bottomRow: height-(boundingbox.bottom_row *height)

                    }
                    
              }

            displayFaceBox=(box)=>
            {
              this.setState({box: box});
              console.log(this.state.box);
            }

            onInputChange=(event)=>
            {
                this.setState({input:event.target.value});
            }



            onButtonSubmit=(event)=>
            {
                    this.setState({imageURL: this.state.input});
                    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
                    .then(response=>{
                      if(response){
                        fetch('http://localhost:3001/image',{
                          method:'put',
                          headers:{'Content-Type':'application/json'},
                          body:JSON.stringify({id:this.state.user.id})
                        }).then(response=>response.json()
                        ).then(count=>{this.setState(Object.assign(this.state.user,{entries:count}))
                      })
                      }
                      this.displayFaceBox(this.calculateFaceLocation(response))
                    })
                    .catch(err=>console.log(err));
                
            }

            onRouteChange=(route)=>
            {
              this.setState({route:route});
            }



  render(){
        return (
        <div className="App">
        <Particles className='particles'
        params={ParticleConfig} />
        
         { this.state.route === 'home' 
          ?   <div>
                  <Navigation onRouteChange={this.onRouteChange} />
                  <Logo />
                  <Rank userName={this.state.user.name} entries={this.state.user.entries} />
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                  <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
              </div>
         : (
              this.state.route === 'signin'
              ? <SignIn loadUsers={this.loadUsers} onRouteChange={this.onRouteChange} />
              : <Register loadUsers={this.loadUsers} onRouteChange={this.onRouteChange} />           
         )

         }
        </div>
      );
    }
}

export default App;
