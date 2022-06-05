import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";
import moment from "moment";

const graphcms = new GraphQLClient(
  "https://api-ca-central-1.graphcms.com/v2/cl41sm5oq3h4501xsegxr7l5l/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      {post.coverPhoto && (
        <img src={post.coverPhoto.url} className={styles.cover} />
      )}
      <div className={styles.title}>
        <h1>{post.title}</h1>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
      <div className={styles.authdetails}>
        <img src={post.author.avatar.url} />
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>
            {moment(post.datePublished).format("MMMM DD, YYYY")}
          </h6>
        </div>
      </div>
    </main>
  );
}
