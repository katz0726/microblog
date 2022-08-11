import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/post';

import Head from "next/head";
import Date from "../../components/date";

import util_styles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post_data = await getPostData(params.id);

  return {
    props: {
      post_data,
    },
  };
}

export default function Post({ post_data }) {
  return (
    <Layout>
      <Head>
        <title>{ post_data.title }</title>
      </Head>

      <article>
        <h1 className={util_styles.headingXl}>{ post_data.title }</h1>
        <div className={util_styles.lightText}>
          <Date dateString={post_data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post_data.conetent_html }} />
      </article>
    </Layout>
  );
}