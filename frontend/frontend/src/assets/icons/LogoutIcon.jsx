import React from 'react';

function Logout({ onClick }) {
  return (
    <div onClick={onclick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="header-icon" fill="none" viewBox="0 0 24 24">
        <mask
          id="mask0_195_257"
          style={{ maskType: 'luminance' }}
          width="10"
          height="22"
          x="2"
          y="1"
          maskUnits="userSpaceOnUse"
        >
          <path fill="#fff" d="M2.4 1.477h9.184v21.408H2.4V1.477z"></path>
        </mask>
        <g mask="url(#mask0_195_257)">
          <path
            fill="#281159"
            d="M11.563 21.338c0 .845-.682 1.527-1.527 1.527H6.98a4.584 4.584 0 01-4.583-4.582V6.063A4.584 4.584 0 016.981 1.48h3.055c.845 0 1.527.683 1.527 1.528s-.682 1.527-1.527 1.527H6.98c-.845 0-1.528.683-1.528 1.528v12.22c0 .845.683 1.527 1.528 1.527h3.055c.845 0 1.527.683 1.527 1.528z"
          ></path>
        </g>
        <mask
          id="mask1_195_257"
          style={{ maskType: 'luminance' }}
          width="13"
          height="14"
          x="9"
          y="5"
          maskUnits="userSpaceOnUse"
        >
          <path fill="#fff" d="M9.152 5.696H21.6v12.928H9.152V5.696z"></path>
        </mask>
        <g mask="url(#mask1_195_257)">
          <path
            fill="#281159"
            d="M16.198 6.13l4.944 4.944c.29.29.455.688.455 1.099 0 .41-.165.81-.455 1.1l-4.944 4.943a1.366 1.366 0 01-2.331-.966v-2.5h-3.422a1.287 1.287 0 01-1.289-1.289v-2.576c0-.713.576-1.289 1.289-1.289h3.422v-2.5a1.366 1.366 0 012.331-.966z"
          ></path>
        </g>
      </svg>
    </div>
  );
}

export default Logout;
