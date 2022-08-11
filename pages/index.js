import Head from 'next/head';
import Image from "next/image";
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout, { website_title } from '../components/Layout';
import util_styles from '../styles/utils.module.css';

import { getPostsData } from '../lib/post';

// SSGの場合
export async function getStaticProps() {
  // 外部から一度だけデータ(id, title, date, thumbnail)を取得する
  const all_posts_data = getPostsData();

  return {
    props: {
      all_posts_data,
    },
  };
};

export default function Home({ all_posts_data }) {
  return (
    <Layout home>
      <Head>
        <title>{ website_title }</title>
      </Head>

      <section className={ util_styles.headingMd }>
        <p>私はフルスタックエンジニアです。Udemy講師として活動しています。好きな言語はJavascriptです。</p>
      </section>

      <section className={ `${ util_styles.headingMd } ${ util_styles.padding1px }` }>
        <h2 className={ util_styles.headingLg }>📝エンジニアのブログ</h2>

        <div className={ styles.grid }>
          { all_posts_data.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={ `/posts/${ id }` } >
                <img src={ `${ thumbnail }` } className={ styles.thumbnailImage } />
              </Link>

              <Link href={ `/posts/${ id }` } >
                <a className={util_styles.boldText}>{ title }</a>
              </Link>
              <br />
              <small className={util_styles.lightText}>{ date }</small>
          </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
