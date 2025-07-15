import React from 'react';
import styles from './FeatureOverviewDashboard.module.css';

const risks = [
  { level: 'high', text: 'Critical integration delay with external vendor', impact: 'high' },
  { level: 'medium', text: 'Pending security review for new modules', impact: 'medium' },
];

const dependencies = [
  { name: 'Core Platform Upgrade', pod: 'Platform Pod', due: '2024-07-30', status: 'In Progress', color: '#5b8df6' },
  { name: 'Compliance Module', pod: 'Compliance Pod', due: '2024-08-20', status: 'Not Started', color: '#f87171' },
];

const actions = [
  { title: 'Finalize vendor contract', owner: 'Product Team', due: '2024-08-01' },
  { title: 'Complete platform upgrade', owner: 'Platform Team', due: '2024-08-10' },
  { title: 'Schedule compliance review', owner: 'Compliance Team', due: '2024-08-18' },
];

const epics = [
  { key: 'MF-001', name: 'Vendor Integration', stories: 20, percent: 40, color: '#f87171' },
  { key: 'MF-002', name: 'Platform Upgrade', stories: 15, percent: 60, color: '#5b8df6' },
  { key: 'MF-003', name: 'Compliance Readiness', stories: 10, percent: 10, color: '#f87171' },
];

export default function MasterFeatureOverviewDashboard({ results=null }) {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <div
            className={styles.featureTitle}
            onClick={() => {
              if (results && results.master_feature && results.master_feature.url) {
                window.open(results.master_feature.url, '_blank');
              }
            }}
            style={{ cursor: results && results.master_feature && results.master_feature.url ? 'pointer' : 'default' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-4 w-4" style={{marginRight:8}}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            {results && results.master_feature && results.master_feature.name ? results.master_feature.name : 'Enterprise Modernization'}
          </div>
          <div className={styles.metaRow}>
            Due: {results && results.master_feature && results.master_feature.due_date ? results.master_feature.due_date : '2024-09-15'}
          </div>
        </div>
        <div className={`${styles.statusBadge} ${styles.atRisk}`} style={{
          background: '#FFE5E5',
          color: '#B21313',
          border: '1.5px solid #f87171',
          boxShadow: '0 2px 8px 0 #f8717122',
          display: results && results.master_feature && results.master_feature.risk_status && results.master_feature.risk_status.toLowerCase() === 'at_risk' ? 'block' : 'none'
        }}>At Risk</div>
      </div>

      {/* Progress Summary */}
      {/* <div className={styles.progressBox}>
        <div className={styles.progressLabel}>⚡ Progress Summary</div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{width: '55%', background: 'linear-gradient(90deg, #f87171 0%, #f87171 100%)'}}></div>
        </div>
        <div className={styles.progressPercent}>55%</div>
      </div> */}

      <div className={styles.columns}>
        {/* Risks & Dependencies */}
        <div className={styles.leftCol}>
          <div className={styles.sectionTitle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert h-5 w-5" style={{verticalAlign: 'middle', marginRight: 8}}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
            Risks & Dependencies
          </div>
          {(results && results.master_feature && Array.isArray(results.master_feature.risk) ? results.master_feature.risk : risks).map((risk, i) => (
            <div className={styles.riskCard} key={i} style={risk.level === 'high' ? {borderLeftColor:'#f87171'} : {}}>
              <span>{risk}</span>
            </div>
          ))}
          <div className={styles.sectionTitle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle h-5 w-5" style={{verticalAlign: 'middle', marginRight: 8}}><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            Progress Update
          </div>
          <div className={`${styles.riskCard} ${styles.progressUpdateCard}`}>
            <span>{results && results.master_feature && results.master_feature.progress ? results.master_feature.progress : 'Dashboards are prototyped and metrics are flowing.'}</span>
          </div>
          {/* <div className={styles.sectionSubtitle}>DEPENDENCIES</div> */}
          {/* {(results && results.master_feature && Array.isArray(results.master_feature.dependencies) ? results.master_feature.dependencies : dependencies).map((dep, i) => (
            <div className={styles.dependencyCard} key={i} style={dep.status === 'Not Started' ? {borderLeftColor:'#f87171'} : {}}>
              <div className={styles.dependencyName}>{dep.name}</div>
              <div className={styles.dependencyMeta}>{dep.pod} · Due: {dep.due}</div>
              <div className={styles.dependencyStatus} style={{color: dep.color}}>
                <span className={styles.statusDot} style={{background: dep.color}}></span>
                {dep.status}
              </div>
            </div>
          ))} */}
        </div>
        {/* Next Steps & Actions + Jira Epics */}
        <div className={styles.rightCol}>
          <div className={styles.sectionTitle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-5 w-5" style={{verticalAlign: 'middle', marginRight: 8}}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            Next Steps & Actions
          </div>
          {(results && results.master_feature && Array.isArray(results.master_feature.next_steps) ? results.master_feature.next_steps : actions).map((action, i) => (
            <div className={styles.actionCard} key={i}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:8,height:8,borderRadius:'50%',background:'#00739d',display:'inline-block',marginRight:8,width:'12px',height:'12px'}}></span>
                <span className={styles.actionTitle}>{action ? action : action}</span>
              </div>
              {/* <div className={styles.actionMeta} style={{marginTop:4}}>
                Owner: {action.owner} &nbsp; &bull; &nbsp; Due: {action.due}
              </div> */}
            </div>
          ))}
          {/* <div className={styles.sectionTitle} style={{marginTop: 24}}>JIRA EPICS ({epics.length})</div>
          {epics.map((epic, i) => (
            <div className={styles.epicRow} key={i}>
              <div className={styles.epicLeft}>
                <div className={styles.epicName}>{epic.name}</div>
                <div className={styles.epicMeta}>{epic.stories} stories</div>
              </div>
              <div className={styles.epicRight}>
                <span className={styles.epicKey}>{epic.key}</span>
                <span className={styles.statusDot} style={{background: epic.color}}></span>
                <span className={styles.epicPercent}>{epic.percent}%</span>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
} 