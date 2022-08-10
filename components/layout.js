import Head from "next/head";
import Image from 'next/image';
import styles from './layout.module.css';
import util_styles from '../styles/utils.module.css';

const profile_name = 'Shin Code';
export const website_title = 'Next.js Microblog';

function layout({ children }) {
  return (
    <div className={ styles.container }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{ website_title }</title>
      </Head>

      <header className={ styles.header }>
        <Image src="/images/profile.png" alt="プロフィール画像" className={ util_styles.borderCircle }  width={80} height={80} />
        <h1 className={ util_styles.heading2Xl}>{ profile_name }</h1>
      </header>
      <main>{ children }</main>
    </div>
  );
}

export default layout;