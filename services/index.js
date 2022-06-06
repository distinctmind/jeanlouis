import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const getPosts = async () => {
  const query = gql`
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
        featuredImage {
          url
        }
      }
    }
  `;
  return await request(graphqlAPI, query);
};

const getPost = async (slug) => {
  const query = gql`
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
        featuredImage {
          id
          url
        }
      }
    }
  `;
  return await request(graphqlAPI, query, { slug });
};

const getSlugs = async () => {
  const query = gql`
    {
      posts {
        slug
      }
    }
  `;
  return await request(graphqlAPI, query);
};

export default {
  getPost,
  getPosts,
  getSlugs,
};
