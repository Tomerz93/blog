import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { allPosts } from 'contentlayer/generated';
import { Category, PageTitle, PostPreview } from 'components';
import { formatDateShort } from 'lib/utils';
import { InferGetStaticPropsType } from 'next';
import { getPostsWithFeatured, getSortedPosts } from 'lib/post';

export async function getStaticProps() {
  const sortedPosts = getSortedPosts(allPosts);
  const { featuredPost = sortedPosts[0], posts } =
    getPostsWithFeatured(sortedPosts);
  return { props: { posts, featuredPost } };
}

const Home = ({
  posts,
  featuredPost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='container'>
      <Head>
        <title>Devnotebook</title>
      </Head>
      <PageTitle text='featured' />
      <Link href={`/posts/${featuredPost.slug}`}>
        <div>
          <Image
            src={featuredPost.image}
            width={1200}
            height={500}
            loading='lazy'
            alt='featured-img'
          />
          <div className='flex justify-between items-center'>
            <div className='flex'>
              {featuredPost?.categories?.map((c) => (
                <Category key={c} slug={c} />
              ))}
            </div>
            <span className='mt-2'>
              {formatDateShort(featuredPost?.createdAt)}
            </span>
          </div>
          <h2 className='text-3xl'>{featuredPost?.title}</h2>
          <p className='mb-8'>{featuredPost?.excerpt}</p>
        </div>
      </Link>
      <h3>Posts</h3>
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

export default Home;
