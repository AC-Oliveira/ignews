import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { createClient } from '../../../services/prismicio';
import styles from '../post.module.scss';

interface IPreviewPostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string
  }
}

export default function PreviewPost({ post }: IPreviewPostProps) {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.activeSubscription) Router.push(`/${post.slug}`);
  }, [session]);
  return (
    <>
      <Head>
        <title>{`${post.title} | ignews`}</title>
      </Head>

      <main className={styles.container}>
        <article className={`${styles.post} ${styles.previewContent}`}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }}/>
        </article>
        <div className={styles.continueReading}>
          Wanna continue reading?
          <Link href="/">
            <a>Subscribe now!🤗</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params
}) => {

  const { slug } = params;

  const client = createClient({ previewData });
  const response = await client.getByUID('post', String(slug));

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0,4)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year:'numeric'
    })
  };

  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 24 // 24 Hours
  };
};
