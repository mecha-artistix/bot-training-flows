import React from 'react';

function GearIcon({ onClick }) {
  return (
    <div onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_344_429)">
          <path
            fill="#BFAA6B"
            fillRule="evenodd"
            d="M17.4 11c0-.3.1-.6.1-1s0-.7-.1-1l2.1-1.7c.2-.2.2-.4.1-.6l-2-3.5c-.1-.1-.3-.2-.6-.1l-2.5 1c-.5-.4-1.1-.7-1.7-1L12.4.5c.1-.3-.2-.5-.4-.5H8c-.2 0-.5.2-.5.4l-.4 2.7c-.6.2-1.1.6-1.7 1L3 3.1c-.3-.1-.5 0-.7.2l-2 3.5c-.1.1 0 .4.2.6L2.6 9c0 .3-.1.6-.1 1s0 .7.1 1L.5 12.7c-.2.2-.2.4-.1.6l2 3.5c.1.1.3.2.6.1l2.5-1c.5.4 1.1.7 1.7 1l.4 2.6c0 .2.2.4.5.4h4c.2 0 .5-.2.5-.4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.5-.1-.6L17.4 11zM10 13.5c-1.9 0-3.5-1.6-3.5-3.5S8.1 6.5 10 6.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"
            clipRule="evenodd"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_344_429">
            <path fill="#fff" d="M0 0H20V20H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default GearIcon;
