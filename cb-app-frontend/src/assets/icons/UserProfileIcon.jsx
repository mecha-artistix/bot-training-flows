import React from 'react';

function UserProfileIcon({ onClick }) {
  return (
    <div onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="header-icon" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#D9D9D9"></circle>
        <path
          fill="#281159"
          d="M12.364 11.636a2.909 2.909 0 100-5.818 2.909 2.909 0 000 5.818zM18.182 16.727v.728a.727.727 0 01-.727.727H7.273a.727.727 0 01-.728-.727v-.728a4.364 4.364 0 014.364-4.363h2.91a4.364 4.364 0 014.363 4.363z"
        ></path>
      </svg>
    </div>
  );
}

export default UserProfileIcon;
