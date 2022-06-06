import Head from "next/head";
import styles from "../styles/Home.module.css";

import BlogCard from "../components/BlogCard";
import graphqlAPI from "../services/index.js";

export async function getStaticProps() {
  const { posts } = (await graphqlAPI.getPosts()) || [];

  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jeanlouis</title>
        <meta name="description" content="Jeanlouis's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </main>
    </div>
  );
}
