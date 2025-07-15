import styles from './header.module.css';

export default function Header({ logoSrc, title, subtitle }) {
    return (
        <div className={styles.headerBar}>
            <img src={logoSrc} alt="Guidewire Logo" className={styles.logo} />
            {/* <span className={styles.pulseIq}>PulseIQ</span> */}
        </div>
    );
}