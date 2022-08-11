import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';

const posts_directory = path.join(process.cwd(), 'posts');

// mdファイルのデータを取り出す
export function getPostsData() {
  const filenames = fs.readdirSync(posts_directory);
  const all_posts_data = filenames.map((filename) => {
    const id = filename.replace(/\.md$/, '');

    // mdファイルを文字列として読み取る
    const full_path = path.join(posts_directory, filename);
    const file_contents = fs.readFileSync(full_path, 'utf8');

    const md_meta = matter(file_contents);

    return {
      id,
      ...md_meta.data,
    };
  });

  return all_posts_data;
}

// getStaticPathのreturnで使用するpathを取得する
export function getAllPostIds() {
  const filenames = fs.readdirSync(posts_directory);

  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ''),
      },
    };
  });
}

// IDに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const full_path = path.join(posts_directory, `${id}.md`);
  const file_contents = fs.readFileSync(full_path, 'utf8');

  // メタデータ部分を解析
  const meta_data = matter(file_contents);

  // マークダウンをHTML文字列に変換
  const blog_conetent = await remark()
    .use(html)
    .process(meta_data.content);
  
  const conetent_html = blog_conetent.toString();

  return {
    id,
    conetent_html,
    ...meta_data.data,
  };
}