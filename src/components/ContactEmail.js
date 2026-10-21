import {profile} from '../lib/site.mjs';
import styles from './ContactEmail.module.css';

export default function ContactEmail({lang}){
 const email=profile.contacts.find(contact=>contact.type==='email');
 if(!email)return null;
 return <a className={styles.email} href={email.href} data-testid="contact-email" title={lang==='ms'?'Hantar e-mel':'Send an email'}><span>{email.value}</span><span aria-hidden="true">↗</span></a>;
}
