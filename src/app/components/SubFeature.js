import React, { useState } from "react";
import styles from "./SubFeature.module.css";
import FeatureStatusResult from "./FeatureStatusResult";

export default function SubFeature({ subfeatures }) {
  const [selected, setSelected] = useState(null);

  console.log("subfeatures",subfeatures)
  if (!Array.isArray(subfeatures) || subfeatures.length === 0) return null;

  return (
    <div className={styles.commentsSection}>
      <div className={styles.commentsTitle}>SubFeatures</div>
      <div className={styles.commentsList}>
        {subfeatures.map((sf, idx) => (
          <div
            className={styles.commentItem}
            key={sf.featureId || idx}
            style={{ cursor: "pointer" }}
            onClick={() => setSelected(selected === idx ? null : idx)}
          >
            <div className={styles.commentHeader}>
              <span className={styles.commentMessage}>{sf.name}</span>
              <span className={`${styles.statusValue} ${styles.statusBadge} ${styles[sf.status.toLowerCase().replace(' ', '')]}`}>{sf.status}</span>
            </div>
            {selected === idx && (
              <div className={styles.subFeatureDetails}>
                <div className={styles.subFeatureResultWrapper}>
                  <FeatureStatusResult results={sf} hideTitle={true} hideStatus={true} isSubFeature={true} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 