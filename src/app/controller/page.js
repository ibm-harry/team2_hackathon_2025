"use client";
import { useSocket } from "../../../hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import styles from './styles.module.css';

export default function Controller() {
  const { slide, changeSlide, comments, addComment, showComments, toggleComments } = useSocket();
  const previewRef = useRef(null);
  const [commentInput, setCommentInput] = useState({
    isOpen: false,
    text: "",
    name: "",
    position: null,
    slideIndex: null
  });
  const [isCommentMode, setIsCommentMode] = useState(false);
  
  const slides = [
    "/Frame 2.png"
  ];

  // Update comment mode toggle with debug
  const toggleCommentMode = () => {
    const newMode = !isCommentMode;
    console.log('Toggling comment mode:', newMode);
    setIsCommentMode(newMode);
  };

  // Update click handler with improved debug
  const handleImageClick = (e, index) => {
    if (!isCommentMode) return;
    
    const rect = e.target.getBoundingClientRect();
    const scrollLeft = previewRef.current.scrollLeft;
    
    // Calculate position as percentage relative to image dimensions
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    console.log('Click coordinates:', {
      rawX: e.clientX - rect.left,
      rawY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      calculatedX: x,
      calculatedY: y
    });
    
    setCommentInput({
      isOpen: true,
      text: "",
      name: "",
      position: { x, y },
      slideIndex: index
    });
    setIsCommentMode(false);
  };

  // Add handleCommentSubmit if it's missing
  const handleCommentSubmit = () => {
    if (commentInput.text.trim() && commentInput.name.trim()) {
      const newComment = {
        id: Date.now(),
        position: commentInput.position,
        slideIndex: slide,
        text: commentInput.text,
        name: commentInput.name
      };
      
      console.log('Adding comment:', newComment);
      addComment(newComment);
      setCommentInput({ isOpen: false, text: "", name: "", position: null, slideIndex: null });
    }
  };

  // Update the CommentIcon component with IBM-style icon
  const CommentIcon = () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
      <path d="M17.7,30L16,29l4-7h6c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h9v2H6c-2.2,0-4-1.8-4-4V8 c0-2.2,1.8-4,4-4h20c2.2,0,4,1.8,4,4v12c0,2.2-1.8,4-4,4h-4.8L17.7,30z"/>
    </svg>
  );

  // Update the CloseIcon component with IBM-style icon
  const CloseIcon = () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
      <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"/>
    </svg>
  );

  // Add VisibilityIcon component after CloseIcon
  const VisibilityIcon = () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
      {showComments ? (
        <path d="M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-13.91-9C5.1,10.93,10.7,7,16,7s10.9,3.93,13.91,9C26.9,21.07,21.3,25,16,25Z M16,11a5,5,0,1,0,5,5A5,5,0,0,0,16,11Z"/>
      ) : (
        <path d="M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-13.91-9C5.1,10.93,10.7,7,16,7s10.9,3.93,13.91,9C26.9,21.07,21.3,25,16,25ZM16,11a5,5,0,1,0,5,5A5,5,0,0,0,16,11Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,16,19Z"/>
      )}
    </svg>
  );

  return (
    <div className={styles.container}>
      {isCommentMode && (
        <div className={styles.notification}>
          Click anywhere on the image to add a comment
        </div>
      )}
      
      <div ref={previewRef} className={styles.imageContainer}>
        {slides.map((img, index) => (
          <div key={index} className={styles.slideWrapper}>
            <div className="relative h-full">
              <img
                className={`${styles.image} ${index === slide ? '' : 'opacity-50'}`}
                src={slide ? 'Frame 3.png' : 'Frame 2.png'}
                alt={`Slide ${index}`}
                onClick={(e) => handleImageClick(e, index)}
              />
              {showComments && comments
                .filter(comment => comment.slideIndex === slide)
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
                      <strong>{comment.slideIndex}</strong>: {comment.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.commentButton} ${isCommentMode ? styles.active : ''}`}
          onClick={toggleCommentMode}
        >
          <span className={styles.buttonContent}>
            {isCommentMode ? <CloseIcon /> : <CommentIcon />}
            <span>{isCommentMode ? 'Cancel' : 'Add Comment'}</span>
          </span>
        </button>
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

      {commentInput.isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <input
              type="text"
              className={styles.modalInput}
              value={commentInput.name}
              onChange={(e) => setCommentInput(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name..."
              autoFocus
            />
            <textarea
              className={styles.modalTextarea}
              value={commentInput.text}
              onChange={(e) => setCommentInput(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter your comment..."
            />
            <div className={styles.modalButtons}>
              <button
                className={styles.buttonCancel}
                onClick={() => setCommentInput({ isOpen: false, text: "", name: "", position: null, slideIndex: null })}
              >
                Cancel
              </button>
              <button
                className={styles.buttonAdd}
                onClick={handleCommentSubmit}
                disabled={!commentInput.text.trim() || !commentInput.name.trim()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}