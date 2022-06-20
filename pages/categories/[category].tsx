import { allPosts, type Post } from '.contentlayer/generated';
import { PostPreview } from 'components';
import { getPostsByCategory } from 'lib/post';
import { InferGetStaticPropsType } from 'next';

export const getStaticPaths = () => {
  const paths = allPosts.map((post) => ({
    params: { category: post.category },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({
  params,
}: {
  params: { category: string };
}) => {
  const posts = getPostsByCategory(allPosts, params.category);
  return {
    props: {
      posts,
    },
  };
};

const CategoryScreen = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='container'>
      <div className='grid grid-cols-2 gap-5 rounded-md'>
        {posts.map((p) => (
          <PostPreview
            {...p}
            key={p.title}
            image={p.image}
            createdAt={p.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryScreen;
