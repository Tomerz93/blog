import Head from 'next/head';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { removeExtenstion } from 'lib/utils';
import { PageTitle, PostPreviewSmall } from 'components';
import { getBlogRecommendations } from 'lib/post';

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (post) => removeExtenstion(post.slug, 'mdx') === params.slug
  );
  const recommendedPosts = post ? getBlogRecommendations(allPosts, post) : [];
  return {
    props: {
      post,
      recommendedPosts,
    },
  };
}

const components = {
  Image: (props: any) => {
    return (
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    );
  },
};

interface PostProps {
  post: Post;
  recommendedPosts: Post[];
}

const PostHeader = ({ post }: { post: Post }) => {
  return (
    <div className='text-center lg:text-left mb-8 border-b-emerald-700  border-b-2'>
      <time
        dateTime={post.createdAt}
        className='text-s text-gray-600 block mb-1'
      >
        {format(parseISO(post.createdAt), 'LLLL d, yyyy')}
      </time>
      <PageTitle isUppercase={false} text={post.title} />
    </div>
  );
};

const PostLayout: React.FC<PostProps> = ({ post, recommendedPosts }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className='container'>
        <PostHeader post={post} />
        <MDXContent components={{ ...components }} />
        <div>
          {recommendedPosts.length > 0 && (
            <>
              <h3 className='text-3xl my-6'>
                Maybe You will like{' '}
                {recommendedPosts.length > 1 ? 'these posts' : 'this post'} as
                well{' '}
              </h3>
              <div className='grid post-preview-container-small gap-4'>
                {recommendedPosts.map((p) => (
                  <PostPreviewSmall key={p.slug} {...p} />
                ))}
              </div>
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default PostLayout;
