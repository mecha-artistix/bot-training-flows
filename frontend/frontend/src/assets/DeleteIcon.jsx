import React from 'react';

function DeleteIcon({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className="fill-current"
      onClick={onClick}
    >
      <path
        className="text-cwu_theme_orng hover:text-cwu_theme_orng_hover"
        d="M16.42 4.101v-.04c0-1.43-.864-2.589-1.929-2.589H5.51c-1.066 0-1.93 1.16-1.93 2.589v.04h12.84zM16.488 6.308a1.133 1.133 0 00-.86-.397H4.372a1.133 1.133 0 00-1.119 1.31L4.89 17.572c.087.55.562.956 1.12.956h7.98c.558 0 1.032-.405 1.12-.956l1.636-10.35a1.133 1.133 0 00-.258-.914zM6.825 16.99a.644.644 0 01-.701-.588l-.677-7.737a.647.647 0 01.589-.7.644.644 0 01.7.587l.678 7.737a.647.647 0 01-.59.701zm3.822-.644a.648.648 0 01-1.295 0V8.578a.647.647 0 111.295 0v7.767zm3.146.056a.647.647 0 11-1.29-.113l.677-7.737a.644.644 0 01.701-.588c.357.03.62.345.588.7l-.676 7.738z"
      ></path>
    </svg>
  );
}

export default DeleteIcon;
