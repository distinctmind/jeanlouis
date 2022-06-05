import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";

import BlogCard from "../components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-ca-central-1.graphcms.com/v2/cl41sm5oq3h4501xsegxr7l5l/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  console.log(posts);
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
