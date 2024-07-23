import React from 'react';

function SendIcon({ onClick }) {
  return (
    <div onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="flowchart-icons" fill="none" viewBox="0 0 15 15">
        <path
          fill="#281159"
          d="M14.654.41a.333.333 0 00-.479-.372L.52 7.198a.974.974 0 00-.067 1.685l3.04 1.92a.167.167 0 00.2-.015l8.105-7.245a.166.166 0 01.24.228l-6.476 8.124a.166.166 0 00.041.244l4.288 2.713a.97.97 0 001.46-.597L14.654.411z"
        ></path>
      </svg>
    </div>
  );
}

export default SendIcon;
