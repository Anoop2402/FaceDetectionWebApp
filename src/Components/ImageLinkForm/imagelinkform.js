import React  from "react";
import './image.css';


const ImageLinkForm =({onInputChange, onButtonSubmit})=>{

    return(
                <div>
                    <p className='f3'>{'This web app will detect faces in a given image'}</p>
                    <div className='center'>
                        <div className='butt center shadow-3 pa4 br3'>
                        <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                            <button className=' f4 grow link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit } >Detect</button>
                        </div>
                    </div>

                </div>

    )

};

export default ImageLinkForm;