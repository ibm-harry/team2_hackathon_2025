'use client';

import { useState, useEffect } from 'react';
import { useSocket } from "../../hooks/useSocket";
import styles from './styles.module.css';

export default function Home() {
  const { slide, comments } = useSocket();

  const slides = [
    "/Frame 2.png"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.slideContainer}>
        {slides.map((img, index) => (
          <div key={index} className={styles.slideWrapper}>
            <div className={styles.slideContent}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className={`${styles.image} ${
                  index === slide ? styles.activeImage : styles.inactiveImage
                }`}
              />
              {comments
                .filter(comment => comment.slideIndex === index)
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}