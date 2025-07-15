"use client";

import { useState } from "react";

import Header from "./components/Header/Header";
import styles from "./page.module.css";
import FeatureStatusResult from "./components/FeatureStatusResult";
import ProgramIntelligenceHub from "./components/ProgramIntelligenceHub";
import SummaryCards from './components/SummaryCards';
import FeatureOverview from "./components/FeatureOverview";
import TabView from "./components/TabView";
import PodsCard from "./components/PodsCard";
import JiraEpicsCard from "./components/JiraEpicsCard";
import FeatureOverviewDashboard from "./components/FeatureOverviewDashboard";
import MasterFeatureOverviewDashboard from "./components/MasterFeatureOverviewDashboard";
import ChatbotIcon from "./components/Chatbot/ChatbotIcon";
import animatedIconStyles from "./components/AnimatedIcon.module.css";

const cardData = [
  {
    title: 'Total Features',
    value: 3,
    description: 'Across 3 pods',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(37,99,235)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
    ),
    colorClass: 'blue',
  },
  {
    title: 'Completed',
    value: 1,
    description: 'Successfully delivered',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(5,150,105)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
    ),
    colorClass: 'green',
  },
  {
    title: 'At Risk',
    value: 1,
    description: 'Require attention',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251,191,36)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
    ),
    colorClass: 'yellow',
  },
  {
    title: 'Jira Epics',
    value: 9,
    description: 'Total epics tracked',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(168,85,247)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 1 7 7l-1.5 1.5a5 5 0 0 1-7-7"/><path d="M14 11a5 5 0 0 0-7-7L5.5 5.5a5 5 0 0 0 7 7"/></svg>
    ),
    colorClass: 'purple',
  },
];

export default function Home() {
  const [featureId, setFeatureId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("Master Feature Overview");

  const handleViewStatus = async () => {
    if (!featureId.trim()) {
      setError("Please enter a Main Feature ID");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(`/api/feature-status?featureId=${encodeURIComponent(featureId.trim())}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Failed to fetch feature status");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleViewStatus();
    }
  };

  console.log("featureIdfeatureId",featureId)

  return (
    <>
      <Header
        logoSrc="/Images/guidewire.svg"
        title="PulseIQ"
      />
      <div style={{maxWidth:'80rem',margin:'0 auto'}}>
        <ProgramIntelligenceHub 
          results={results}
          searchValue={featureId}
          onSearchChange={e => setFeatureId(e.target.value)}
          onSearchKeyDown={handleKeyPress}
          onSearchClick={() => handleKeyPress({ key: 'Enter' })}
        />
        {!results && (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'220px',marginTop:'2rem',marginBottom:'2rem'}}>
            <svg width="120" height="120" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.5}}>
              <rect x="10" y="20" width="70" height="50" rx="20" fill="#e0e7ff" stroke="#2176a5" strokeWidth="3"/>
              <circle cx="30" cy="45" r="6" fill="#2176a5" className={animatedIconStyles.eye}/>
              <circle cx="60" cy="45" r="6" fill="#2176a5" className={`${animatedIconStyles.eye} ${animatedIconStyles.right}`}/>
              <rect x="38" y="60" width="14" height="4" rx="2" fill="#2176a5"/>
              <rect x="42" y="10" width="6" height="12" rx="3" fill="#2176a5"/>
              <circle cx="45" cy="10" r="3" fill="#2176a5" className={animatedIconStyles.topCircle}/>
            </svg>
            <div style={{marginTop:'1rem',color:'#2176a5',fontWeight:600,fontSize:'1.2rem',fontFamily:'Poppins, Arial, sans-serif',opacity:0.5}}>Smart Insights Powered by Pulse IQ</div>
          </div>
        )}
        {results && (
          <>
            <SummaryCards cardData={cardData} results={results} />
            {/* <FeatureOverview /> */}
            <TabView activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "Master Feature Overview" && <MasterFeatureOverviewDashboard  results={results}/>} 
            {activeTab === "Feature Overview" && <FeatureOverviewDashboard results={results} />}
            {activeTab === "Pod Status" && <PodsCard results={results} />}
            {activeTab === "Jira Epics" && (
              <JiraEpicsCard
                epics={results && Array.isArray(results.features) ? results.features.map(f => ({
                  key: f.jira_url ? f.jira_url.split('/').pop() : f.name,
                  name: f.name,
                  title: f.name,
                  pod: f.pod || '',
                  progress: typeof f.num_of_tasks === 'number' && typeof f.num_of_tasks_completed === 'number' && f.num_of_tasks > 0
                    ? Math.round((f.num_of_tasks_completed / f.num_of_tasks) * 100)
                    : (typeof f.progress === 'number' ? f.progress : ''),
                  stories: f.num_of_tasks,
                  num_of_tasks: f.num_of_tasks,
                  num_of_tasks_completed: f.num_of_tasks_completed,
                  jira_url: f.jira_url,
                  status: f.risk_status,
                  statusColor: f.status === 'closed' ? '#1ec773' : f.status === 'in_progress' ? '#5b8df6' : (f.status && f.status.toLowerCase() === 'at_risk') ? '#ef4444' : '#5b8df6',
                  statusDot: f.risk_status && f.risk_status.toLowerCase() === 'at_risk' ? '#ef4444' : (f.risk_status && f.risk_status.toLowerCase() === 'on_track' ? '#1ec773' : '#2176a5'),
                })) : []}
              />
            )}
          </>
        )}
      </div>
      {results && <ChatbotIcon results={results} featureId={featureId}/>}
    </>
  );
}
