import styles from './ModernPortfolio.module.css';

export default function ProfilePhoto({ lang, variant = 'hero' }) {
  const alt = lang === 'ms' ? 'Gambar profil Tengku Yusoff' : 'Profile photo of Tengku Yusoff';
  return (
    <div className={`${styles.profilePhoto} ${variant === 'about' ? styles.aboutPhoto : styles.heroPhoto}`}>
      <img src="/social/profile-portrait.webp" width="320" height="425" alt={alt} loading="eager" decoding="async" />
    </div>
  );
}
