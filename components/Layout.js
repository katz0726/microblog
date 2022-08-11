import Head from "next/head";
import Image from 'next/image';

import styles from './layout.module.css';
import util_styles from '../styles/utils.module.css';
import Link from "next/link";

const profile_name = 'Shin Code';
export const website_title = 'Next.js Microblog';

function layout({ children, home }) {
  return (
    <div className={ styles.container }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{ website_title }</title>
      </Head>

      <header className={styles.header}>
        {home ? (
          <>
            <img src="/images/profile.png" className={`${util_styles.headerHomeImage} ${util_styles.borderCircle}`} alt={ profile_name } />
            <h1 className={util_styles.heading2Xl}>{profile_name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <img
                src="/images/profile.png"
                className={`${util_styles.headerImage} ${util_styles.borderCircle}`}
                alt=""
              />
            </Link>
            <h2 className={util_styles.headingLg}>
              <Link href="/">
                <a className={util_styles.colorInherit}>{ profile_name }</a>
              </Link>
            </h2>
          </>
        )}  
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">🏠 ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default layout;