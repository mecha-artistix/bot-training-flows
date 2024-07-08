import React from 'react';

function AddNewFlowChartIcon({ onClick }) {
  return (
    <div onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="flowchart-icons" fill="none" viewBox="0 0 22 22">
        <path
          fill="#281159"
          d="M17 6.5h3A1.5 1.5 0 0021.5 5V2A1.5 1.5 0 0020 .5h-3A1.5 1.5 0 0015.5 2v.75h-2.25a1.5 1.5 0 00-1.5 1.5v6H9.5V8A1.5 1.5 0 008 6.5H2A1.5 1.5 0 00.5 8v6A1.5 1.5 0 002 15.5h6A1.5 1.5 0 009.5 14v-2.25h2.25v6a1.5 1.5 0 001.5 1.5h2.25V20a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v.75h-2.25v-6h2.25v.75A1.5 1.5 0 0017 14h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 0020 8h-3a1.5 1.5 0 00-1.5 1.5v.75h-2.25v-6h2.25V5A1.5 1.5 0 0017 6.5zM8 14H2V8h6v6zm9 3h3v3h-3v-3zm0-7.5h3v3h-3v-3zM17 2h3v3h-3V2z"
        ></path>
      </svg>
    </div>
  );
}

export default AddNewFlowChartIcon;
