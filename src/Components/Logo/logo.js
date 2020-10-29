import React  from "react";
import Tilt from 'react-tilt';
import './logo.css';
import Skull from './logo.png';


const Logo =()=>{

    return(
                <div className='ma4 mt0'>
                    <Tilt className="Tilt br2 shadow-3" options={{ max : 45 }} style={{ height: 200, width: 200 }} >
                    <div className="Tilt-inner"> <img src={Skull} alt='processing...' /> </div>
                    </Tilt>
                </div>

    )

};

export default Logo;