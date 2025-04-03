"use client";
import { useSocket } from "../../../hooks/useSocket";
import { useEffect, useRef, useState } from "react";

export default function Controller() {
  const { slide, changeSlide } = useSocket();
  const previewRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  
  const slides = [
    "/Frame 2.png"
  ];

  const totalSlidesWidth = slides.length * 500;

  // Use Gyroscope for scrolling
  useEffect(() => {
    const handleOrientation = (event) => {
      const alpha = event.alpha; // Rotation around the Z-axis (compass)
      console.log(alpha)

      if (alpha !== null) {
        // Normalize alpha to the range [0, totalSlidesWidth]
        const normalizedAlpha = alpha % 360; // Wrap the alpha value to stay within [0, 360]

        // Map alpha (0-360 degrees) to scroll position
        const newRotation = (normalizedAlpha / 360) * totalSlidesWidth;

        setRotation(newRotation);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  // Update scroll position
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollLeft = rotation;
    }
  }, [rotation]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white" style={{maxHeight: "100vh", overflow: "hidden"}}>
      <div
        ref={previewRef}
        className="flex overflow-x-scroll w-full py-4"
        style={{ scrollBehavior: "smooth", display: "flex", overflowX: "auto" }}
      >
        {slides.map((img, index) => (
          <img
            key={index}
            style={{width: '8000px', height: '800px'}}
            src={img}
            alt={`Slide ${index}`}
            className={`h-32 mx-2 cursor-pointer transition ${
              index === slide ? "border-4 border-blue-500" : "opacity-50"
            }`}
            onClick={() => changeSlide(index > slide ? "next" : "prev")}
          />
        ))}
      </div>
    </div>
  );
}
