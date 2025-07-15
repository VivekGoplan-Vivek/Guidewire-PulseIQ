import React from 'react';
import styles from './SummaryCards.module.css';

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

// cardData: [{ title, value, description, icon (optional), colorClass }]
const SummaryCards = ({  results=null}) => {
  // Clone cardData and update Total Features value if results provided
  const dynamicCardData = cardData.map(card => {
    if (card.title === 'Total Features' && results && results.master_feature) {
      let newCard = { ...card };
      if (typeof results.master_feature.num_of_features === 'number') {
        newCard.value = results.master_feature.num_of_features;
      }
      if (typeof results.master_feature.num_of_pods === 'number') {
        newCard.description = `Across ${results.master_feature.num_of_pods} pods`;
      }
      return newCard;
    }
    if (card.title === 'Completed' && results && results.master_feature && typeof results.master_feature.num_of_features_completed === 'number') {
      return { ...card, value: results.master_feature.num_of_features_completed };
    }
    if (card.title === 'At Risk' && results && Array.isArray(results.features)) {
      const riskCount = results.features.filter(f => f.risk && (Array.isArray(f.risk) ? f.risk.length > 0 : String(f.risk).trim() !== "")).length;
      return { ...card, value: riskCount };
    }
    if (card.title === 'Jira Epics' && results && results.master_feature && typeof results.master_feature.num_of_features === 'number') {
      return { ...card, value: results.master_feature.num_of_features };
    }
    return card;
  });

  return (
    <div className={styles.cardsContainer}>
      {dynamicCardData.map((card, idx) => (
        <div key={idx} className={`${styles.card} ${styles[card.colorClass]}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{card.title}</span>
            {card.icon && <span className={styles.cardIcon}>{card.icon}</span>}
          </div>
          <div className={styles.cardValue}>{card.value}</div>
          <div className={styles.cardDescription}>{card.description}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards; 