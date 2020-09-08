import React from "react";

export default function Icons({ name }) {
  switch (name) {
    case "dashboard":
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25.6"
            height="20"
            viewBox="0 0 25.6 20"
          >
            <g transform="translate(0 -4.5)">
              <path
                d="M13.1,29.373A3.912,3.912,0,0,0,13.7,27h9.528a3.912,3.912,0,0,0,.6,2.373h1.785c.658,0,1.191.354,1.191.791s-.533.791-1.191.791H11.316c-.658,0-1.191-.354-1.191-.791s.533-.791,1.191-.791Z"
                transform="translate(-5.662 -6.455)"
                fill="#232931"
              />
              <path
                d="M22.386,6.1H3.2a1.669,1.669,0,0,0-.964.232,1.216,1.216,0,0,0-.407.484,2.348,2.348,0,0,0-.23.9v9.611a1.681,1.681,0,0,0,.232.966,1.222,1.222,0,0,0,.483.408,2.337,2.337,0,0,0,.861.23H22.4a1.669,1.669,0,0,0,.964-.232,1.216,1.216,0,0,0,.407-.484A2.354,2.354,0,0,0,24,17.36V7.709a1.681,1.681,0,0,0-.232-.966,1.212,1.212,0,0,0-.483-.408,2.331,2.331,0,0,0-.9-.23ZM22.4,4.5H3.2A3.14,3.14,0,0,0,0,7.709v9.627a3.137,3.137,0,0,0,3.2,3.209H22.4a3.14,3.14,0,0,0,3.2-3.209V7.709A3.137,3.137,0,0,0,22.4,4.5Z"
                fill="#232931"
                fillRule="evenodd"
              />
            </g>
          </svg>
        </>
      );
    case "plus":
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16.914"
            height="16.914"
            viewBox="0 0 16.914 16.914"
          >
            <path
              d="M9.957,18.414a8.457,8.457,0,1,1,8.457-8.457A8.433,8.433,0,0,1,9.957,18.414Zm0-15.376a6.919,6.919,0,1,0,6.919,6.919A6.89,6.89,0,0,0,9.957,3.038Z"
              transform="translate(-1.5 -1.5)"
              fill="#232931"
            />
            <path
              d="M17.557,18.252c-.634,0-1.057-.31-1.057-.775v-6.2c0-.465.423-.775,1.057-.775s1.057.31,1.057.775v6.2C18.614,17.942,18.191,18.252,17.557,18.252Z"
              transform="translate(-9.1 -5.919)"
              fill="#232931"
            />
            <path
              d="M17.477,18.614h-6.2c-.465,0-.775-.423-.775-1.057s.31-1.057.775-1.057h6.2c.465,0,.775.423.775,1.057S17.942,18.614,17.477,18.614Z"
              transform="translate(-5.919 -9.1)"
              fill="#232931"
            />
          </svg>
        </>
      );
    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            d="M10,11.25A5.625,5.625,0,1,0,4.375,5.625,5.626,5.626,0,0,0,10,11.25Zm5,1.25H12.848a6.8,6.8,0,0,1-5.7,0H5a5,5,0,0,0-5,5v.625A1.876,1.876,0,0,0,1.875,20h16.25A1.876,1.876,0,0,0,20,18.125V17.5A5,5,0,0,0,15,12.5Z"
            fill="#eee"
          />
        </svg>
      );
    case "sair":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <g transform="translate(-5917 -1668)">
            <g transform="translate(5917 1668)">
              <path
                d="M10,23H6a2.946,2.946,0,0,1-3-3V6A2.946,2.946,0,0,1,6,3h4a.945.945,0,0,1,1,1,.945.945,0,0,1-1,1H6A.945.945,0,0,0,5,6V20a.945.945,0,0,0,1,1h4a1,1,0,0,1,0,2Zm7-4a.908.908,0,0,1-.7-.3.967.967,0,0,1,0-1.4L20.6,13,16.3,8.7a.99.99,0,0,1,1.4-1.4l5,5a.967.967,0,0,1,0,1.4l-5,5A.908.908,0,0,1,17,19Z"
                transform="translate(-3 -3)"
                fill="#fff"
              />
              <path
                d="M25.486,18.575H13.037a1.037,1.037,0,0,1,0-2.075H25.486a1.037,1.037,0,0,1,0,2.075Z"
                transform="translate(-6.523 -7.537)"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
      );
    default:
      return <>X</>;
  }
}
