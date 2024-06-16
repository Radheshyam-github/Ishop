import React from 'react';

const Contact = (props) => {
    return (

        <div className='mt-10 contact '>
            <img src={props.img} className='py-2' alt="" />
            <h3 className='mt-4 px-2 font-bold text-center'>{(props.title)}</h3>
            <p className=''>{props.description}</p>
        </div>
    );
}

export default Contact;
