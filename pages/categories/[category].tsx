import { allPosts, type Post } from '.contentlayer/generated';
import { PageDescription, PageMeta, PostPreview } from 'components';
import { getPostsByCategory } from 'lib/post';
import { capitalize } from 'lib/utils';
import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  const paths = allPosts.map((post) => ({
    params: { category: post.category },
  }));
  return {
    paths,
    fallback: true,
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
  const { query } = useRouter();
  const { category } = query;
  return (
    <>
      <PageMeta
        title={`${capitalize(category)} Related Posts`}
        description={`${category} Related Posts`}
      />
      <div className='container'>
        <PageDescription
          description={`${capitalize(category)} Related Posts`}
          pageTitle={`${capitalize(category)}`}
        />
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
    </>
  );
};
export default CategoryScreen;
