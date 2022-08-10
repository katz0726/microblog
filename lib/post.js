import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

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