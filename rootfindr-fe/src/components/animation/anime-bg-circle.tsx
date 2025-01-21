import React, { useEffect } from "react";
import anime from "animejs";

const AnimeBgCircle = () => {
  useEffect(() => {
    anime({
      targets: "circle",
      cx: [
        { value: anime.random(0, 900), duration: 5000 },
        // { value: anime.random(0, 900), duration: 5000 },
        // { value: anime.random(0, 900), duration: 1200 },
      ],
      cy: [
        { value: anime.random(0, 600), duration: 5000 },
        // { value: anime.random(0, 600), duration: 5000 },
        // { value: anime.random(0, 600), duration: 1200 },
      ],
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#6600FF" }}
    >
      <svg
        id="visual"
        viewBox="0 0 900 600"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <filter id="blur1" x="-30%" y="-30%" width="160%" height="160%">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="200"
              result="effect1_foregroundBlur"
            />
          </filter>
        </defs>
        <rect width="900" height="600" fill="#6600FF"></rect>
        <g filter="url(#blur1)">
          <circle cx="450" cy="300" fill="#00CC99" r="400"></circle>
          <circle cx="300" cy="400" fill="#6600FF" r="400"></circle>
          <circle cx="150" cy="200" fill="#00CC99" r="400"></circle>
          <circle cx="600" cy="500" fill="#00CC99" r="400"></circle>
          <circle cx="400" cy="150" fill="#6600FF" r="400"></circle>
        </g>
      </svg>
    </div>
  );
};

export default AnimeBgCircle;
