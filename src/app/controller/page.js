"use client";
import { useSocket } from "../../../hooks/useSocket";
import { useEffect, useRef, useState } from "react";

export default function Controller() {
  const { slide, changeSlide, comments, addComment } = useSocket();
  const previewRef = useRef(null);
  const [commentInput, setCommentInput] = useState({
    isOpen: false,
    text: "",
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
    console.log('Image clicked, comment mode:', isCommentMode);
    if (!isCommentMode) {
      console.log('Click ignored - not in comment mode');
      return;
    }
    
    const rect = e.target.getBoundingClientRect();
    const scrollLeft = previewRef.current.scrollLeft;
    
    // Simplify coordinate calculation
    const x = ((e.clientX - rect.left + scrollLeft) / e.target.width) * 100;
    const y = ((e.clientY - rect.top) / e.target.height) * 100;
    
    console.log('Click event:', { 
      clientX: e.clientX,
      clientY: e.clientY,
      rect: rect,
      scrollLeft: scrollLeft,
      calculatedX: x,
      calculatedY: y
    });
    
    console.log('Opening comment input');
    setCommentInput({
      isOpen: true,
      text: "",
      position: { x, y },
      slideIndex: index
    });
    setIsCommentMode(false);
  };

  // Add handleCommentSubmit if it's missing
  const handleCommentSubmit = () => {
    if (commentInput.text.trim()) {
      const newComment = {
        id: Date.now(),
        position: commentInput.position,
        slideIndex: commentInput.slideIndex,
        text: commentInput.text
      };
      
      console.log('Adding comment:', newComment);
      addComment(newComment);
    }
    setCommentInput({ isOpen: false, text: "", position: null, slideIndex: null });
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

  return (
    <div className="relative flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      {/* Add comment mode indicator */}
      {isCommentMode && (
        <div className="fixed top-4 left-0 right-0 text-center bg-blue-500 py-2 z-30">
          Click anywhere on the image to add a comment
        </div>
      )}
      
      <div
        ref={previewRef}
        className="flex-1 overflow-x-auto overflow-y-hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map((img, index) => (
          <div 
            key={index} 
            className="relative h-screen"
            style={{ minWidth: 'fit-content' }}
          >
            <div className="relative h-full">
              <img
                style={{
                  height: '100vh',
                  width: 'auto',
                  objectFit: 'contain'
                }}
                src={img}
                alt={`Slide ${index}`}
                className={`transition ${
                  index === slide ? "" : "opacity-50"
                }`}
                onClick={(e) => {
                  console.log('Raw click event');
                  handleImageClick(e, index);
                }}
              />
              {comments
                .filter(comment => comment.slideIndex === index)
                .map(comment => (
                  <div
                    key={comment.id}
                    className="absolute w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-blue-600 group"
                    style={{
                      left: `${comment.position.x}%`,
                      top: `${comment.position.y}%`,
                      zIndex: 50
                    }}
                  >
                    <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded -translate-y-full whitespace-nowrap">
                      {comment.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Updated Floating Comment Button with IBM styling */}
      <div className="fixed left-0 bottom-0 p-6" style={{ zIndex: 9999, pointerEvents: 'none' }}>
        <button
          className={`relative rounded-none p-4 font-medium text-white transition-all ${
            isCommentMode 
              ? 'bg-[#da1e28] hover:bg-[#fa4d56]' 
              : 'bg-[#0f62fe] hover:bg-[#0353e9]'
          }`}
          onClick={toggleCommentMode}
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}
        >
          <span className="flex items-center gap-2">
            {isCommentMode ? <CloseIcon /> : <CommentIcon />}
            <span className="text-sm font-ibm-plex-sans">
              {isCommentMode ? 'Cancel' : 'Add Comment'}
            </span>
          </span>
        </button>
      </div>

      {/* Comment Input Modal - now as overlay */}
      {commentInput.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-lg p-4 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <textarea
              className="w-full h-32 p-2 text-black border rounded mb-4"
              value={commentInput.text}
              onChange={(e) => setCommentInput(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter your comment..."
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setCommentInput({ isOpen: false, text: "", position: null, slideIndex: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCommentSubmit}
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