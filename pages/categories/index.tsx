// import invariant from 'tiny-invariant';
import { getAllPostsByCategory } from '../../lib/post';
import { PageTitle, PostPreview, PostPreviewSmall } from 'components';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';

const captialize = (text: string) =>
  `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;

export const getStaticProps = () => {
  const categoryMap = getAllPostsByCategory(allPosts);
  return {
    props: {
      categoryMap,
    },
  };
};

const Categories = ({
  categoryMap,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='container'>
      <PageTitle text='Categories' />
      {Object.entries(categoryMap).map(([categoryName, posts]) => (
        <div key={categoryName}>
          <Link href={`/categories/${categoryName}`}>
            <a className='text-center md:text-left text-xl mb-4 block'>
              {captialize(categoryName)}
            </a>
          </Link>
          <div
            className='grid place-items-center md:place-items-start grid-cols-2 gap-4 my-2'
            key={categoryName}
          >
            {posts?.map((post) => (
              <PostPreview key={post.title} {...post} image={post?.image} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
