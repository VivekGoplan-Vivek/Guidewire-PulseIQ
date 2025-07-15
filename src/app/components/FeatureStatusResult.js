import React, { useState } from "react";
import styles from "./FeatureStatusResult.module.css";
import SubFeature from "./SubFeature";

export default function FeatureStatusResult({ results, hideTitle = false, hideStatus = false, isSubFeature = false ,subFeatures=[]}) {
  const [showMoreSummary, setShowMoreSummary] = useState(false);
  
  if (!results) return null;

  console.log("results",results)

  const riskItems = results.risk
    ? results.risk
        .split('\n')
        .filter(Boolean)
        .map((item) => {
          const match = item.match(/- \*\*(.+?)\*\*: (.+)/);
          if (match) {
            return {
              title: match[1],
              description: match[2],
              type: 'structured'
            };
          } else {
            // Handle plain text format
            return {
              title: null,
              description: item.trim(),
              type: 'plain'
            };
          }
        })
        .filter(Boolean)
    : [];

  const programDescriptionItems = results.progress
    ? results.progress
        .split('\n')
        .filter(Boolean)
        .map((item) => {
          // Try to match structured format like "- **Title**: Description"
          const match = item.match(/- \*\*(.+?)\*\*: (.+)/);
          if (match) {
            return {
              title: match[1].replace(/^###\s*/, ''), // Remove ### from title
              description: match[2].replace(/^###\s*/, ''), // Remove ### from description
              type: 'structured'
            };
          } else {
            // Handle plain text format (existing behavior)
            const plainItem = item.replace(/^- /, '').replace(/^###\s*/, '').trim(); // Remove ### from plain text
            if (plainItem) {
              return {
                title: null,
                description: plainItem,
                type: 'plain'
              };
            }
            return null;
          }
        })
        .filter(Boolean)
    : [];

  const handleClick = () => {
    if (results.url) {
      window.open(results.url, '_blank');
    }
  };

  return (
    <div 
      className={
        isSubFeature
          ? `${styles.resultsContainerSubFeature} ${styles.subFeatureResult}`
          : styles.resultsContainer
      }
      // onClick={handleClick}
      style={{ cursor: results.url ? 'pointer' : 'default' }}
    >
      <div className={styles.titleRow}>
        {!hideTitle && (
          <h3 
            className={styles.resultsTitle}
            onClick={(e) => {
              e.stopPropagation();
              if (results.url) {
                window.open(results.url, '_blank');
              }
            }}
            style={{ 
              cursor: results.url ? 'pointer' : 'default',
              textDecoration: results.url ? 'underline' : 'none'
            }}
          >
            {results.name}
          </h3>
        )}
        {!hideStatus && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {results.status === 'In Progress' && (
              <span className={styles.atRiskBadge}>At Risk</span>
            )}
            <span className={`${styles.statusValue} ${styles.statusBadge} ${styles[results.status.toLowerCase().replace(' ', '')]}`}>
              {results.status}
            </span>
          </span>
        )}
      </div>
      <div className={isSubFeature
        ?styles.resultsContentSubFeature:styles.resultsContent}>
        <div className={styles.statusGrid}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>
              <span className={styles.icon}>📊</span>
              Progress:
            </span>
            <span className={styles.statusValue}>
              1 out of 2 features are completed. One is blocked.
            </span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>
              <span className={styles.icon}>📅</span>
              Est. Completion:
            </span>
            <span className={styles.statusValue}>
              {new Date(results.timeline).toLocaleDateString()}
            </span>
          </div>
         {results && results.risk && <div className={styles.statusItem}>
            <div className={styles.risksColumn}>
              <div className={styles.risksHeader}>
                <span className={styles.icon}>⚠️</span>
                <span>Risks:</span>
              </div>
              <div className={styles.risksContent}>
                {riskItems.map((risk, index) => (
                  <div key={index} className={styles.riskItem}>
                    {risk.type === 'structured' ? (
                      <>
                        <strong>🔸 {risk.title}</strong>
                        <p>{risk.description}</p>
                      </>
                    ) : (
                      <p>{risk.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>}
          {programDescriptionItems.length > 0 && <div className={styles.statusItem}>
            <div className={styles.summaryColumn}>
              <div className={styles.summaryHeader}>
                <span className={styles.icon}>🤖</span>
                <span>Progress Summary:</span>
              </div>
              <div className={styles.summaryContent}>
                {programDescriptionItems.slice(0, showMoreSummary ? programDescriptionItems.length : 8).map((item, index) => (
                  <div key={index} className={styles.summaryItem}>
                    {item.type === 'structured' ? (
                      <>
                        <strong>🔸 {item.title}</strong>
                        <p>{item.description}</p>
                      </>
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>
                ))}
                {programDescriptionItems.length > 8 && (
                  <button 
                    className={styles.seeMoreButton}
                    onClick={() => setShowMoreSummary(!showMoreSummary)}
                  >
                    {showMoreSummary ? 'See Less' : 'See More'}
                  </button>
                )}
              </div>
            </div>
          </div>}
        </div>
    
      </div>
      {/* SubFeature Section */}
      <SubFeature subfeatures={subFeatures} />
    </div>
  );
} 