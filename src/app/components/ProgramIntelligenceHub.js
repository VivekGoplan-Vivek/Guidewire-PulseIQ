import React from "react";
import styles from "./ProgramIntelligenceHub.module.css";

const ProgramIntelligenceHub = ({
  results = null,
  searchValue = "",
  onSearchChange = () => {},
  onSearchKeyDown = () => {},
  onSearchClick = () => {},
}) => {
  // Calculate progress percent if possible
  let percent = 0;
  if (results && results.master_feature &&
      typeof results.master_feature.num_of_features === 'number' &&
      typeof results.master_feature.num_of_features_completed === 'number' &&
      results.master_feature.num_of_features > 0) {
    percent = Math.round(
      (results.master_feature.num_of_features_completed / results.master_feature.num_of_features) * 100
    ); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>
            <span className={styles.guideWireColor} style={{display:'inline-flex',alignItems:'center',gap:'3px'}}>
              <svg width="38" height="38" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.7}}>
                <rect x="10" y="20" width="70" height="50" rx="20" fill="#e0e7ff" stroke="#2176a5" strokeWidth="3"/>
                <circle cx="30" cy="45" r="6" fill="#2176a5"/>
                <circle cx="60" cy="45" r="6" fill="#2176a5"/>
                <rect x="38" y="60" width="14" height="4" rx="2" fill="#2176a5"/>
                <rect x="42" y="10" width="6" height="12" rx="3" fill="#2176a5"/>
                <circle cx="45" cy="10" r="3" fill="#2176a5"/>
              </svg>
              PulseIQ
            </span>
          </h1>
          <div className={styles.subtitle}>AI-powered cross-pod visibility and risk detection</div>
          
        </div>
        <div className={styles.searchSection}>
          <input
            className={styles.searchInput}
            placeholder="Aha Master Feature ID"
            value={searchValue}
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
          />
          <button
            className={styles.searchButton}
            aria-label="search"
            onClick={onSearchClick}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="9" cy="9" r="7" stroke="#222" strokeWidth="2"/><path d="M15 15L18 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
     {results && <div className={styles.mainContentRow}>
        <div className={styles.leftCol}>
        <div
          className={styles.badgesRow}
          onClick={() => {
            if (results && results.master_feature && results.master_feature.url) {
              window.open(results.master_feature.url, '_blank');
            }
          }}
          style={{ cursor: results && results.master_feature && results.master_feature.url ? 'pointer' : 'default' }}
        >
            <span className={styles.badgeId}>
              <span className={styles.badgeIcon} role="img" aria-label="feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers h-3 w-3"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg>
              </span> {results && results.master_feature && results.master_feature.url ? results.master_feature.url.split('/').pop() : ''}
            </span>
          </div>
          <div
            className={styles.mainTitle}
            onClick={() => {
              if (results && results.master_feature && results.master_feature.url) {
                window.open(results.master_feature.url, '_blank');
              }
            }}
            style={{ cursor: results && results.master_feature && results.master_feature.url ? 'pointer' : 'default' }}
          >
            {results && results.master_feature && results.master_feature.name}
          </div>
          <div className={styles.mainSubtitle}>{results && results.master_feature && results.master_feature.program_description}</div>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} role="img" aria-label="calendar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4 text-muted-foreground"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
              </span>
              {results && results.master_feature && results.master_feature.due_date ? results.master_feature.due_date : "N/A"}
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} role="img" aria-label="release">
                <img src="/Images/black-rocket.png" alt="release" width="16" height="16" />
              </span>
              {results && results.master_feature && results.master_feature.release_name ? results.master_feature.release_name : "N/A"}
            </span>
          </div>
          <div className={styles.progressSection}>
            <div className={styles.progressLabelRow}>
              <span className={styles.progressLabel}>Aha Master Feature Progress</span>
              <span className={styles.progressPercent}>{percent}%</span>
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: `${percent}%` }}></div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default ProgramIntelligenceHub; 