import React from 'react';
import styles from './FeatureCards.module.css';

const JiraEpicsCard = ({ epics = [] }) => {
  console.log('JiraEpicsCard epics:', epics); // Debug log
  if (!Array.isArray(epics) || epics.length === 0) {
    return <div>No Jira Epics found.</div>;
  }
  return (
    <div className={styles.cardsWrapper}>
      {epics.map((epic, idx) => {
        const cardContent = (
          <div className={styles.card} key={epic.key || epic.jira_url || idx} style={{ cursor: epic.jira_url ? 'pointer' : 'default' }}>
            <div className={styles.cardHeader}>
              <span className={styles.featureKey}>{epic.key || epic.jira_url || epic.name}</span>
              <span
                className={[
                  styles.statusBadge,
                  epic.status && epic.status.toLowerCase() === 'at_risk' ? styles.atRisk : '',
                  epic.status && epic.status.toLowerCase() === 'on_track' ? styles.onTrack : ''
                ].join(' ')}
                style={
                  epic.status && epic.status.toLowerCase() === 'at_risk'
                    ? undefined
                    : epic.status && epic.status.toLowerCase() === 'on_track'
                      ? undefined
                      : {background: epic.statusColor || '#5b8df6', color: '#fff', padding: '4px 12px', borderRadius: '16px', fontWeight: 600, fontSize: '0.95rem', marginLeft: 8}
                }
              >
                {epic.status && epic.status.toLowerCase() === 'at_risk'
                  ? 'At Risk'
                  : epic.status && epic.status.toLowerCase() === 'on_track'
                    ? 'On Track'
                    : (epic.status || epic.key || epic.name)}
              </span>
            </div>
            <div className={styles.featureTitle}>{epic.title || epic.name}</div>
            <div className={styles.featurePod}>{epic.pod || ''}</div>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Progress</span>
              <span className={styles.progressPercent}>{typeof epic.progress === 'number' ? epic.progress + '%' : epic.progress || ''}</span>
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{width: `${typeof epic.progress === 'number' ? epic.progress : 0}%`, background: 'rgb(0, 115, 157)'}}></div>
            </div>
            <div className={styles.storiesRow}>
              <span className={styles.storiesLabel}>Total Task</span>
              <span className={styles.storiesCount}>{epic.stories || epic.num_of_tasks || 0}</span>
            </div>
            <div className={styles.storiesRow}>
              <span className={styles.storiesLabel}>Total Task Completed</span>
              <span className={styles.storiesCount}>{epic.stories || epic.num_of_tasks_completed || 0}</span>
            </div>
          </div>
        );
        return epic.jira_url ? (
          <a
            key={epic.key || epic.jira_url || idx}
            href={epic.jira_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {cardContent}
          </a>
        ) : cardContent;
      })}
    </div>
  );
};

export default JiraEpicsCard; 