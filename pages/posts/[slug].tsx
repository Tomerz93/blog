import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import { removeExtenstion } from 'lib/utils';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post: Post = allPosts.find(
    (post) => removeExtenstion(post.slug, 'mdx') === params.slug
  );
  return {
    props: {
      post,
    },
  };
}

const components = {
  Image: (props) => {
    console.log(props);
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

const PostLayout = ({ post }: { post: Post }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className='max-w-xl mx-auto py-8'>
        <div className='text-center mb-8'>
          <time
            dateTime={post.createdAt}
            className='text-xs text-gray-600 mb-1'
          >
            {format(parseISO(post.createdAt), 'LLLL d, yyyy')}
          </time>
          <h1>{post.title}</h1>
          <section className='container'>
            <MDXContent components={{ ...components }} />
          </section>
        </div>
      </article>
    </>
  );
};

export default PostLayout;
