import React, { useState } from 'react';
import styles from './TabView.module.css';

const tabs = [
  'Master Feature Overview',
  'Feature Overview',
  'Jira Epics',
  'Pod Status',
];

export default function TabView({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? styles.activeTab : styles.tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
} 