import React from 'react';

const Rank = ({userName,entries})=>{

return(
    <div>
        <div className='white f3'>
            {'Hello '+userName+ ' Your current rank is '}
        </div>
        <div className='white f1'>
        {'#'+entries}

        </div>

</div>
)

};

export default Rank;
