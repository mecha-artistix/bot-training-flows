import React from 'react';

function EditIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      className="fill-current"
    >
      <g className="text-cwu_theme_orng hover:text-cwu_theme_orng_hover" clipPath="url(#clip0_274_366)">
        <path d="M16.267 4.609l1.731-1.73-2.75-2.751-1.73 1.73 2.75 2.751zM12.728 2.659l-8.707 8.708h-.024L.001 15.362v2.51h3.01l3.497-3.496v-.01l8.964-8.964-2.744-2.743z"></path>
      </g>
      <defs>
        <clipPath id="clip0_274_366">
          <path fill="#fff" d="M0 0H18V18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default EditIcon;
