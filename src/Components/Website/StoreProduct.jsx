import React from 'react';

const StoreProduct = (props) => {
    function toTitleCase(str) {
        // Split the input string into words
        const words = str.split(' ');

        // Iterate through each word and capitalize the first letter
        const titleCaseWords = words.map(word => {
            if (word.length === 0) {
                return '';
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        });

        // Join the title-cased words back into a single string
        const titleCaseString = titleCaseWords.join(' ');

        return titleCaseString;
    }
    return (

        <>
            <div className=' shadow-lg  py-5 sm:flex items-center justify-between gap-4  sm:flex-col'>
                <img src={props.img} className='px-10' width={"200px"} alt="" />
                <h3 className=' text-center'>{toTitleCase(props.name)}</h3>
                <h3 className=' text-center'>⭐⭐⭐⭐</h3>
                <h1 className='text-red-600  text-center'>$499 <del>$599</del></h1>
            </div>

        </>

    );
}

export default StoreProduct;

