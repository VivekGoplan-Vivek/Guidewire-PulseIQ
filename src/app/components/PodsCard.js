import React from 'react';
import styles from './PodsCard.module.css';

const mapApiToPods = (results) => {
  if (!results || !Array.isArray(results.pods) || !Array.isArray(results.features)) return [];
  // Map pods from API response
  return results.pods.map((pod) => {
    // Find features for this pod
    const podFeatures = results.features.filter(f => f.pod === pod.name);
    return {
      pod: pod.name,
      features: podFeatures.map((f, idx) => ({
        key: f.jira_url || f.aha_url || f.name || idx,
        title: f.name,
        progress: (typeof f.num_of_tasks === 'number' && typeof f.num_of_tasks_completed === 'number' && f.num_of_tasks > 0)
          ? Math.round((f.num_of_tasks_completed / f.num_of_tasks) * 100)
          : '',
        risks: Array.isArray(f.risk) ? f.risk.length : (f.risk ? 1 : 0),
        statusColor: f.risk_status === 'at_risk' ? '#f6b85b' : f.risk_status === 'on_track' ? '#1ec773' : '#2176a5',
        statusDot: f.risk_status === 'at_risk' ? '#ff4d4f' : f.risk_status === 'on_track' ? '#1ec773' : '#2176a5',
      })),
      overallProgress: (typeof pod.num_of_features === 'number' && typeof pod.num_of_features_completed === 'number' && pod.num_of_features > 0)
        ? Math.round((pod.num_of_features_completed / pod.num_of_features) * 100)
        : 0,
        activeRisks: podFeatures.reduce((acc, f) => {
          return acc + (Array.isArray(f.risk) && f.risk.length > 0 ? 1 : 0);
        }, 0)
    };
  });
};

const PodsCard = ({ results = null }) => {
  const pods = mapApiToPods(results);

  if (!pods.length) return <div className={styles.podsWrapper}>No pod data available.</div>;

  return (
    <div className={styles.podsWrapper}>
      {pods.map((pod, idx) => (
        <div className={styles.podCard} key={pod.pod}>
          <div className={styles.podHeader}>
            <span className={styles.podTitle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.podIcon} style={{marginRight:8}}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              {pod.pod}
            </span>
            <span className={styles.activeFeatures}>{pod.features.length} active features</span>
          </div>
          <div className={styles.progressRow}>
            <span className={styles.progressLabel}>Overall Progress</span>
            <span className={styles.progressPercent}>{pod.overallProgress}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{width: `${pod.overallProgress}%`}}></div>
          </div>
          {pod.activeRisks > 0 && (
            <div className={styles.risksRow}>
              <span className={styles.risksLabel}>Active Risks</span>
              <span className={styles.risksBadge}>{pod.activeRisks}</span>
            </div>
          )}
          <div className={styles.featuresSection}>
            <span className={styles.featuresLabel}>FEATURES</span>
            {pod.features.map((feature) => (
              <div className={styles.featurePillRow} key={feature.key}>
                <span className={styles.featurePill}>{feature.title}</span>
                <span className={styles.statusDot} style={{background: feature.statusDot}}></span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PodsCard; 