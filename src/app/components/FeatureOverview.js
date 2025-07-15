import React, { useState } from 'react';
import TabView from './TabView';
import styles from './FeatureOverview.module.css';

function ProgressSummary({ percent }) {
  return (
    <div className={styles.progressSummaryBox}>
      <div className={styles.progressSummaryHeader}>Progress Summary</div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${percent}%` }} />
        </div>
        <span className={styles.progressPercent}>{percent}%</span>
      </div>
    </div>
  );
}

function RiskCard({ level, text }) {
  return (
    <div className={styles.riskCard}>
      <span className={styles.riskLevel}>{level}</span>
      <span>{text}</span>
    </div>
  );
}

function ActionCard({ title, owner, due }) {
  return (
    <div className={styles.actionCard}>
      <div className={styles.actionTitle}>{title}</div>
      <div className={styles.actionMeta}>Owner: {owner} &nbsp; | &nbsp; Due: {due}</div>
    </div>
  );
}

export default function FeatureOverview() {
  const [activeTab, setActiveTab] = useState('Master Feature Overview');
  return (
    <div className={styles.pageWrapper}>
      <TabView activeTab={activeTab} onTabChange={setActiveTab} />
      {/* <div className={styles.featureHeader}>
        <div>
          <h2 className={styles.featureTitle}>User Authentication System</h2>
          <div className={styles.featureMeta}>
            Due: 2024-08-15 &nbsp; • &nbsp; Assignee: Sarah Chen &nbsp; • &nbsp; Updated: 2 hours ago
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.podLabel}>Identity Pod</span>
          <span className={styles.statusBadge}>On Track</span>
        </div>
      </div>
      <ProgressSummary percent={85} />
      <div className={styles.columns}>
        <div className={styles.leftCol}>
          <div className={styles.sectionTitle}>Risks & Dependencies</div>
          <div className={styles.sectionSubtitle}>ACTIVE RISKS</div>
          <RiskCard level="medium" text="Third-party OAuth provider rate limits" />
        </div>
        <div className={styles.rightCol}>
          <div className={styles.sectionTitle}>Next Steps & Actions</div>
          <ActionCard title="Complete OAuth 2.0 integration testing" owner="Dev Team" due="2024-08-05" />
          <ActionCard title="Security audit and penetration testing" owner="Security Team" due="2024-08-10" />
        </div>
      </div> */}
    </div>
  );
} 