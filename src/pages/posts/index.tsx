import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '../../services/prismicio';
import styles from './styles.module.scss';
import { RichText } from 'prismic-dom';
import Link from 'next/link';

type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string
}

interface IPostsProps {
  posts: Post[]
}

export default function Posts({ posts }: IPostsProps) {
  console.log(posts);

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const response = await client.getAllByType('post');
  // console.log('response', JSON.stringify(response, null, 2));/
  const posts = response.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find((content) => content.type === 'paragraph' && content.text !== '')?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year:'numeric'
    })
  }));

  return {
    props: { posts },
    revalidate: 60 * 60 * 24 //24 Hours
  };
};
