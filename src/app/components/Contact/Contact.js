
import Header from "../Header/Header";
import styles from "./contact.module.css";
import Image from 'next/image'


const CONTACT_INFO = [
    {
        "img": "/Images/whatsapp-logo.webp",
        "contactTxt":"Whatsapp",
        "redirect": "https://api.whatsapp.com/send/?phone=+919788540641&text&type=phone_number&app_absent=0"
    },
    {
        "img": "/Images/linkedin-logo.png",
        "contactTxt":"LinkedIn",
        "redirect": "https://www.linkedin.com/in/vivek-g-29206bb4/"
    },
    {
        "img": "/Images/gmail-logo.png",
        "contactTxt":"Email",
        "redirect": "mailto:gvivekg28@gmail.com"
    },
  
]

export default function Contact() {


  return (
    <>
        <div id="contact"></div>
        <Header headerTxt="Contact Me" subTxt="Get in Touch" />
        <div className={styles.contactWrapper}>
            {
                CONTACT_INFO.map((info, index) => {
                    return (
                        <a href={info.redirect} target="_blank"  key={index}>
                            <div className={styles.contactInfo} key={index}>
                                <Image src={info.img}  width={25} height={25}  alt={info.contactTxt} style={{objectFit:'contain'}} />       
                                <div className={styles.contactText}>{info.contactTxt}</div>
                            </div>
                        </a>
                        
                    )
                })
            }
        </div>
        <div className={styles.copyRightTxt}>Designed and Developed by Vivek Gopalan</div>
    </>
  );
}
