import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { getAllPostsByCategory } from '../../lib/post';
import { capitalize } from 'lib/utils';
import { PageDescription, PageMeta, PostPreview } from 'components';

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
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <PageMeta
      title='categories'
      description='All posts by ordered by categories'
    />
    <div className='container'>
      <PageDescription
        pageTitle='categories'
        description='All posts by ordered by categories'
      />
      {Object.entries(categoryMap).map(([categoryName, posts]) => (
        <div key={categoryName}>
          <Link href={`/categories/${categoryName}`}>
            <a className='text-center md:text-left text-2xl mb-4 block'>
              {capitalize(categoryName)}
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
  </>
);

export default Categories;
