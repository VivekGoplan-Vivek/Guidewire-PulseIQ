'use client'
import React, { useState } from 'react';
import styles from './chatbot.module.css';
import ChatbotPage from './ChatbotPage';

const ChatbotIcon = ({featureId=null,results=null}) => {
  console.log("featureIdfeatureId",featureId)
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.chatbotIconWrapper} onClick={() => setOpen(true)}>
        <span className={styles.tooltip}>AI Assistant</span>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.85}}>
          <g>
            <path d="M8 14C8 10.6863 10.6863 8 14 8H42C45.3137 8 48 10.6863 48 14V34C48 37.3137 45.3137 40 42 40H20L12 48V40H14C10.6863 40 8 37.3137 8 34V14Z" fill="#e0e7ff" stroke="#2176a5" strokeWidth="2.5"/>
            <g className={styles.typingDots}>
              <circle className={styles.dot1} cx="20" cy="26" r="3" fill="#2176a5"/>
              <circle className={styles.dot2} cx="28" cy="26" r="3" fill="#2176a5"/>
              <circle className={styles.dot3} cx="36" cy="26" r="3" fill="#2176a5"/>
            </g>
          </g>
        </svg>
      </div>
      {open && <ChatbotPage results={results} onClose={() => setOpen(false)} featureId={featureId} />}
    </>
  );
};

export default ChatbotIcon; 