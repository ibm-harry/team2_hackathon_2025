'use client';

import { useState, useEffect } from 'react';
import { useSocket } from "../../hooks/useSocket";
import styles from './styles.module.css';

export default function Home() {
  const { slide, changeSlide, comments, setNewComments, showComments, toggleComments } = useSocket();
  const [frame2Comments, setFrame2Comments] = useState([]);
  const [frame3Comments, setFrame3Comments] = useState([]);
  
  const VisibilityIcon = () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
      {showComments ? (
        <path d="M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-13.91-9C5.1,10.93,10.7,7,16,7s10.9,3.93,13.91,9C26.9,21.07,21.3,25,16,25Z M16,11a5,5,0,1,0,5,5A5,5,0,0,0,16,11Z"/>
      ) : (
        <path d="M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-13.91-9C5.1,10.93,10.7,7,16,7s10.9,3.93,13.91,9C26.9,21.07,21.3,25,16,25ZM16,11a5,5,0,1,0,5,5A5,5,0,0,0,16,11Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,16,19Z"/>
      )}
    </svg>
  );

  const slides = [
    "/Frame 2.png"
  ];

  // State to control the visibility of the overlay image
  const [showImage, setShowImage] = useState(true);
  const [setSlide, setShowSlide] = useState(false);

  console.log(comments)

  let localslide = slide
  let f2comments = comments
  let f3comments = []

  // Function to handle 'c' key press and toggle the image visibility
  const handleKeyPress = (e) => {
    if (e.key === 'c' || e.key === 'C') {
      setShowImage((prev) => !prev);
    }
    if (e.key === 'x' || e.key === 'X') {
      // if (!localslide) {
      //   f2comments = comments
      //   console.log("f2comments")
      //   console.log(f2comments)
      //   setNewComments(f3comments)
      // } else {
      //   f3comments = comments
      //   console.log("f3comments")
      //   console.log(f3comments)
      //   setNewComments(f2comments)
      // }
      setShowSlide((prev) => !prev);
      // console.log(!slide)
      changeSlide(!localslide);
      localslide = !localslide
      console.log(comments)
    }
  };

  // Set up the key press listener on component mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-900 text-white" style={{maxHeight: "100vh", overflow: "hidden"}}>
      {/* Overlay Image */}
        <div className={`fixed top-0 left-0 w-full h-full z-0 fade ${showImage ? "show" : ""}`} style={{backgroundImage: "url('bg.png')", height: '100%', backgroundSize: 'contain', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 51}}>
        </div>
    </div>
    <div className={styles.container}>
      <div className={styles.slideContainer} style={{overflow: 'auto'}}>
        {slides.map((img, index) => (
          <div key={index} className={styles.slideWrapper} style={{backgroundImage: `url('${setSlide ? 'Frame 3.png' : 'Frame 2.png'}')`, backgroundSize: 'cover', width: '10000px', height: '1000px'}}>
            {/* <div className={styles.slideContent}> */}
              {/* <img
                src={img}
                alt={`Slide ${index}`}
                className={`${styles.image} ${
                  index === slide ? styles.activeImage : styles.inactiveImage
                }`}
              /> */}
              {showComments && comments
                .filter(comment => comment.slideIndex === localslide)
                .map(comment => (
                  <div
                    key={comment.id}
                    className={styles.commentMarker}
                    style={{
                      left: `${comment.position.x}%`,
                      top: `${comment.position.y}%`
                    }}
                  >
                    <div className={styles.tooltip}>
                      <strong>{comment.name}</strong>: {comment.text}
                    </div>
                  </div>
                ))}
            {/* </div> */}
          </div>
        ))}
      </div>
      <button
        className={styles.commentButton}
        onClick={toggleComments}
      >
        <span className={styles.buttonContent}>
          <VisibilityIcon />
          <span>{showComments ? 'Hide Comments' : 'Show Comments'}</span>
        </span>
      </button>
    </div>
    </>
  );
}