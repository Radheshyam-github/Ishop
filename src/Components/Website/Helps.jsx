import React from 'react';

const Helps = (props) => {
    return (
        <div className='helpsbox mt-20  lg:justify-between '>
            <img src={props.img} className=' px-[128px] ' alt="" />
            <h3 className='font-bold text-grayscale-0 py-5  '>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

export default Helps;
