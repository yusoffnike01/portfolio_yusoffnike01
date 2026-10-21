import styles from './SkillIcon.module.css';

export default function SkillIcon({skill}){
 return <div className={styles.frame} aria-hidden="true"><img src={skill.icon} alt="" width="36" height="36" loading="lazy" decoding="async" className={styles.image} data-testid="skill-logo"/></div>;
}
