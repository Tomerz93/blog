import { PageTitle, PostPreview } from 'components';
import { allPosts } from 'contentlayer/generated';
import { getSortedPosts } from 'lib/post';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
  const sortedPosts = getSortedPosts(allPosts);
  return { props: { posts: sortedPosts } };
}

const PostsScreen = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='container'>
      <PageTitle text='posts' />
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
export default PostsScreen;