// import anime from "animejs";
// import React, { useEffect, useState } from "react";
// import { generateWavePath } from "@/utilities/wavepath";

// const Bganime = () => {
//   const [phase, setPhase] = useState(0);

//   useEffect(() => {
//     // Anime.js animation to dynamically update the phase
//     const animation = anime({
//       targets: { phase: 0 },
//       phase: 360,
//       duration: 8000, // Animation duration
//       easing: "linear",
//       loop: true,
//       update: function (anim) {
//         const currentPhase = Number(anim.animations[0].currentValue);
//         setPhase(currentPhase); // Update the phase dynamically
//       },
//     });

//     return () => animation.pause(); // Cleanup animation
//   }, []);

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       <svg
//         id="visual"
//         viewBox="0 0 900 600"
//         width="900"
//         height="600"
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         version="1.1"
//         className="absolute top-0 left-0 w-full h-full"
//       >
//         <rect x="0" y="0" width="900" height="600" fill="#001220"></rect>
//         {/* Layered Waves with dynamically generated paths */}
//         {/* <path d={generateWavePath(40, 0.0342, phase)} fill="#c62368"></path>
//         <path
//           d={generateWavePath(80, 0.0224, phase + 30)}
//           fill="#d53867"
//         ></path>
//         <path
//           d={generateWavePath(80, 0.0299, phase + 60)}
//           fill="#e34c67"
//         ></path>
//         <path
//           d={generateWavePath(70, 0.0337, phase + 90)}
//           fill="#ef5f67"
//         ></path>
//         <path
//           d={generateWavePath(80, 0.0893, phase + 120)}
//           fill="#fa7268"
//         ></path> */}
//         <path d={generateWavePath(60, 0.015, phase)} fill="#c62368"></path>
//         <path d={generateWavePath(50, 0.01, phase + 45)} fill="#d53867"></path>
//         <path d={generateWavePath(40, 0.025, phase + 90)} fill="#e34c67"></path>
//         <path d={generateWavePath(70, 0.02, phase + 135)} fill="#ef5f67"></path>
//         <path
//           d={generateWavePath(10, 0.017, phase + 180, 50)} // Add a vertical offset
//           fill="#fa7268"
//         ></path>
//       </svg>
//     </div>
//   );
// };

// export default Bganime;
// import anime from "animejs";
// import React, { useEffect, useState } from "react";
// import { generateWavePath } from "@/utilities/wavepath";

// const Bganime = () => {
//   const [phase, setPhase] = useState(0);

//   useEffect(() => {
//     // Anime.js animation to dynamically update the phase
//     const animation = anime({
//       targets: { phase: 0 },
//       phase: 360, // Full wave cycle
//       duration: 12000, // Slow movement
//       easing: "linear",
//       loop: true,
//       update: function (anim) {
//         const currentPhase = Number(anim.animations[0].currentValue);
//         setPhase(currentPhase); // Update the phase dynamically
//       },
//     });

//     return () => animation.pause(); // Cleanup animation
//   }, []);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-green-500">
//       <svg
//         id="visual"
//         viewBox="0 0 900 600"
//         width="90"
//         height="60"
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         version="1.1"
//         className="absolute top-0 left-0 w-full h-full"
//       >
//         <rect x="0" y="0" width="900" height="600" fill="#001220"></rect>
//         {/* Layered Waves with natural, asynchronous motion */}
//         <path d={generateWavePath(50, 0.015, phase)} fill="#c62368"></path>
//         <path d={generateWavePath(45, 0.012, phase + 30)} fill="#d53867"></path>
//         <path d={generateWavePath(40, 0.01, phase + 60)} fill="#e34c67"></path>
//         <path d={generateWavePath(35, 0.008, phase + 90)} fill="#ef5f67"></path>
//         <path
//           d={generateWavePath(20, 0.005, phase + 120, 50)} // Front wave with lower amplitude and offset
//           fill="#fa7268"
//         ></path>
//       </svg>
//     </div>
//   );
// };
