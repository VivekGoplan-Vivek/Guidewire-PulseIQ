import React, { useState } from 'react';
import styles from './FeatureOverviewDashboard.module.css';

const staticFeatures = [
  {
    name: 'User Authentication System',
    pod: 'Identity Pod',
    due: '2024-08-15',
    status: 'On Track',
    progress: 85,
    risks: [
      { text: 'Third-party OAuth provider rate limits' },
      { text: 'Resource allocation conflicts in Q3' },
    ],
    progressUpdate: 'Dashboards are prototyped and metrics are flowing.',
    actions: [
      { title: 'Complete OAuth 2.0 integration testing' },
      { title: 'Security audit and penetration testing' },
      { title: 'Deploy to staging environment' },
    ]
  },
  {
    name: 'Payments Platform',
    pod: 'Finance Pod',
    due: '2024-09-01',
    status: 'At Risk',
    progress: 60,
    risks: [
      { text: 'Delayed integration with payment gateway' }
    ],
    progressUpdate: 'Initial integration complete, awaiting QA.',
    actions: [
      { title: 'Resolve payment gateway issues' },
      { title: 'Begin QA testing' },
    ]
  }
];

export default function FeatureOverviewDashboard({ results = null }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  // Map API response to the expected feature format if results.features exists
  const features = results && Array.isArray(results.features)
    ? results.features.map(f => ({
        name: f.name,
        pod: f.pod || '',
        due: f.due_date || f.timeline || '',
        status: (f.risk_status || '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        progress: typeof f.num_of_tasks === 'number' && typeof f.num_of_tasks_completed === 'number' && f.num_of_tasks > 0
          ? Math.round((f.num_of_tasks_completed / f.num_of_tasks) * 100)
          : (typeof f.progress === 'number' ? f.progress : ''),
        risks: Array.isArray(f.risk)
          ? f.risk.map(text => ({ text }))
          : f.risks
            ? f.risks.split('\n').map(text => ({ text: text.replace(/^- /, '').trim() })).filter(r => r.text)
            : f.risk
              ? (typeof f.risk === 'string' ? f.risk.split('\n').map(text => ({ text: text.replace(/^- /, '').trim() })).filter(r => r.text) : [])
              : [],
        progressUpdate: f.progress || f.program_description || '',
        actions: Array.isArray(f.next_steps)
          ? f.next_steps.map(title => ({ title }))
          : [],
        aha_url: f.aha_url,
      }))
    : staticFeatures;

  const handleToggle = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div>
      {features.map((feature, idx) => {
        const expanded = expandedIdx === idx;
        return (
          <div className={expanded ? styles.wrapper : `${styles.wrapper} ${styles.collapsed}`} key={idx}>
            {/* Header */}
            <div
              className={styles.headerRow}
              style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}
              onClick={() => handleToggle(idx)}
            >
              {/* Left: Title + Pod (row 1), Due date (row 2) */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span className={styles.featureTitle} style={{ display: 'flex', alignItems: 'flex-start', minWidth: 0 }}>
                  { (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-4 w-4" style={{marginRight:8}}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                  )}
                  <span
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '70%',
                      flexShrink: 1,
                      cursor: feature.aha_url ? 'pointer' : 'inherit',
                      color: feature.aha_url ? '#00739d' : 'inherit',
                      textDecoration: feature.aha_url ? 'underline' : 'none'
                    }}
                    onClick={e => {
                      if (feature.aha_url) {
                        e.stopPropagation();
                        window.open(feature.aha_url, '_blank');
                      }
                    }}
                  >
                    {feature.name}
                  </span>
                  <span className={styles.podLabel} style={{marginLeft:8, flexShrink: 0}}>{feature.pod}</span>
                </span>
                <div className={styles.metaRow} style={{ marginTop: 4, color: '#888', fontSize: 14 }}>
                  Due: {feature.due}
                </div>
              </div>
              {/* Right: Status badge (if any) and Chevron icon */}
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: 16 }}>
                <div
                  className={
                    feature.status === 'At Risk' || feature.status === 'At-risk'
                      ? `${styles.statusBadge} ${styles.atRisk}`
                      : styles.statusBadge
                  }
                  style={
                    feature.status === 'At Risk' || feature.status === 'At-risk'
                      ? {
                          background: '#ef4444',
                          color: '#fff',
                          border: '1.5px solid #ef4444',
                          boxShadow: '0 2px 8px 0 #ef444422',
                          marginRight: 16
                        }
                      : { marginRight: 16 }
                  }
                >
                  {feature.status}
                </div>
                <span style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>
            </div>

            {/* Details: only show if expanded */}
            {expanded && (
              <>
                {/* Progress Summary */}
                <div className={styles.progressBox}>
                  <div className={styles.progressSummaryRow}>
                    <div className={styles.progressLabel}>⚡ Progress Summary</div>
                    <div className={styles.progressPercent}>{feature.progress}%</div>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div className={styles.progressBarFill} style={{width: feature.progress + '%'}}></div>
                  </div>
                </div>

                <div className={styles.columns}>
                  {/* Risks & Progress Update */}
                  <div className={styles.leftCol}>
                    <div className={styles.sectionTitle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert h-5 w-5" style={{verticalAlign: 'middle', marginRight: 8}}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                      Risks & Dependencies
                    </div>
                    {feature.risks.map((risk, i) => (
                      <div className={styles.riskCard} key={i}>
                        <span>{risk.text}</span>
                      </div>
                    ))}
                    <div className={styles.sectionTitle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle h-5 w-5" style={{verticalAlign: 'middle', marginRight: 8}}><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                      Progress Update
                    </div>
                    <div className={`${styles.riskCard} ${styles.progressUpdateCard}`}>
                      <span>{feature.progressUpdate}</span>
                    </div>
                  </div>
                  {/* Next Steps & Actions */}
                  <div className={styles.rightCol}>
                    <div className={styles.sectionTitle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-5 w-5" style={{verticalAlign: 'middle', marginRight: 8}}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      Next Steps & Actions
                    </div>
                    {feature.actions.map((action, i) => (
                      <div className={styles.actionCard} key={i}>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:'4%'}}>
                          <span style={{width:8,height:8,borderRadius:'50%',background:'#00739d',display:'inline-block',marginRight:8}}></span>
                            </div>
                          
                          <span className={styles.actionTitle}>{action.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
} 