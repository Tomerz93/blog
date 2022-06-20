import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { allSnippets } from '.contentlayer/generated';
import { pick } from 'contentlayer/client';
import { groupBy } from 'lib/utils';
import { PageTitle } from 'components';

export async function getStaticProps() {
  const filteredSnippets = allSnippets.map((snippet) =>
    pick(snippet, ['name', 'lang'])
  );
  const snippet = groupBy<typeof filteredSnippets[number]>(
    filteredSnippets,
    'lang'
  );
  return {
    props: {
      snippet,
    },
  };
}

const SnippetsScreen = ({
  snippet,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState('css');
  // TODO investigate how to remove this useEffect
  React.useEffect(() => {
    // useRouter is so the query would get populated after first render so useEffect in needed to set the initial state
    if (!router.isReady) return;
    const { type } = router.query || { type: '' };
    // make typescript happy
    if (Array.isArray(type)) return;
    if (type && snippet[type]) setActiveCategory(type);
  }, [router.isReady, router.query, snippet]);

  const { [activeCategory]: currentActive } = snippet;
  return (
    <>
      <Head>
        <title>Snippets Page</title>
        <meta
          name='description'
          content='useful snippets you can use in your project'
        />
      </Head>
      <div className='container'>
        <PageTitle text='Snippets' />
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            {Object.keys(snippet).map((language) => (
              <>
                {
                  <Link shallow href={`/snippets?type=${language}`}>
                    <a className='block'>{language}</a>
                  </Link>
                }
              </>
            ))}
          </div>
          {
            <div>
              {currentActive.map(({ name }) => (
                <Link className='block' href={`/snippets/${name}`} key={name}>
                  <a className='block text-blue-600 border-l-indigo-800'>
                    {name}
                  </a>
                </Link>
              ))}
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default SnippetsScreen;
