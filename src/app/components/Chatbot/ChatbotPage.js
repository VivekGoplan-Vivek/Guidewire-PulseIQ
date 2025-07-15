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

// 1. Add sample questions and responses
const SAMPLE_QA = [
  {
    question: "Can we mitigate the risk for this master feature?",
    response: 'To mitigate the risks associated with the master feature \"Larger CDA Data pipelines with increased options,\" here are some steps that can be taken:\n\n1. **Ensure Timely Completion of Part II**:\n   - Break down the remaining tasks into smaller, manageable parts with clear deadlines.\n   - Allocate additional resources if necessary to ensure the tasks are completed on time.\n   - Conduct regular progress check-ins to ensure the team is on track.\n\n2. **CDPO Integration and Testing**:\n   - Prioritize the integration and testing tasks to ensure they are not delayed.\n   - Collaborate closely with the CDPO team to align on timelines and resource availability.\n   - Set up a dedicated testing environment to avoid any last-minute issues.\n\n3. **Monitor Dependencies**:\n   - Identify any dependencies on other teams or components and ensure they are addressed early.\n   - Establish clear communication channels with dependent teams to quickly resolve any issues.\n\n4. **Risk Management**:\n   - Continuously monitor the project for any emerging risks and address them promptly.\n   - Have contingency plans in place for critical tasks that might face delays.\n\n5. **Stakeholder Communication**:\n   - Keep all stakeholders informed about the progress and any potential risks.\n   - Provide regular updates and involve them in decision-making processes to ensure alignment.\n\n6. **Testing and Validation**:\n   - Conduct thorough testing to validate the changes and ensure they meet performance benchmarks.\n   - Use automated testing tools to speed up the testing process and ensure coverage.\n\nBy focusing on these areas, the team can mitigate the risks and ensure successful completion of the master feature.'
  },
  {
    question: "What are the current risks?",
    response: 'Current risks include possible misconfiguration if documentation and UI do not clearly differentiate new enhanced tiers from existing ones.'
  },
  {
    question: "What are the dependencies?",
    response: 'The project depends on accurate identification of PPP customers using the is_PPP flag in Helios and coordination with the Control Plane.'
  },
  {
    question: "What features are in progress?",
    response: 'CDP-54160: Technical design and implementation for Extra Large CDA pipelines. CDP-51710: Development for Extra Large pipelines for CDA self-service is completed.'
  },
  {
    question: "What are the next steps?",
    response: 'Next steps: Update documentation, finalize UI changes, conduct testing, coordinate with Control Plane, and gather feedback.'
  },
  {
    question: "Who are the stakeholders?",
    response: 'Stakeholders include SRE users, Control Plane team, and Guidewire Home PPP program tenants.'
  },
  {
    question: "What is the acceptance criteria?",
    response: 'Acceptance criteria are being discussed and updated based on recent requirements and user journey feedback.'
  },
  {
    question: "What documentation needs updating?",
    response: 'Internal documentation must be updated to include new enhanced tiers and inform SRE users about the provisioning process.'
  },
  {
    question: "What testing is required?",
    response: 'Thorough testing is required to verify the provisioning process for enhanced tiers and ensure users see the correct pipe size on the UI.'
  },
  {
    question: "What is the user interface change?",
    response: 'The UI will be updated to reflect new CDA tiers, visible only to eligible SRE users.'
  }
];

const DEFAULT_FALLBACK = 'Sorry, I do not have an answer for that. Please try asking about Master Features, Sub Features, Jira Epics, or Risk Analysis.';

const getLocalStorageKey = (featureId) => featureId ? `pulseiq_chat_messages_${featureId}` : 'pulseiq_chat_messages';
const DEFAULT_WELCOME = [
  { sender: 'bot', text: "Hi! I'm Pulse IQ. Ask me anything about Master Features,Sub Features, Jira Epics, or Risk Analysis." }
];

const findSampleResponse = (userInput) => {
  // Simple case-insensitive match; can be improved with fuzzy matching
  const normalized = userInput.trim().toLowerCase();
  const found = SAMPLE_QA.find(qa => qa.question.toLowerCase() === normalized);
  return found ? found.response : null;
};

const ChatbotPage = ({ results=null,onClose , featureId=null }) => {
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
      // Check for sample response
      const sampleResp = findSampleResponse(userMessage.text);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: sampleResp || DEFAULT_FALLBACK }
      ]);
      setTyping(false);
      // Call the API after the bot responds
      callYourApi(
        userMessage.text,
        // featureId,
        getLocalStorageKey,
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
    if (typeof window !== 'undefined') {
      localStorage.setItem(getLocalStorageKey(featureId), JSON.stringify(messages));
    }
  }, [messages, featureId]);



  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(getLocalStorageKey(featureId));
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages(DEFAULT_WELCOME);
      }
    }
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