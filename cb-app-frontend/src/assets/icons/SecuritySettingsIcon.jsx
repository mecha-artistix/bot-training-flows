import React from 'react';

function SecuritySettingsIcon({ onClick }) {
  return (
    <div onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_188_1845)">
          <path
            fill="#BFAA6B"
            // stroke="#BFAA6B"
            d="M4.167 10.5H9.5v7.614l.647-.199c3.322-1.02 5.72-4.266 6.182-7.86l.073-.563H10.5V1.889l-.703.312-5.833 2.592-.297.132V10.5h.5zM3 9.167V4.492l7-3.111 7 3.11v4.676c0 4.376-2.998 8.44-7 9.484-4.002-1.045-7-5.108-7-9.484z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_188_1845">
            <path fill="#fff" d="M0 0H20V20H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default SecuritySettingsIcon;
