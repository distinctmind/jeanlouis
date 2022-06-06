import BlogPost from "../../components/BlogPost";
import graphqlAPI from "../../services/index.js";

export async function getStaticPaths() {
  const { posts } = await graphqlAPI.getSlugs();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { post } = await graphqlAPI.getPost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default ({ post }) => {
  return <BlogPost {...post} />;
};
