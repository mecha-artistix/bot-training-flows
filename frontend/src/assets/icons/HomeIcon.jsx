import React from 'react';

function HomeIcon({ onClick }) {
  return (
    <div onClick={onclick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="header-icon" fill="none" viewBox="0 0 24 18">
        <path fill="#281159" d="M9.6 18v-6.353h4.8V18h6V9.53H24L12 0 0 9.53h3.6V18h6z"></path>
      </svg>
    </div>
  );
}

export default HomeIcon;
