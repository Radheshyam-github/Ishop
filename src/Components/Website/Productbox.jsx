import React from 'react';

const Productbox = (props) => {
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
          
            
            </>
      
    );
}

export default Productbox;

