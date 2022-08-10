import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
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

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// };

export default function Home({ all_posts_data }) {
  return (
    <Layout>
      <section className={ util_styles.headingMd }>
        <p>私はフルスタックエンジニアです。Udemy講師として活動しています。好きな言語はJavascriptです。</p>
      </section>

      <section className={ `${ util_styles.headingMd } ${ util_styles.padding1px }` }>
        <h2>📝エンジニアのブログ</h2>

        <div className={ styles.grid }>
          { all_posts_data.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={ `posts/${ id }` } >
                <img src={ `${ thumbnail }` } alt="" className={ styles.thumbnailImage } />
              </Link>

              <Link href={ `posts/${ id }` } >
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
