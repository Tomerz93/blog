import type { InferGetStaticPropsType } from 'next';
import { allPosts } from 'contentlayer/generated';
import { PageDescription, PageMeta, PostPreview } from 'components';
import { getSortedPosts } from 'lib/post';

export async function getStaticProps() {
  const sortedPosts = getSortedPosts(allPosts);
  return { props: { posts: sortedPosts } };
}

const PostsScreen = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <PageMeta
      title='Posts'
      description='All of the blog posts are available on this page'
    />
    <div className='container'>
      <PageDescription
        pageTitle='Posts'
        description='All of the blog posts are available on this page'
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

export default PostsScreen;
