import React from 'react';

export default function Output({ history }) {
  return (
    <div className="w-full">
      {history.map((item, index) => (
       
        <div 
          key={index} 
          className="whitespace-pre-wrap break-words leading-snug"
        >
          {item}
        </div>
      ))}
    </div>
  );
}