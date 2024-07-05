import React from 'react';

function ShareIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 20 20"
      className="fill-current"
    >
      <path
        className="gray_icon"
        d="M15.78 12.304a3.434 3.434 0 00-2.845 1.508l-5.518-2.514a3.447 3.447 0 00-.121-2.791l4.038-2.379A3.437 3.437 0 1010.8 4.63L6.283 7.29a3.438 3.438 0 10.226 5.313l5.865 2.67a3.437 3.437 0 103.406-2.969z"
      ></path>
    </svg>
  );
}

export default ShareIcon;
