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
    case "arrow-left":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="26.254"
          viewBox="0 0 30 26.254"
        >
          <g transform="translate(-8.998 -10.123)">
            <path
              d="M17.672,10.674a2.831,2.831,0,0,1,0,2.655L11.716,23.25l5.956,9.923a2.835,2.835,0,0,1,0,2.655.852.852,0,0,1-1.593,0L9.329,24.578a2.831,2.831,0,0,1,0-2.655l6.75-11.249a.851.851,0,0,1,1.593,0Z"
              fill="#eee"
              fillRule="evenodd"
            />
            <path
              d="M10.125,18c0-.621.862-1.125,1.925-1.125H37.074c1.063,0,1.925.5,1.925,1.125s-.862,1.125-1.925,1.125H12.05C10.987,19.125,10.125,18.621,10.125,18Z"
              transform="translate(0 5.25)"
              fill="#eee"
              fillRule="evenodd"
            />
          </g>
        </svg>
      );
    case "map-pin":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="36"
          viewBox="0 0 27 36"
        >
          <g transform="translate(-2718 364)">
            <path
              d="M12.113,35.274C1.9,20.463,0,18.943,0,13.5a13.5,13.5,0,0,1,27,0c0,5.443-1.9,6.963-12.113,21.774a1.689,1.689,0,0,1-2.775,0ZM13.5,19.125A5.625,5.625,0,1,0,7.875,13.5,5.624,5.624,0,0,0,13.5,19.125Z"
              transform="translate(2718 -364)"
              fill="#f26e50"
            />
          </g>
        </svg>
      );
    case "user-profile":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="129.997"
          viewBox="0 0 130 129.997"
        >
          <g transform="translate(-8084 -330)">
            <path
              d="M65,.563a65,65,0,1,0,65,65A64.986,64.986,0,0,0,65,.563Zm0,25.161A23.066,23.066,0,1,1,41.934,48.79,23.066,23.066,0,0,1,65,25.724Zm0,90.161A50.226,50.226,0,0,1,26.6,98.011,29.222,29.222,0,0,1,52.42,82.337a6.434,6.434,0,0,1,1.86.287A34.729,34.729,0,0,0,65,84.432a34.616,34.616,0,0,0,10.72-1.808,6.434,6.434,0,0,1,1.86-.287A29.226,29.226,0,0,1,103.4,98.011,50.241,50.241,0,0,1,65,115.881Z"
              transform="translate(8084 329.437)"
              fill="#4ecca3"
            />
          </g>
        </svg>
      );
    case "light":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="65"
          viewBox="0 0 45 65"
        >
          <path
            d="M22.5,10.157A12.244,12.244,0,0,0,10.227,22.344a2.046,2.046,0,0,0,4.091,0A8.162,8.162,0,0,1,22.5,14.219a2.031,2.031,0,1,0,0-4.063ZM12.28,58.294a2.016,2.016,0,0,0,.342,1.123l3.133,4.677a2.048,2.048,0,0,0,1.7.906h10.08a2.048,2.048,0,0,0,1.7-.906l3.133-4.677a2.026,2.026,0,0,0,.342-1.123l.007-5.482H12.275l.005,5.482ZM22.5,0A22.3,22.3,0,0,0,5.569,37.044a36.271,36.271,0,0,1,6.7,11.7v.007h6.136v-.014a6.012,6.012,0,0,0-.275-1.786,39.971,39.971,0,0,0-7.947-13.923A16.22,16.22,0,0,1,22.5,6.1a16.325,16.325,0,0,1,16.364,16.25,16.133,16.133,0,0,1-4.045,10.682,40.023,40.023,0,0,0-7.938,13.9,5.992,5.992,0,0,0-.284,1.815v.013h6.136v-.007a36.271,36.271,0,0,1,6.7-11.7A22.15,22.15,0,0,0,45,22.344,22.424,22.424,0,0,0,22.5,0Z"
            fill="#ffba7a"
          />
        </svg>
      );
    case "database":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56.875"
          height="65"
          viewBox="0 0 56.875 65"
        >
          <path
            d="M56.875,9.286v5.8c0,5.115-12.738,9.286-28.437,9.286S0,20.2,0,15.089v-5.8C0,4.171,12.738,0,28.438,0S56.875,4.171,56.875,9.286Zm0,13.058V35.4c0,5.115-12.738,9.286-28.437,9.286S0,40.517,0,35.4V22.344c6.11,4.207,17.292,6.166,28.438,6.166S50.765,26.551,56.875,22.344Zm0,20.313V55.714C56.875,60.829,44.137,65,28.438,65S0,60.829,0,55.714V42.656c6.11,4.207,17.292,6.166,28.438,6.166S50.765,46.863,56.875,42.656Z"
            fill="#a1ebff"
          />
        </svg>
      );
    case "user-admin":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56.5"
          height="64.571"
          viewBox="0 0 56.5 64.571"
        >
          <path
            d="M28.25,32.286A16.143,16.143,0,1,0,12.107,16.143,16.142,16.142,0,0,0,28.25,32.286ZM40.332,36.4,34.3,60.536,30.268,43.383,34.3,36.32H22.2l4.036,7.063L22.2,60.536,16.168,36.4A16.92,16.92,0,0,0,0,53.271v5.246a6.056,6.056,0,0,0,6.054,6.054H50.446A6.056,6.056,0,0,0,56.5,58.518V53.271A16.92,16.92,0,0,0,40.332,36.4Z"
            fill="#d0d0d0"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="92.857"
          height="65"
          viewBox="0 0 92.857 65"
        >
          <path
            d="M27.857,34.3a16.25,16.25,0,1,0-16.25-16.25A16.241,16.241,0,0,0,27.857,34.3ZM39,38.943H37.8a22.434,22.434,0,0,1-19.877,0h-1.2A16.72,16.72,0,0,0,0,55.657v4.179A6.965,6.965,0,0,0,6.964,66.8H48.75a6.965,6.965,0,0,0,6.964-6.964V55.657A16.719,16.719,0,0,0,39,38.943ZM69.643,34.3A13.929,13.929,0,1,0,55.714,20.371,13.933,13.933,0,0,0,69.643,34.3Zm6.964,4.643h-.552a18.293,18.293,0,0,1-12.825,0h-.552A16.126,16.126,0,0,0,54.6,41.177a21.228,21.228,0,0,1,5.76,14.481v5.571c0,.32-.072.624-.088.929H85.893a6.965,6.965,0,0,0,6.964-6.964,16.241,16.241,0,0,0-16.25-16.25Z"
            transform="translate(0 -1.8)"
            fill="#71ebc2"
          />
        </svg>
      );
    case "reports":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26.667"
          height="20"
          viewBox="0 0 26.667 20"
        >
          <path
            d="M25.833,21.167H3.333V5.333A.833.833,0,0,0,2.5,4.5H.833A.833.833,0,0,0,0,5.333v17.5A1.667,1.667,0,0,0,1.667,24.5H25.833a.833.833,0,0,0,.833-.833V22A.833.833,0,0,0,25.833,21.167Zm-1.667-15H18.018A1.25,1.25,0,0,0,17.134,8.3l1.687,1.687L15,13.81,11.179,9.988a1.666,1.666,0,0,0-2.357,0L5.244,13.566a.834.834,0,0,0,0,1.179l1.178,1.178a.834.834,0,0,0,1.179,0l2.4-2.4,3.821,3.821a1.666,1.666,0,0,0,2.357,0l5-5,1.687,1.687A1.25,1.25,0,0,0,25,13.149V7a.832.832,0,0,0-.833-.833Z"
            transform="translate(0 -4.5)"
            fill="#eee"
          />
        </svg>
      );
    case "alert":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64.866"
          height="60"
          viewBox="0 0 64.866 60"
        >
          <path
            d="M29.285,4.406,1.568,54.125c-2.306,4.2-1.326,8.018,4.906,8.018H59.245c6.249,0,7.212-3.818,4.906-8.02L35.861,4.436a3.449,3.449,0,0,0-3.173-2.293,3.714,3.714,0,0,0-3.4,2.263Zm.333,15.574h6.487v22.7H29.618V19.98Zm0,27.567h6.487v6.487H29.618V47.547Z"
            transform="translate(-0.428 -2.143)"
            fill="#eee"
          />
        </svg>
      );
    case "run":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33.7"
          height="45"
          viewBox="0 0 33.7 45"
        >
          <path
            d="M22.254,8.352a4.184,4.184,0,0,1-3-1.228A3.945,3.945,0,0,1,17.98,4.175a3.945,3.945,0,0,1,1.278-2.948,4.18,4.18,0,0,1,3-1.227A4.03,4.03,0,0,1,25.2,1.228a4.012,4.012,0,0,1,1.228,2.948A4.025,4.025,0,0,1,25.2,7.125a4.025,4.025,0,0,1-2.948,1.228ZM14.64,37.435,0,34.585.884,30.36,11.1,32.423l3.341-17L10.71,16.9v7.173H6.485V14.247L17.391,9.628a4.983,4.983,0,0,0,.835-.1,4.983,4.983,0,0,1,.835-.1A4.114,4.114,0,0,1,22.6,11.494l2.162,3.341a9.6,9.6,0,0,0,3.684,3.636A10.393,10.393,0,0,0,33.7,19.846V24.07a14.553,14.553,0,0,1-11.5-5.207l-1.278,6.289,4.421,4.127V45H21.122V32.423L16.8,28.3Z"
            fill="#cc8139"
          />
        </svg>
      );
    default:
      return <>X</>;
  }
}
