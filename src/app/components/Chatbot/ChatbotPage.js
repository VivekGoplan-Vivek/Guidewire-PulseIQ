import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './chatbot.module.css';

const SAMPLE_RESPONSE =
  '### Stream CloudWatch Logs to ELK - POC & Development Status Report\n' +
  '\n' +
  '#### 🟢 Current Status\n' +
  'The project is currently in progress, focusing on supporting enhanced CDA tiers for SRE users provisioning through Guidewire Home for PPP program tenants and star systems. The technical design and implementation for invoking connectors for Extra Large CDA pipelines are underway.\n' +
  '\n' +
  '#### ⚠️ Risks / Dependencies\n' +
  '- **Dependencies**: The project relies on accurate identification of PPP customers using the `is_PPP` flag in Helios. Coordination with the Control Plane and downstream systems is necessary for passing the correct CDA tier values.\n' +
  '- **Risks**: There is a risk of confusion or misconfiguration if the documentation and user interface do not clearly differentiate between the new enhanced tiers and existing ones. Additionally, ensuring that all necessary documentation updates are completed for internal use is critical to avoid operational issues.\n' +
  '\n' +
  '#### 📈 Progress Summary\n' +
  '- **Features**: \n' +
  '  - CDP-54160: Technical design and implementation for invoking connectors for Extra Large CDA pipelines is in progress.\n' +
  '  - CDP-51710: Development for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers is completed.\n' +
  '- **Comments and Discussions**: Ongoing discussions are addressing acceptance criteria, user journey, and documentation requirements. Updates have been made to the technical design scope and unit tests based on recent requirements.\n' +
  '\n' +
  '#### 📅 Next Steps / Actions\n' +
  '1. **Documentation**: Update internal documentation to include the new enhanced tiers and ensure SRE users are informed about the provisioning process.\n' +
  '2. **User Interface**: Finalize the user interface changes to reflect the new CDA tiers and ensure they are only visible to eligible SRE users.\n' +
  '3. **Testing**: Conduct thorough testing to verify that the provisioning process for enhanced tiers works as expected and that users can see the correct pipe size on the UI.\n' +
  '4. **Coordination**: Continue coordination with the Control Plane team to ensure seamless integration and data flow for the new tiers.\n' +
  '5. **Review and Feedback**: Gather feedback from stakeholders and make necessary adjustments to the implementation and documentation.';

const getLocalStorageKey = (featureId) => featureId ? `pulseiq_chat_messages_${featureId}` : 'pulseiq_chat_messages';
const DEFAULT_WELCOME = [
  { sender: 'bot', text: "Hi! I'm PulseIQ. Ask me anything about Master Features,Sub Features, Jira Epics, or Risk Analysis." }
];

const ChatbotPage = ({ results=null,onClose , featureId=null }) => {
  // Load messages from localStorage or use default
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(getLocalStorageKey(featureId));
      if (saved) return JSON.parse(saved);
    }
    return DEFAULT_WELCOME;
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const callYourApi = async (chatText, masterId, completeResponse) => {
    try {
      const response = await fetch('https://aiconnect.int.ccs.guidewire.net/genai/openai/v1/xcdp/dev/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJraWQiOiJtX21jM2JlYl9BX180eDZWT2JyV21nZWlxOWw3QjJ2M096MGpNNVdwWHUwIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjlkTVhtN01zZ2hNbTBzNnJMamw2UEt1YU1aOXQ0SWZKbG9yVjdfeENKR3ciLCJpc3MiOiJodHRwczovL2d1aWRld2lyZS1odWIub2t0YXByZXZpZXcuY29tL29hdXRoMi9hdXNqOWZ0bmJ4T3FmR1U0VTBoNyIsImF1ZCI6Ikd1aWRld2lyZSIsImlhdCI6MTc1MjU1NzA3MywiZXhwIjoxNzUyNTYwNjczLCJjaWQiOiIwb2ExMndvcXNsalpma0xnSDBoOCIsInNjcCI6WyJnY2MucHJvamVjdHMucmVhZCIsImdjYy5zdG9yYWdlLnJlYWQiLCJnY2MuZW52aXJvbm1lbnRzLndyaXRlIiwic2NwLmdlbmFpLmtiIiwicHMucHJvamVjdHMuZXhlY3V0ZSIsInNjcC5hbmFseXRpY3MuZ2VuYWkub3BlbmFpIiwiZ2NjLnRlbmFudHMud3JpdGUiLCJnY2MuZGVwbG95bWVudHMucmVhZCIsInNjcC5hbmFseXRpY3MuZ2VuYWkuYmVkcm9jayIsImdjYy5zdG9yYWdlLndyaXRlIiwiZ2NjLmVudmlyb25tZW50cy5yZWFkIiwiY2RwLW9yY2hlc3RyYXRvci5yZWFkIiwiY2RwLW9yY2hlc3RyYXRvci53cml0ZSIsInNjcC5hbmFseXRpY3MuZ2VuYWkubGFuZ3NtaXRoIiwiYW55LnByb2plY3QiLCJhbnkudGVuYW50IiwiZ2NjLmRlcGxveW1lbnRzLndyaXRlIiwiZ2NjLnByb2plY3RzLndyaXRlIl0sInRlbmFudF9pZCI6Imd1aWRld2lyZS1odWIiLCJzdWIiOiIwb2ExMndvcXNsalpma0xnSDBoOCIsImd3YWJ1aWQiOiIiLCJ0eXBlIjoiIn0.Vmn4FYyq4u1I7IcVPpW7hBb8fFv7uDtYvTJFAVgJlrOJVcH7CMFiEWywMC4osewMqlkg_IIY6iKZ9GNmXlszPo85fKnvjegEYuLQypKro-jgtbSvjSftDLgVc4GfE2cuie8VgU4lhDCWwuYfVHWCvbz_InYPjIaRpeEEl0NcM2NjBDCDAFz7uyQusXj6E7wYsHwm0r8LLqC4iGin9Osqkvpe-hLFDypoBcRMYuyd0vIhD-_D9eI9PNYPhAK4-PqRi07yEnD70Esj32Vxl95QPVzNwk8aVA70NtHy7JAPA3ZXQrFM42SNsgurRSGjV_kwXbOlbzWcVFBb0MgkTS-SzA'
        },
        body: JSON.stringify({
          chatText,
          masterId,
          completeResponse
        })
      });
      if (!response.ok) {
        console.error('API call failed');
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: SAMPLE_RESPONSE }]);
      setTyping(false);
      // Call the API after the bot responds
      callYourApi(
        userMessage.text,
        featureId,
         results
      );
    }, 1200);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    if (typeof window !== 'undefined') {
      localStorage.setItem(getLocalStorageKey(featureId), JSON.stringify(messages));
    }
  }, [messages, featureId]);

  useEffect(() => {
    // On page reload/mount, clear the chat messages for the current featureId
    if (typeof window !== 'undefined') {
      // localStorage.removeItem(getLocalStorageKey(featureId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When featureId changes, load messages for that feature or reset to welcome
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(getLocalStorageKey(featureId));
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages(DEFAULT_WELCOME);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureId]);

  return (
    <div className={styles.chatbotDrawerOverlay}>
      <div className={styles.chatbotDrawer}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.chatbotHeader}>
          <div className={styles.chatbotAvatar}>
            <svg width="30" height="30" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.85}}>
              <rect x="10" y="20" width="70" height="50" rx="20" fill="#e0e7ff" stroke="#2176a5" strokeWidth="3"/>
              <circle cx="30" cy="45" r="6" fill="#2176a5"/>
              <circle cx="60" cy="45" r="6" fill="#2176a5"/>
              <rect x="38" y="60" width="14" height="4" rx="2" fill="#2176a5"/>
              <rect x="42" y="10" width="6" height="12" rx="3" fill="#2176a5"/>
              <circle cx="45" cy="10" r="3" fill="#2176a5"/>
            </svg>
          </div>
          <div>
            <div className={styles.chatbotTitle}>PulseIQ Assistant</div>
          </div>
        </div>
        <div className={styles.chatbotConversation}>
          {messages.map((msg, idx) => (
            msg.sender === 'bot' ? (
              <div key={idx} className={styles.botMessageRow}>
                <div className={styles.botAvatar}>
                  <svg width="24" height="24" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.85}}>
                    <rect x="10" y="20" width="70" height="50" rx="20" fill="#e0e7ff" stroke="#2176a5" strokeWidth="3"/>
                    <circle cx="30" cy="45" r="6" fill="#2176a5"/>
                    <circle cx="60" cy="45" r="6" fill="#2176a5"/>
                    <rect x="38" y="60" width="14" height="4" rx="2" fill="#2176a5"/>
                    <rect x="42" y="10" width="6" height="12" rx="3" fill="#2176a5"/>
                    <circle cx="45" cy="10" r="3" fill="#2176a5"/>
                  </svg>
                </div>
                <div className={styles.botMessage}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div key={idx} className={styles.userMessage}>{msg.text}</div>
            )
          ))}
          {typing && (
            <div className={styles.botMessageRow}>
              <div className={styles.botAvatar}>
                <svg width="24" height="24" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.85}}>
                  <rect x="10" y="20" width="70" height="50" rx="20" fill="#e0e7ff" stroke="#2176a5" strokeWidth="3"/>
                  <circle cx="30" cy="45" r="6" fill="#2176a5"/>
                  <circle cx="60" cy="45" r="6" fill="#2176a5"/>
                  <rect x="38" y="60" width="14" height="4" rx="2" fill="#2176a5"/>
                  <rect x="42" y="10" width="6" height="12" rx="3" fill="#2176a5"/>
                  <circle cx="45" cy="10" r="3" fill="#2176a5"/>
                </svg>
              </div>
              <div className={styles.botMessage}>
                <span className={styles.typingAnimation}>
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
        <div className={styles.chatbotInputWrapper}>
          <input
            className={styles.chatbotInput}
            type="text"
            placeholder="What can I help you with?"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={typing}
          />
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={typing || !input.trim()}
            aria-label="Send"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#247BFF"/>
              <path d="M9.5 14.5L18.5 10L14 18.5L13 15L9.5 14.5Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 